<!-- src/components/EmployeeSchedule.vue -->

<template>
  <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
    <form @submit.prevent="">
      <div class="grid grid-cols-2 gap-4">
        <div class="mb-5">
          <label for="date" class="block mb-2">Fecha Entrada:</label>
          <input
            type="date"
            id="start-date"
            v-model="startDate"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-5">
          <label for="start-time" class="block mb-2">Hora Entrada:</label>
          <input
            type="time"
            id="start-time"
            v-model="startTime"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="mb-5">
          <label for="date" class="block mb-2">Fecha Salida:</label>
          <input
            type="date"
            id="end-date"
            v-model="endDate"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-5">
          <label for="end-time" class="block mb-2">Hora Salida:</label>
          <input
            type="time"
            id="end-time"
            v-model="endTime"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full px-3 py-2 bg-blue-500 text-white rounded-md"
        @click="isModalOpen = true"
      >
        Guardar horario
      </button>
    </form>
  </div>

  <!-- Modal -->

  <div>
    <!-- <button
      class="bg-blue-500 text-white px-4 py-2 rounded-md"
      @click="isModalOpen = true"
    >
      Agregar horario
    </button> -->
    <!-- El modal solo se muestra si showModal es verdadero -->
    <div
      class="
        fixed
        inset-0
        bg-gray-500 bg-opacity-75
        flex
        justify-center
        items-center
      "
      v-if="isModalOpen"
    >
      <div class="bg-white p-6 rounded-lg">
        <!-- Contenido del modal -->
        <h2 class="text-xl font-bold mb-4">Agregar horario</h2>
        <div class="flex space-x-4 mb-4">
          <div>
            <label class="block mb-2">Fecha de inicio:</label>
            <input
              type="date"
              class="border rounded px-3 py-2"
              v-model="startDate"
              readonly
            />
          </div>
          <div>
            <label class="block mb-2">Hora de inicio:</label>
            <input
              type="time"
              class="border rounded px-3 py-2"
              v-model="startTime"
              readonly
            />
          </div>
        </div>
        <div class="flex space-x-4 mb-4">
          <div>
            <label class="block mb-2">Fecha de fin:</label>
            <input
              type="date"
              class="border rounded px-3 py-2"
              v-model="endDate"
              readonly
            />
          </div>
          <div>
            <label class="block mb-2">Hora de fin:</label>
            <input
              type="time"
              class="border rounded px-3 py-2"
              v-model="endTime"
              readonly
            />
          </div>
        </div>

        <button
          class="bg-green-500 text-white px-4 py-2 rounded-md"
          @click="addEmployeeSchedule"
        >
          Guardar
        </button>
        <button
          class="bg-red-500 text-white px-4 py-2 rounded-md"
          @click="isModalOpen = false"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseUrl } from '../../config.js';
import { ref, onMounted } from 'vue';

export default {
  props: ['employee'],
  setup(props) {
    const startDate = ref(new Date().toISOString().substr(0, 10)); // Asignar fecha actual a startDate
    const startTime = ref('');
    const endDate = ref(new Date().toISOString().substr(0, 10)); // Asignar fecha actual a endDate
    const endTime = ref('');
    const employeeData = ref({});
    const employeeKey = ref('');

    const isModalOpen = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    console.log(props.employee);

    employeeKey.value = Object.keys(props.employee)[0];
    console.log(employeeKey.value);
    // console.log(Object.keys(props.employee)[0]);

    const addEmployeeSchedule = async () => {
      try {
        // Consultar la base de datos para obtener los datos del empleado
        // const employeeUrl = `https://controlhoras-3860e-default-rtdb.firebaseio.com/employees.json?orderBy="accesscode"&equalTo="${props.accessKey}"`;

        // Validar que ningún campo esté vacío
        if (
          !employeeKey.value ||
          !startDate.value ||
          !startTime.value ||
          !endDate.value ||
          !endTime.value
        ) {
          console.error('Todos los campos son obligatorios.');
          return;
        }

        // Validar que startDate no sea superior a endDate
        const startDateTime = new Date(`${startDate.value}T${startTime.value}`);
        const endDateTime = new Date(`${endDate.value}T${endTime.value}`);
        if (startDateTime >= endDateTime) {
          console.error(
            'La fecha y hora de inicio no pueden ser superiores o iguales a la fecha y hora de fin.'
          );
          return;
        }

        // Calcular la duración del horario trabajado
        const duration = (endDateTime - startDateTime) / 1000 / 60 / 60; // Duración en horas

        const employeeUrl = `${firebaseUrl}/employees/${employeeKey.value}.json`;

        const employeeResponse = await fetch(employeeUrl);
        if (employeeResponse.ok) {
          const employeeData = await employeeResponse.json();

          // Si se encontró un empleado con el access code proporcionado, guardar el registro de horario trabajado en la base de datos junto con el ID del empleado
          if (Object.keys(employeeData).length > 0) {
            const employeeId = Object.keys(employeeData)[0];
            const url = `${firebaseUrl}/schedules.json`;
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                employeeKey: employeeKey.value,
                startDate: startDate.value,
                startTime: startTime.value,
                endDate: endDate.value,
                endTime: endTime.value,
                duration: duration,
              }),
            });
            if (response.ok) {
              console.log('Horario registrado correctamente.');
              alert('Registrado correctamente');
              location.reload();
              // startDate.value = '';
              // startTime.value = '';
              // endDate.value = '';
              // endTime.value = '';
            } else {
              console.error('Error al registrar el horario:', response.status);
            }
          } else {
            console.error(
              'No se encontró un empleado con el access code proporcionado.'
            );
          }
        } else {
          console.error(
            'Error al obtener los datos del empleado:',
            employeeResponse.status
          );
        }
      } catch (error) {
        console.error('Error al registrar el horario:', error);
      }
    };

    return {
      startDate,
      startTime,
      endDate,
      endTime,
      addEmployeeSchedule,
      isModalOpen,
      openModal,
      closeModal,
    };
  },
};
</script>

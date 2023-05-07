<!-- src/components/EmployeeSchedule.vue -->

<template>
  <div
    class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
  >
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="
          absolute
          inset-0
          bg-gradient-to-r
          from-blue-400
          to-purple-600
          shadow-lg
          transform
          -skew-y-6
          sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl
        "
      ></div>
      <div
        class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
      >
        <form @submit.prevent="addEmployeeSchedule">
          <!-- <div class="mb-5">
            <label for="employee-name" class="block mb-2"
              >Nombre del empleado:</label
            >
            <input
              type="text"
              id="employee-name"
              v-model="employeeName.value"
              placeholder="Escribe el nombre del empleado"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div> -->
          <div class="mb-5">
            <label for="date" class="block mb-2">Fecha Entrada:</label>
            <input
              type="date"
              id="date"
              v-model="date.value"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-5">
            <label for="start-time" class="block mb-2">Hora Entrada:</label>
            <input
              type="time"
              id="start-time"
              v-model="startTime.value"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-5">
            <label for="date" class="block mb-2">Fecha Salida:</label>
            <input
              type="date"
              id="date"
              v-model="date.value"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-5">
            <label for="end-time" class="block mb-2">Hora Salida:</label>
            <input
              type="time"
              id="end-time"
              v-model="endTime.value"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            class="w-full px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Guardar horario
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['employee'],
  setup(props) {
    const startDate = ref('');
    const startTime = ref('');
    const endDate = ref('');
    const endTime = ref('');
    const employeeData = ref({});

    const addEmployeeSchedule = async () => {
      try {
        // Consultar la base de datos para obtener los datos del empleado
        const employeeUrl = `https://controlhoras-3860e-default-rtdb.firebaseio.com/employees.json?orderBy="accessCode"&equalTo="${props.accessKey}"`;

        const employeeResponse = await fetch(employeeUrl);
        if (employeeResponse.ok) {
          const employeeData = await employeeResponse.json();

          // Si se encontró un empleado con el access code proporcionado, guardar el registro de horario trabajado en la base de datos junto con el ID del empleado
          if (Object.keys(employeeData).length > 0) {
            const employeeId = Object.keys(employeeData)[0];
            const url = `https://controlhoras-3860e-default-rtdb.firebaseio.com/schedules.json`;
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                employeeId: employeeId,
                startDate: startDate.value,
                startTime: startTime.value,
                endDate: endDate.value,
                endTime: endTime.value,
              }),
            });
            if (response.ok) {
              console.log('Horario registrado correctamente.');
              startDate.value = '';
              startTime.value = '';
              endDate.value = '';
              endTime.value = '';
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
    };
  },
};
</script>

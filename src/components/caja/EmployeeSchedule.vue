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
  setup() {
    const employeeName = ref('');
    const date = ref('');
    const startTime = ref('');
    const endTime = ref('');

    const addEmployeeSchedule = () => {
      // Aquí puedes agregar la lógica para guardar los datos del horario del empleado, por ejemplo, enviarlos a una API o almacenarlos en una base de datos local.
      console.log({
        employeeName: employeeName.value,
        date: date.value,
        startTime: startTime.value,
        endTime: endTime.value,
      });
      employeeName.value = '';
      date.value = '';
      startTime.value = '';
      endTime.value = '';
    };

    return {
      employeeName,
      date,
      startTime,
      endTime,
      addEmployeeSchedule,
    };
  },
};
</script>

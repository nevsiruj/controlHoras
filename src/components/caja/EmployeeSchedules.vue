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
        <h1 class="text-2xl font-bold mb-4">Horarios de {{ employeeName }}</h1>
        <div v-if="schedules.length > 0">
          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="px-4 py-2">Fecha de entrada</th>
                <th class="px-4 py-2">Hora de entrada</th>
                <th class="px-4 py-2">Fecha de salida</th>
                <th class="px-4 py-2">Hora de salida</th>
                <th class="px-4 py-2">Horas trabajadas</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="schedule in schedules" :key="schedule.id">
                <td class="border px-4 py-2">{{ schedule.startDate }}</td>
                <td class="border px-4 py-2">{{ schedule.startTime }}</td>
                <td class="border px-4 py-2">{{ schedule.endDate }}</td>
                <td class="border px-4 py-2">{{ schedule.endTime }}</td>
                <td class="border px-4 py-2">{{ schedule.totalHours }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>No se han registrado horarios para este empleado.</p>
        </div>
        <button
          @click="$emit('go-back')"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Volver a la lista de empleados
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  props: ['employeeKey', 'employeeName'],
  setup(props) {
    const schedules = ref([]);

    const loadSchedules = async () => {
      try {
        const url = `https://controlhoras-3860e-default-rtdb.firebaseio.com/schedules.json?orderBy="employeeKey"&equalTo="${props.employeeKey}"`;
        const response = await fetch(url);

        if (response.ok) {
          const responseData = await response.json();
          const schedulesData = Object.entries(responseData).map(
            ([id, scheduleData]) => ({
              id,
              ...scheduleData,
            })
          );
          schedules.value = schedulesData;
        } else {
          console.error(
            'Error al obtener los horarios del empleado:',
            response.status
          );
          schedules.value = 'Error al obtener los horarios del empleado';
        }
      } catch (error) {
        console.error(error);
        schedules.value = 'Error al cargar los horarios del empleado';
      }
    };

    onMounted(() => {
      loadSchedules();
    });

    return {
      schedules,
      loadSchedules,
    };
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>

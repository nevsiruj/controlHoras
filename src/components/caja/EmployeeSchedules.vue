<template>
  <div>
    <h1>Ver Horarios</h1>
    <br />
    <label for="employee-id" class="block mb-2">ID de empleado:</label>
    <input
      type="text"
      id="employee-id"
      v-model="inputEmployeeId"
      placeholder="Ingrese el ID de empleado"
      class="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
    <button
      @click="checkEmployeeId"
      class="w-full px-3 py-2 bg-blue-500 text-white rounded-md mt-4"
    >
      Acceder
    </button>

    <div v-if="accessGranted" class="mt-8">
      <div
        class="
          min-h-screen
          bg-gray-100
          py-6
          flex flex-col
          justify-center
          sm:py-12
        "
        v-if="employeeData"
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
            class="
              relative
              px-4
              py-10
              bg-white
              shadow-lg
              sm:rounded-3xl sm:p-20
            "
          >
            <h1 class="text-2xl font-bold mb-4">
              Horarios de {{ employeeData ? employeeData.name : '' }}
            </h1>
            <div v-if="schedules.length > 0">
              <div class="overflow-x-auto">
                <table class="table-auto w-full">
                  <thead>
                    <tr>
                      <th class="w-1/5 px-4 py-2">Fecha de entrada</th>
                      <th class="w-1/5 px-4 py-2">Hora de entrada</th>
                      <th class="w-1/5 px-4 py-2">Fecha de salida</th>
                      <th class="w-1/5 px-4 py-2">Hora de salida</th>
                      <th class="w-1/5 px-4 py-2">Horas trabajadas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="schedule in schedules" :key="schedule.id">
                      <td class="border px-4 py-2">{{ schedule.startDate }}</td>
                      <td class="border px-4 py-2">{{ schedule.startTime }}</td>
                      <td class="border px-4 py-2">{{ schedule.endDate }}</td>
                      <td class="border px-4 py-2">{{ schedule.endTime }}</td>
                      <td class="border px-4 py-2">
                        {{
                          schedule.duration ? schedule.duration.toFixed(2) : ''
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- Agregar el siguiente código debajo de la tabla de horarios -->
                <div class="mt-4">
                  <p>
                    Total de horas trabajadas:
                    {{
                      employeeData.totalHours
                        ? employeeData.totalHours.toFixed(2)
                        : ''
                    }}
                  </p>
                </div>
              </div>
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
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  props: ['employeeKey', 'employeeName'],
  setup(props) {
    const inputEmployeeId = ref('');
    const accessGranted = ref(false);
    const schedules = ref([]);
    const employeeData = ref({});
    const employeeKey = ref('');

    const checkEmployeeId = async () => {
      const accessCode = inputEmployeeId.value;
      const url = `https://controlhoras-3860e-default-rtdb.firebaseio.com/employees.json?orderBy="accesscode"&equalTo="${accessCode}"`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          employeeData.value = await response.json();

          if (Object.keys(employeeData.value).length > 0) {
            employeeKey.value = Object.keys(employeeData.value)[0];
            accessGranted.value = true;
            if (employeeKey.value) {
              loadSchedules();
            }
          } else {
            alert('ID de empleado incorrecto.');
            accessGranted.value = false;
          }
        } else {
          console.error('Error al buscar empleado:', response.status);
        }
      } catch (error) {
        console.error('Error al buscar empleado:', error);
      }
    };

    const loadSchedules = async () => {
      try {
        const url = `https://controlhoras-3860e-default-rtdb.firebaseio.com/schedules.json?orderBy="employeeKey"&equalTo="${employeeKey.value}"`;
        const response = await fetch(url);

        if (response.ok) {
          const responseData = await response.json();
          // ...
          const schedulesData = Object.entries(responseData).map(
            ([id, scheduleData]) => ({
              id,
              ...scheduleData,
            })
          );
          schedules.value = schedulesData;

          // Calcular el total de horas trabajadas
          const totalHours = schedulesData.reduce((total, schedule) => {
            return total + (schedule.duration || 0);
          }, 0);

          // Agregar el total de horas al objeto "employeeData"
          employeeData.totalHours = totalHours;
          // ...
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

    onMounted(() => {});

    return {
      schedules,
      loadSchedules,
      inputEmployeeId,
      accessGranted,
      checkEmployeeId,
      employeeData,
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

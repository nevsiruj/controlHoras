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
    <div class="mt-4 flex space-x-4">
      <div>
        <label for="start-date">Fecha de inicio:</label>
        <input
          type="date"
          id="start-date"
          v-model="startDate"
          class="px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label for="end-date">Fecha de fin:</label>
        <input
          type="date"
          id="end-date"
          v-model="endDate"
          class="px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
    <div class="flex justify-between mt-4">
      <button
        @click="checkEmployeeId"
        class="w-full m-2 px-3 py-2 bg-blue-500 text-white rounded-md"
      >
        Mostrar
      </button>
      <button
        @click="clearData"
        class="w-full m-2 px-3 py-2 bg-red-500 text-white rounded-md"
      >
        Limpiar
      </button>
    </div>

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
                      <th class="w-1/5 px-4 py-2"></th>
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
                      <td class="border px-4 py-2">
                        <button
                          class="bg-red-500 text-white px-3 py-1 rounded-md"
                          @click="deleteSchedule(schedule.id)"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- Agregar el siguiente código debajo de la tabla de horarios -->
                <div class="mt-4">
                  <p>
                    Total de horas trabajadas:
                    {{ totalHours ? totalHours.toFixed(2) : '' }}
                  </p>
                </div>
              </div>
            </div>
            <div v-else>
              <p>No se han registrado horarios para este empleado.</p>
            </div>
            <!-- <button
              @click="$emit('go-back')"
              class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Volver a la lista de empleados
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseUrl } from '../../config.js';

import { ref, onMounted, computed } from 'vue';

export default {
  props: ['employeeKey', 'employeeName'],
  setup(props) {
    const inputEmployeeId = ref('');
    const accessGranted = ref(false);
    const schedules = ref([]);
    const employeeData = ref({});
    const employeeKey = ref('');
    const totalHours = ref(0);
    const startDate = ref('');
    const endDate = ref('');

    const checkEmployeeId = async () => {
      const accessCode = inputEmployeeId.value;
      const url = `${firebaseUrl}/employees.json?orderBy="accesscode"&equalTo="${accessCode}"`;

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
        const url = `${firebaseUrl}/schedules.json?orderBy="employeeKey"&equalTo="${employeeKey.value}"`;
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
          const totalHoursAux = schedulesData.reduce((total, schedule) => {
            return total + (schedule.duration || 0);
          }, 0);

          totalHours.value = totalHoursAux;
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

    const filteredSchedules = computed(() => {
      return schedules.value.filter((schedule) => {
        if (startDate.value && endDate.value) {
          return (
            new Date(schedule.startDate) >= new Date(startDate.value) &&
            new Date(schedule.endDate) <= new Date(endDate.value)
          );
        } else {
          return true;
        }
      });
    });

    const deleteSchedule = async (scheduleId) => {
      const confirmDelete = confirm(
        '¿Está seguro de que desea eliminar este horario?'
      );
      if (!confirmDelete) {
        return;
      }

      const confirmCode = prompt(
        'Por favor, ingrese el código para confirmar la eliminación.'
      );
      if (confirmCode !== '1212') {
        alert('Código incorrecto. No se ha eliminado el horario.');
        return;
      }

      const url = `${firebaseUrl}/schedules/${scheduleId}.json`;

      try {
        const response = await fetch(url, { method: 'DELETE' });
        if (response.ok) {
          const index = schedules.value.findIndex(
            (schedule) => schedule.id === scheduleId
          );
          schedules.value.splice(index, 1);

          // Actualizar el total de horas trabajadas
          const totalHoursAux = schedules.value.reduce((total, schedule) => {
            if (schedule.duration) {
              total += schedule.duration;
            }
            return total;
          }, 0);
          totalHours.value = totalHoursAux;
        } else {
          console.error('Error al eliminar el horario:', response.status);
        }
      } catch (error) {
        console.error('Error al eliminar el horario:', error);
      }
    };

    const clearData = () => {
      inputEmployeeId.value = '';
      accessGranted.value = false;
      schedules.value = [];
      employeeData.value = {};
      employeeKey.value = '';
      totalHours.value = 0;
      startDate.value = '';
      endDate.value = '';
    };

    onMounted(() => {});

    return {
      schedules: filteredSchedules,
      loadSchedules,
      inputEmployeeId,
      accessGranted,
      checkEmployeeId,
      employeeData,
      totalHours,
      startDate,
      endDate,
      clearData,
      deleteSchedule,
    };
  },
};
</script>

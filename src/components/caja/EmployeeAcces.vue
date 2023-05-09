<!-- src/components/EmployeeAccess.vue -->

<template>
  <div v-if="accessGranted" class="mt-8">
    <EmployeeSchedule :employee="employeeData" />
  </div>
  <div>
    <label for="employee-id" class="block mb-2">Codigo de Acceso:</label>
    <input
      type="text"
      id="employee-id"
      v-model="inputEmployeeId"
      placeholder="Ingrese el codigo"
      class="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
    <button
      v-if="!accessGranted"
      @click="checkEmployeeId"
      class="
        w-full
        px-3
        py-2
        bg-blue-500
        text-white
        rounded-md
        mt-4
        hover:bg-opacity-10
        transition-colors
        duration-300
      "
    >
      Cargar Horas
    </button>
    <button
      v-if="accessGranted"
      @click="accessGranted = false"
      class="
        w-full
        px-3
        py-2
        bg-green-500
        text-white
        rounded-md
        mt-4
        hover:bg-opacity-10
        transition-colors
        duration-300
      "
    >
      Volver
    </button>

    <button
      class="
        w-full
        px-3
        py-2
        bg-red-500
        text-white
        rounded-md
        mt-4
        hover:bg-opacity-10
        transition-colors
        duration-300
      "
    >
      <router-link class="nav-link" to="/verinfo">Ver Horas</router-link>
    </button>
  </div>
</template>

<script>
import { firebaseUrl } from '../../config.js';
import { ref } from 'vue';
import EmployeeSchedule from './EmployeeSchedule.vue';
import EmployeeSchedule from './EmployeeSchedule.vue';

export default {
  components: {
    EmployeeSchedule,
  },
  setup() {
    const inputEmployeeId = ref('');
    const accessGranted = ref(false);
    const employeeData = ref({});

    const checkEmployeeId = async () => {
      const accessCode = inputEmployeeId.value;
      const url = `${firebaseUrl}/employees.json?orderBy="accesscode"&equalTo="${accessCode}"`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          employeeData.value = await response.json();

          if (Object.keys(employeeData.value).length > 0) {
            // console.log(employeeData.value);
            accessGranted.value = true;
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

    // const checkEmployeeId = () => {
    //   const correctEmployeeId = '12345';
    //   if (inputEmployeeId.value === correctEmployeeId) {
    //     accessGranted.value = true;
    //   } else {
    //     alert('ID de empleado incorrecto.');
    //   }
    // };

    return {
      inputEmployeeId,
      accessGranted,
      checkEmployeeId,
      employeeData,
    };
  },
};
</script>

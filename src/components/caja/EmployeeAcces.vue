<!-- src/components/EmployeeAccess.vue -->

<template>
  <div>
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
      <EmployeeSchedule />
    </div>
  </div>
</template>

<script>
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

    const checkEmployeeId = () => {
      const correctEmployeeId = '12345';
      if (inputEmployeeId.value === correctEmployeeId) {
        accessGranted.value = true;
      } else {
        alert('ID de empleado incorrecto.');
      }
    };

    return {
      inputEmployeeId,
      accessGranted,
      checkEmployeeId,
    };
  },
};
</script>

<!-- src/components/EmployeeCard.vue -->

<template>
  <div class="bg-white shadow-lg rounded-md p-4 mb-4">
    <h3 class="text-xl font-semibold mb-2">{{ employee.name }}</h3>
    <p class="text-gray-600 mb-1">Fecha: {{ employee.date }}</p>
    <p class="text-gray-600 mb-1">Hora de inicio: {{ employee.startTime }}</p>
    <p class="text-gray-600">Hora de finalización: {{ employee.endTime }}</p>
  </div>
</template>

<script>
export default {
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
};
</script>

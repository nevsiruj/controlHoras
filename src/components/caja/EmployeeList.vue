<!-- src/components/EmployeeList.vue -->
<!-- 
<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Lista de empleados</h2>
    <div v-if="employees.length > 0">
      <EmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee"
      />
    </div>
    <p v-else class="text-gray-600">No hay empleados registrados.</p>
  </div>
  
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import EmployeeCard from './EmployeeCard.vue';
import { employeeService } from '../../composables/api/employeeService';

export default defineComponent({
  components: {
    EmployeeCard,
  },
  setup() {
    const employees = ref([]);

    onMounted(async () => {
      employees.value = await employeeService.getEmployees();
      console.log(employees.value);
    });

    return {
      employees,
    };
  },
});
</script> -->

<template>
  <div>
    <h1>Lista de empleados</h1>
    <ul>
      <li v-for="(employee, index) in employees" :key="index">
        {{ employee.name }} - {{ employee.position }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Employees',
  data() {
    return {
      employees: [],
    };
  },
  async created() {
    try {
      const response = await axios.get(
        'https://controlhoras-3860e-default-rtdb.firebaseio.com/employees.json'
      );
      this.employees = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

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
    <div>
      <h1 class="text-2xl font-bold mb-4">Lista de empleados</h1>
      <div v-for="employee in employees" :key="employee.id" class="mb-4">
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-lg font-semibold">{{ employee.name }}</h2>
          <p class="text-gray-600">Access Code: {{ employee.accesscode }}</p>
          <button
            @click="deleteEmployee(employee.id)"
            class="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <form @submit.prevent="addEmployee">
        <div class="mb-4">
          <label for="name" class="block font-medium mb-2">Nombre:</label>
          <input
            type="text"
            id="name"
            v-model="newEmployeeName"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="accesscode" class="block font-medium mb-2"
            >Access Code:</label
          >
          <input
            type="text"
            id="accesscode"
            v-model="newEmployeeAccessCode"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Agregar empleado
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'EmployeeList',
  created() {
    this.fetchEmployees();
  },
  data() {
    return {
      employees: [],
      newEmployeeName: '',
      newEmployeeAccessCode: '',
    };
  },
  methods: {
    async addEmployee() {
      try {
        const url =
          'https://controlhoras-3860e-default-rtdb.firebaseio.com/employees.json';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.newEmployeeName,
            accesscode: this.newEmployeeAccessCode,
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          this.employees.push({
            id: responseData.name,
            name: this.newEmployeeName,
            accesscode: this.newEmployeeAccessCode,
          });
          this.newEmployeeName = '';
          this.newEmployeeAccessCode = '';
        } else {
          console.error('Error al agregar el empleado:', response.status);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchEmployees() {
      console.log('Go');
      try {
        const url =
          'https://controlhoras-3860e-default-rtdb.firebaseio.com/employees.json';
        const response = await fetch(url);

        if (response.ok) {
          const responseData = await response.json();
          this.employees = Object.entries(responseData).map(
            ([id, employeeData]) => ({
              id,
              ...employeeData,
            })
          );
        } else {
          console.error(
            'Error al obtener la lista de empleados:',
            response.status
          );
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEmployee(employeeId) {
      try {
        const url = `https://controlhoras-3860e-default-rtdb.firebaseio.com/employees/${employeeId}.json`;
        const response = await fetch(url, {
          method: 'DELETE',
        });

        if (response.ok) {
          this.employees = this.employees.filter(
            (employee) => employee.id !== employeeId
          );
        } else {
          console.error('Error al eliminar el empleado:', response.status);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

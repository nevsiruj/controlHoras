<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8">Lista de empleados</h1>
    <div class="space-y-4">
      <div
        v-for="(employee, index) in employees"
        :key="index"
        class="border p-4 rounded-lg"
      >
        <p class="text-lg font-semibold">{{ employee.name }}</p>
        <p class="text-gray-500">{{ employee.accesscode }}</p>
      </div>
    </div>
    <div class="mt-8">
      <form @submit.prevent="addEmployee" class="space-y-4">
        <div>
          <label for="name" class="block font-semibold">Nombre:</label>
          <input
            type="text"
            id="name"
            v-model="newEmployeeName"
            class="w-full border p-2 rounded-lg"
          />
        </div>
        <div>
          <label for="accesscode" class="block font-semibold"
            >Access Code:</label
          >
          <input
            type="text"
            id="accesscode"
            v-model="newEmployeeAccessCode"
            class="w-full border p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Agregar empleado
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmployeeList',
  data() {
    return {
      employees: [],
      newEmployeeName: '',
      newEmployeeAccessCode: '',
    };
  },
  async created() {
    await this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
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
    async addEmployee() {
      if (
        this.newEmployeeName.trim() === '' ||
        this.newEmployeeAccessCode.trim() === ''
      ) {
        return;
      }

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
  },
};
</script>
<style>
/* Opcional: aquí se pueden agregar estilos personalizados para este componente */
</style>

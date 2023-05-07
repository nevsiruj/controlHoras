// src/services/employeeService.js

import { db } from '../../firebase';

export const employeeService = {
  async getEmployeeById(id) {
    const snapshot = await db.ref('employees/' + id).once('value');
    return snapshot.val();
  },
  async getEmployees() {
    const snapshot = await db.ref('employees').once('value');
    const employeesObj = snapshot.val();
    const employees = Object.keys(employeesObj).map((key) => ({
      ...employeesObj[key],
      id: key,
    }));
    return employees;
  },
};

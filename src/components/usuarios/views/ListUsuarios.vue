<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <td>{{ usuario.firstName }}</td>
              <td>{{ usuario.lastName }}</td>
              <td>
                <i
                  class="bi bi-x-square"
                  aria-hidden="true"
                  @click="eliminarUsuario(usuario.id)"
                ></i>

                <i
                  class="fa fa-edit"
                  aria-hidden="true"
                  @click="editarUsuario(usuario.id)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import UsuarioService from './components/usuarios/services/usuario.service.js';
import UsuarioService from '../services/usuario.service.js';

const userService = new UsuarioService();

export default {
  name: 'ListUsuarios',
  created() {
    this.getUsuarios();
    // this.usuarios = userService.getUsuarios().then((e) => console.log(e));

    console.log('Created');
  },
  data() {
    return {
      usuarios: [],
    };
  },
  methods: {
    getUsuarios() {
      userService.getUsuarios().then((e) => (this.usuarios = e));
    },
  },
};
</script>

<style scoped>
/* Agregar estilos personalizados aquí */
</style>

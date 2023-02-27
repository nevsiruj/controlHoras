<template>
  <div class="container mt-3">
    <form>
      <!-- <div class="form-group">
        <label for="fecha">Fecha</label>
        <input
          type="date"
          class="form-control form-control-sm"
          id="fecha"
          v-model="form.fecha"
        />
      </div> -->
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <input
          type="text"
          class="form-control form-control-sm"
          id="descripcion"
          v-model="form.descripcion"
        />
      </div>
      <div class="form-group">
        <label for="tipo-vehiculo">Tipo de vehículo</label>
        <select
          class="form-control form-control-sm"
          id="tipo-vehiculo"
          v-model="form.tipoVehiculoId"
        >
          <option value="">Seleccionar tipo de vehículo</option>
          <option
            v-for="tipoVehiculo in tiposVehiculos"
            :key="tipoVehiculo.id"
            :value="tipoVehiculo.id"
          >
            {{ tipoVehiculo.nombre }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="tipo-lavado">Tipo de lavado</label>
        <select
          class="form-control form-control-sm"
          id="tipo-lavado"
          v-model="form.tipoLavadoId"
        >
          <option value="">Seleccionar tipo de lavado</option>
          <option
            v-for="tipoLavado in tiposLavados"
            :key="tipoLavado.id"
            :value="tipoLavado.id"
          >
            {{ tipoLavado.nombre }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="importe">Importe</label>
        <input
          type="number"
          class="form-control form-control-sm"
          id="importe"
          v-model="form.importe"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary mt-3"
        @click.prevent="submitForm"
      >
        Guardar
      </button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import lavadoService from '../../composables/api/lavadoService.js';
// import { useLavados } from '../services';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const form = ref({
      cajaId: 0,
      fecha: '',
      tipoVehiculoId: '',
      tipoLavadoId: '',
      descripcion: '',
      importe: '',
    });

    // const tiposVehiculos = useTiposVehiculos();
    // const tiposLavados = useTiposLavados();
    // const lavados = useLavados();

    const tiposVehiculos = ref([
      { id: 1, nombre: 'Camioneta' },
      { id: 2, nombre: 'Auto' },
    ]);
    const tiposLavados = ref([{ id: 1, nombre: 'Lavado Común' }]);

    const submitForm = () => {
      form.value.cajaId = 1;
      form.value.fecha = new Date();
      lavadoService.addLavado(form);
      form.value = {};
      form.fecha = '';
      form.tipoVehiculoId = '';
      form.tipoLavadoId = '';
      form.descripcion = '';
      form.importe = '';
      router.push('/');
    };

    return {
      form,
      tiposVehiculos,
      tiposLavados,
      submitForm,
    };
  },
};
</script>

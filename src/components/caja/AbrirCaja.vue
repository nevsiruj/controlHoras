<template>
  <div class="container">
    <form @submit.prevent="abrirCaja">
      <h2>Abrir caja</h2>
      <div class="mb-3">
        <label for="responsable" class="form-label">Responsable:</label>
        <select
          class="form-control"
          id="responsable"
          v-model="formData.responsable"
          required
        >
          <option disabled value="">Seleccione una opción</option>
          <option
            v-for="responsable in responsables"
            :key="responsable.id"
            :value="responsable.nombre"
          >
            {{ responsable.nombre }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="monto" class="form-label">Monto de apertura:</label>
        <input
          type="number"
          class="form-control"
          id="monto"
          v-model="formData.montoInicial"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Abrir caja</button>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';

import cajaService from '../../composables/api/cajaService.js';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'AbrirCaja',
  setup() {
    const router = useRouter();
    const route = useRoute();

    const formData = reactive({
      responsable: '',
      montoInicial: '',
    });

    const responsables = reactive([
      { id: 1, nombre: 'Tu mama' },
      { id: 2, nombre: 'Tu hermanito' },
    ]);

    const abrirCaja = async () => {
      // Aquí podrías enviar la información a una API o almacenarla en la base de datos
      console.log(
        'Abriendo caja con responsable',
        formData.responsable,
        'y monto',
        formData.montoInicial
      );

      await cajaService.abrirCaja(formData).then((e) => console.log(e));
      // Reiniciamos los valores del formulario
      formData.responsable = '';
      formData.montoInicial = null;
      router.push('/');
    };

    onMounted(() => {});

    return {
      formData,
      responsables,
      abrirCaja,
    };
  },
};
</script>

<style>
/* Estilos de Bootstrap */
</style>

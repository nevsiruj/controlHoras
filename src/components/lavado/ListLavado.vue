<template>
  <div>
    <a href="#" @click="goBack">&lt; Volver atrás</a>

    <div class="card m-4">
      <div class="card-header">Lavados</div>
      <div class="card-body">
        <table
          class="table table-responsive table-hover table-striped table-sm"
        >
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lavado in autosLavados" :key="lavado.id">
              <td>
                {{ lavado.fecha }}
              </td>
              <td>{{ lavado.descripcion }}</td>
              <td>{{ Number(lavado.importe) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
// import { useLavados } from './composables/api';

// import lavadoService from '../services/lavado.service.js';
import lavadoService from '../../composables/api/lavadoService.js';
import cajaService from '../../composables/api/cajaService.js';

// import { useLavado } from '../services/useLavado';

export default {
  setup() {
    let cajaAbierta = ref({});
    let autosLavados = ref([]);
    cajaAbierta = cajaService.getCajaAbierta();

    onMounted(async () => {
      autosLavados.value = await lavadoService.getLavadosByCaja(
        cajaAbierta.value.id
      );
    });

    return {
      autosLavados,
      cajaAbierta,
    };
  },
  name: 'LavadoList',
  props: {},
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

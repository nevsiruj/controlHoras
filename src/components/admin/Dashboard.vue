<template>
  <div class="container-fluid">
    <!-- <Navbar /> -->
    <div class="row">
      <div class="col-md-6">
        <LavadosChart />
      </div>
      <div class="col-md-6">
        <h2>Ingresos y egresos</h2>
        <!-- <IngresosEgresosChart /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import Navbar from './Navbar.vue';
import LavadosChart from './LavadosChart.vue';
// import IngresosEgresosChart from './IngresosEgresosChart.vue';

export default {
  name: 'Dashboard',
  components: {
    // Navbar,
    LavadosChart,
    // IngresosEgresosChart,
  },
};
</script>

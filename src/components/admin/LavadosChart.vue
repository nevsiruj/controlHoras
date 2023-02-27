<template>
  <div>
    <h2>Lavados por día</h2>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import lavadoService from '../../composables/api/lavadoService.js';

export default {
  name: 'LavadosChart',
  setup() {
    const chartRef = ref(null);
    let importes = ref([]);

    let lavados = ref([]);
    // lavados = lavadoService.getLavados();
    // importes = lavados.value.map((lavado) => lavado.importe);
    // console.log(importes);

    onMounted(() => {
      const ctx = chartRef.value.getContext('2d');

      // lavadoService.getLavados().then((r) => {
      //   lavados = r;
      //   // console.log(lavados);
      //   importes = lavados.map((lavado) => lavado.importe);
      //   console.log(importes);
      // });

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Junio'],
          datasets: [
            {
              label: 'Cantidad de lavados',
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });

    return {
      chartRef,
    };
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 400px;
}
</style>

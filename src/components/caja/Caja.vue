<template>
  <div>
    <VueDatePicker
      v-model="time"
      time-picker
      disable-time-range-validation
      range
      placeholder="Select Time"
    />
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: { VueDatePicker },
  data() {
    return {
      date: null,
    };
  },
};
</script>

<template>
  <div class="app">
    <v-col>
    <VueClock /><br>
    {{new Date().toDateString()}}
    </v-col>
  </div>
</template>

<script>
import VueClock from '@dangvanthanh/vue-clock'

export default {
  components: { VueClock },
  
}
</script>
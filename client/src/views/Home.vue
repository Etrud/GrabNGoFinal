<template>
  <div class="about">
    <h1>Welcome! USERNAME</h1>
    <Clock/>
    <todayCalendar/>
  </div>
</template>


<script>
import Clock from '@/components/Clock.vue'
import todayCalendar from '@/components/todayCalendar.vue'

export default {
  components: { Clock, todayCalendar },
    
}
</script>
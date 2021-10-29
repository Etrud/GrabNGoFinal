<template>
  <div class="about">
    <h1>Welcome, {{fullName}}!</h1>
    <Clock/>
    <todayCalendar/>
  </div>
</template>


<script>
import Clock from '@/components/Clock.vue'
import todayCalendar from '@/components/todayCalendar.vue'




export default {
  components: { Clock, todayCalendar },
  computed: {
    fullName: function() {
      var first = JSON.stringify(this.$store.state.user.firstname);
      var last = JSON.stringify(this.$store.state.user.lastname);

      var newName = first + " " + last
      
      console.log(newName)
      return newName.replace(/['"]+/g, '')
  }
}
}
</script>
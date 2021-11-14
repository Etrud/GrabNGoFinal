<template>
  <div class="home">
    <HelloWorld msg="Welcome to Grab N Go Scheduler" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Launch",
  components: {
    HelloWorld,
  },
};
</script>

<template>
  <div class="home mt-8">
    <h1>String</h1>
    <StringBuild canvasID="c3" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import StringBuild from '@/components/StringBuild.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    StringBuild
  }
}
</script>

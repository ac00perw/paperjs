<template>
  <div class="home mt-8">
    <StringBuild canvasID="c3" class="canv" />
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

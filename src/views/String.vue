<template>
  <div class="home">
    <h1>String</h1>
    <WavesBuild canvasID="c3" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import WavesBuild from '@/components/WavesBuild.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    WavesBuild
  }
}
</script>

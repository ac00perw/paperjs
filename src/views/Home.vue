<template>
  <div class="home mt-8">
    <div class="fixed top-0 left-0 p-2 bg-white text-xs">Use the mouse to control the 'pen'</div>
    <Canvas canvasID="c3" class="canv"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Canvas from '@/components/Canvas.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Canvas
  }
}
</script>
<style scoped>

  </style>

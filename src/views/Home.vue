<template>
  <div class="home mt-8">
    <p>Draw on a canvas</p>
    <Canvas canvasID="c3" />
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

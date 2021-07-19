<template>
    <div class="home">
        <canvas class="canvas-style" ref="c3" @mousemove="mouseMove" />
        <div class="underneath">
          <div class="para">
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
          </div>
        </div>
    </div>
</template>
<script>
import paper from 'paper';

export default {
    name: 'Lava',
    props: ['color'],
    data() {
        return {
            mousePos: null,
            pathHeight: null,
            tool: null,
            paper: null,
            path: null,
            points: 14,
            width: 0,
            height: 0,
            center: null
        }
    },
    destroyed() {
        this.paper = null;
    },
    mounted() {
        this.paper = new paper.PaperScope();

        this.paper.setup(this.$refs['c3']);
        this.width = this.paper.view.size.width;
        this.height = this.paper.view.size.height;
        this.center = this.paper.view.center;
        this.mousePos = this.paper.view.center;
        this.pathHeight = this.mousePos.y;
        this.path = null;
        this.init();
    },
    methods: {
        init() {
            var vm = this;
            vm.paper.activate();
            vm
            vm.path = new paper.Path({
                fillColor: '#99cc99',
                strokeColor: '#99cc99',
                strokeWidth: '4',
                closed: false,
                // selected: true
            });
            vm.path.segments = [];
            vm.path.add(0, vm.height);
            vm.path.add(0, vm.height/2);
            console.log(vm.paper.view.bounds.bottomLeft);

            for (var i = 1; i < vm.points; i++) {
                var point = new paper.Point(vm.width / vm.points * i, vm.height/2);
                vm.path.add(point);
            }
            vm.path.add(vm.width, vm.height/2)
            vm.path.add(vm.width, vm.height)
            vm.paper.view.onFrame = (e) => vm.onFrame(e);
        },
        onFrame(event) {
            var vm = this;
            vm.pathHeight += (vm.center.y - (10) - (vm.pathHeight)) / 10;
            for (var i = 1; i < vm.points; i++) {
                var sinSeed = event.count + (i + i % 10) * 100;
                var sinHeight = Math.sin(sinSeed / 100) * vm.pathHeight;
                var yPos = Math.sin(sinSeed / 200) * sinHeight + (vm.height/2);
                vm.path.segments[i].point.y = yPos;
            }
            vm.path.smooth({ type: 'continuous' });
        },
        onResize(event) {
            initializePath();
        },
        mouseMove() {
            var vm = this;

            vm.tool = new paper.Tool();
            vm.tool.onMouseMove = (event) => {

                vm.mousePos = event.point;
            }
        }
    }
}
</script>
<style scoped>
.canvas-style {
    width: 100% !important;
    height: 100px !important;
    display: block;
    margin: 0 auto;
}
.underneath {
  width:  100%;
  height:  100vh;
  margin:  0;
  padding:  0;
  background-color:  #99cc99;
}
.para {
  text-align:  left;
  max-width:  400px;
  margin:  0 auto;
  padding-top:  20px;
  @apply text-white font-bold;
}
</style>
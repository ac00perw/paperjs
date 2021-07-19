<template>
    <div class="home relative">
        <canvas class="canvas-style" ref="c3" @mousemove="mouseMove" />
        <!--         <div v-if="path && path.segments" v-for="p in path.segments">
        {{ p }}
        </div> -->
    </div>
</template>
<script>
import paper from 'paper';

export default {
    name: 'Lava',
    props: ['color'],
    data() {
        return {
            lastPos: 0,
            delta: 0,
            deltaMax: 120,
            mousePos: null,
            pathHeight: null,
            tool: null,
            paper: null,
            path: null,
            points: 21,
            width: 0,
            height: 0,
            speed: 0,
            center: null,
            radius: 240
        }
    },
    destroyed() {
        this.paper = null;
        console.log('kill')
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
                strokeColor: '#99aa11',
                fillColor: '#99aa11',
                strokeWidth: '10',
                closed: true
            });

            for (var i = 0; i < vm.points; i++) {
                // var point = new paper.Point(vm.width / vm.points * i, vm.height/2);
                var point = vm.drawPoint(i);
                // point = point - vm.paper.view.center;
                // point = point + new paper.Point.random();
                vm.path.add(point);
            }

            // var rect = new paper.Shape.Rectangle(new paper.Point(0, vm.height - 10), new paper.Point(vm.width, vm.height))
            // rect.fillColor = new paper.Color(.6, .8, .6);
            vm.paper.view.onFrame = (e) => vm.onFrame(e);
        },
        drawPoint(currentPoint) {
            var vm = this;
            var theta = ((Math.PI * 2) / vm.points);
            var angle = (theta * currentPoint);

            return new paper.Point(vm.paper.view.center.x - vm.radius * Math.cos(angle), vm.paper.view.center.y - vm.radius * Math.sin(angle));
        },
        onFrame(event) {
            var vm = this;
            vm.pathHeight += (vm.center.y - (vm.delta * 8) - (vm.pathHeight / 2)) / 10;
            for (var i = 0; i < vm.path.segments.length; i++) {
                var sinSeed = event.count + (i + i % 2) * 10;
                var sinHeight = Math.sin(sinSeed / 200) * (vm.pathHeight / 3);
                var yPos = Math.sin(sinSeed / 200) * sinHeight + (vm.height);
                var xPos = Math.cos(sinSeed / 400) * vm.width;
                vm.path.segments[i].point.y -= Math.sin(yPos / 10);
                vm.path.segments[i].point.x -= Math.sin(xPos / 10);
            }
            vm.path.smooth({ type: 'continuous' });
            // vm.path.simplify();
            
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
<style>
:root {
    --canvasheight: 100vh;
}
</style>
<style scoped>
.canvas-style {
    position: fixed;
    top: 0;
    left: 0;
    width: 100% !important;
    height: var(--canvasheight) !important;
    display: block;
    margin: auto;
    z-index: -10;
}

.underneath {
    position: fixed;
    top: var(--canvasheight);
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #99cc99;
}

.text {
    position: relative;
    margin: 200px auto 0 auto;
    max-width: 500px;
    min-height: 80vh;
    z-index: 10;
}

.para {
    text-align: left;
    max-width: 400px;
    min-height: 1600px;
    padding-top: 20px;

}
</style>
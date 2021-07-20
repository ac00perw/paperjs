<template>
    <div class="home relative">
        <canvas class="canvas-style" ref="c3" @mousemove="mouseMove" />
                <div v-for="p in shapes">
        {{ vm.paper.project.activeLayer.children[0] }}
        </div>
    </div>
</template>
<script>
import paper from 'paper';

export default {
    name: 'Shapes',
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
            points: 30,
            shapes: [],
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

            for (var i = 0; i < vm.points; i++) {
                // var point = new paper.Point(vm.width / vm.points * i, vm.height/2);
                vm.shapes[i] = vm.drawCircle(i);
                vm.shapes[i].strokeColor = '#99aa11' ;
                vm.shapes[i].fillColor = '#99cc11' ;
                vm.shapes[i].strokeWidth = 3;
                vm.shapes[i].opacity =.7;
                console.log(vm.shapes[i]);
                // point = point - vm.paper.view.center;
                // point = point + new paper.Point.random();
                // vm.path.add(point);
            }

            // var rect = new paper.Shape.Rectangle(new paper.Point(0, vm.height - 10), new paper.Point(vm.width, vm.height))
            // rect.fillColor = new paper.Color(.6, .8, .6);
            vm.paper.view.onFrame = (e) => vm.onFrame(e);
        },
        drawCircle(currentPoint) {
            var vm = this;
            var theta = ((Math.PI * 2) / vm.points);
            var angle = (theta * currentPoint);
            return new paper.Path.Ellipse(new paper.Point(vm.paper.view.center.x - (vm.radius * Math.cos(angle)), vm.paper.view.center.y - vm.radius * Math.sin(angle)), [vm.rand(50,70), vm.rand(59,69)]);

        },
        rand(min, max) {
            return Math.random() * max + min;
        },
        onFrame(event) {
            var vm = this;
            vm.pathHeight += (vm.center.y - (vm.delta * 8) - (vm.pathHeight / 2)) / 10;
            for (var i = 0; i < vm.points; i++) {
                var sinSeed = event.count + (i + i % 2) * 100;
                var sinHeight = Math.sin(sinSeed / 200) * (vm.pathHeight / 3);
                var yPos = Math.sin(sinSeed / 400) * sinHeight + (vm.height);
                var xPos = Math.cos(sinSeed / 200) * vm.width;
                var item = vm.paper.project.activeLayer.children[i];
                item.position.y -= Math.sin(yPos / 20);
                item.position.x -= Math.sin(xPos / 20);
                item.rotate(Math.sin(yPos / 20)* 10);

                // item.strokeWidth = Math.random() * 2;

                // vm.
                // vm.shapes[i].moveTo(vm.width/2, Math.sin(xPos / 10))
            }

            // vm.path.smooth({ type: 'catmull-rom', factor: .05 });
            
        },
        onResize(event) {
            this.init();
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100vh !important;
    display: block;
    margin: auto;
    z-index: -10;
}

.underneath {
    position: fixed;
    top: 100vh;
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
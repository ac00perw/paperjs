<template>
    <div class="home relative">
        <div class="fixed top-0 left-0 p-2 bg-white">Use the mouse to draw lines</div>
        <button class="my-4 bg-blue-500 text-white rounded-md p-2" @click="download">Download SVG</button>
        <button class="my-4 bg-red-500 ml-4 text-white rounded-md p-2" @click="init">Erase</button>
        <canvas class="canvas-style" ref="c3" @mouseup="mousing = false" @mousedown="mousing = true" @mousemove="mouseMove" />
    </div>
</template>
<script>
import paper from 'paper';

export default {
    name: 'DrawShapes',
    data() {
        return {
            lastPos: 0,
            delta: 0,
            deltaMax: 120,
            mousePos: null,
            mousing: false,
            pathHeight: null,
            tool: null,
            paper: null,
            path: null,
            points: 10,
            shapes: [],
            width: 0,
            height: 0,
            speed: 0,
            center: null,
            radius: 200,
            from: null
        }
    },
    destroyed() {
        this.paper = null;
        console.log('kill')
    },
    mounted() {
        this.paper = new paper.PaperScope();
        this.paper.setup(this.$refs['c3']);
        this.paper.activate();

        this.init();
    },
    methods: {
        download() {
            var fileName = "lines_drawing.svg"

            var url = "data:image/svg+xml;utf8," + encodeURIComponent(this.paper.project.exportSVG({ asString: true, matchShapes: true }));

            var link = document.createElement("a");
            link.download = fileName;
            link.href = url;
            link.click();
        },
        resetPaper() {
            this.paper.project.activeLayer.removeChildren();
            this.paper.view.draw();
        },
        init() {
            console.log('init')
            this.resetPaper();
            this.width = this.paper.view.size.width;
            this.height = this.paper.view.size.height;
            this.center = this.paper.view.center;
            this.from = this.paper.view.center;
            this.mousePos = this.paper.view.center;
            this.pathHeight = this.mousePos.y;

            // this.$nextTick((vm) => { 
            this.paper.view.onFrame = (e) => this.onFrame(e);
            // })

            // this.init();

        },
        drawShapes(count) {
            var vm = this;


            for (var i = 0; i < vm.points; i++) {
                // var point = new paper.Point(vm.width / vm.points * i, vm.height/2);
                vm.shapes[i] = vm.drawBox(i, count);
                vm.shapes[i].strokeColor = '#99aa11';
                // vm.shapes[i].fillColor = '#99cc11' ;
                vm.shapes[i].strokeWidth = 1;
                vm.shapes[i].opacity = .3;
                vm.shapes[i].rotate(count * 1.1)
                // point = point - vm.paper.view.center;
                // point = point + new paper.Point.random();
                // vm.path.add(point);
            }

        },
        drawBox(currentPoint, count) {
            var vm = this;
            var boxSize = 350;
            var theta = ((Math.PI * 2) / vm.points);
            var angle = (theta * currentPoint);
            var modifier1 = Math.cos(count * 300) * (120 + count);
            var modifier2 = Math.sin(count * 300) * vm.rand(100, 300);
            var to = new paper.Point(vm.mousePos.x - (vm.radius * Math.cos(angle) + modifier1) - (boxSize / 2), vm.mousePos.y - (vm.radius * Math.sin(angle) + modifier2) - (boxSize / 2));
            return new paper.Path.Line(vm.mousePos, to)
            vm.from = to;
            // return new paper.Path.Rectangle(to, new paper.Size(boxSize + (modifier2/2), boxSize + (modifier1/2)));

        },
        rand(min, max) {
            return Math.random() * max + min;
        },
        onFrame(event) {
            var vm = this;
            // draw shapes
            //if (event.count % 2) {
            if(vm.mousing){
                vm.drawShapes(event.count);
                    
            }
           //}


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
    cursor:  pointer;
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
<template>
    <div class="home relative">
        <!-- <span v-if="paper && paper.project">{{ paper.project.layers }}</span> --> <span v-if="shapes">{{ shapes[12]}}</span> pt:{{mousePos}} sel:{{ selectedPoint}}
        <div class="fixed top-0 left-0 p-2 bg-white">Use the mouse to draw lines</div>
        <!-- <button class="my-4 bg-blue-500 text-white rounded-md p-2" @click="download">Download SVG</button> -->
        <button class="my-4 bg-red-500 ml-4 text-white rounded-md p-2" @click="init">Erase</button>
        <canvas class="canvas-style" ref="c3" @mouseup="mousing = false" @mousedown="mousing = true" @mousemove="mouseMove" />
    </div>
</template>
<script>
import paper from 'paper';

export default {
    name: 'TimeBoxes2',
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
            layer: null,
            path: null,
            shapes: [],
            width: 0,
            height: 0,
            speed: 0,
            center: null,
            boxSize: { x: 150, y: 100 },
            xPostitions: 0,
            yPositions: 0,
            from: null,
            matrix: [],
            selectedPoint: null,
            i: 0,
            iterations: 50
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
        shuffle(arr) {
            arr.sort(() => Math.random() - 0.5);
        },
        buildMatrix() {

            for (var j = 0, yc = Math.ceil(this.height / this.boxSize.y); j < yc; j++) { //build rows
                for (var i = 0, c = Math.ceil(this.width / this.boxSize.x); i < c; i++) {
                    console.log(i % 2);
                    this.matrix.push({ x: i * this.boxSize.x + this.rand(0, 2) + (j % 2) * (this.boxSize.x / 2) + (i % 2 * 2), y: (j * this.boxSize.y + (j * 3)) });
                }
            }

            this.shuffle(this.matrix);
        },
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
            //this.paper.view.draw();
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
            this.buildMatrix();
            this.path = new paper.Path();
            //build array of potential slots
            // shuffle slots
            // pick first slot
            // remove slot
            this.paper.view.onFrame = (e) => this.onFrame(e);

        },
        drawShapes(count) {
            var vm = this;
            
            for (var m = 0, max = vm.iterations; m < max; m++) {
                if (vm.matrix.length > 0) {

                    // var point = new paper.Point(vm.width / vm.points * i, vm.height/2);
                    var spot = vm.matrix.shift();
                    vm.shapes[vm.i] = new paper.Shape.Rectangle(new paper.Point(spot), new paper.Size(vm.boxSize.x, vm.boxSize.y));
                    
                    var color = `#${Math.round(vm.rand(7,9))}${Math.round(vm.rand(4,9))}aa11`;
                    vm.shapes[vm.i].strokeColor = color;
                    // vm.shapes[i].fillColor = color;
                    vm.shapes[vm.i].strokeWidth = .1;
                    vm.shapes[vm.i].opacity = vm.rand(.6, .8);
                    // vm.shapes[vm.i].smooth({ type: 'continuous' });
                    // vm.shapes[vm.i].rotate(vm.rand(-1,1));
                    // vm.path.add(vm.shapes[vm.i]);
                    vm.i += 1;
                }
            }

        },
        rand(min, max) {
            return Math.random() * max + min;
        },
        onFrame(event) {
            var vm = this;
            if (vm.mousing) {
                vm.drawShapes(event.count);
            }
        },
        onResize(event) {
            this.init();
        },
        mouseMove() {
            var vm = this;

            vm.tool = new paper.Tool();
            // vm.tool.minDistance = vm.boxSize;
            vm.tool.onMouseMove = (event) => {
                vm.mousePos = event.point;
                // for (var i = 0, m = vm.shapes.length; i < m; i++) {
                //     var c = vm.shapes[i];
                    var test = vm.layer.hitTest(event.point);
                    console.log(test);
                    for(var i=0, c= test.length; i < c; i++) {
                        test[i].position.x += Math.sin(event.count * 2) * (vm.boxSize.x / 2);
                        test[i].position.y += Math.cos(event.count * 2) * (vm.boxSize.y / 2);
                    }
                    

                // }
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
    cursor: pointer;
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
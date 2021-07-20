<template>
    <div>
        <button class="my-4 bg-blue-500 text-white rounded-md p-2" @click="download">Download SVG</button>
        <canvas :id="canvasID" class="canvas-style" v-on:mousedown="mouseDown" />
    </div>
</template>
<script>
const paper = require('paper');

export default {
    name: "Canvas",
    props: ['canvasID'],
    data() {
        return {
            path: null,
            scope: null
        }
    },
    computed: {
        paper() {
            return paper;
        }
    },
    destroyed() {
         window.addEventListener('resize', this.resize);
         this.scope = null;   
    },
    mounted() {
        this.init();
        window.addEventListener('resize', this.resize);
    },
    methods: {
        init(){
            this.scope = new paper.PaperScope();
            this.scope.setup(this.canvasID);
        },
        resize() {
            var vm = this;
            vm.scope.view.onResize = function(event) {
                console.log('re')
                // vm.scope = null;
                vm.path.position = vm.scope.view.center;
                // Whenever the view is resized, move the path to its center:
                // vm.init();
            }
        },
        download() {
            var fileName = "paperjs_drawing.svg"

            var url = "data:image/svg+xml;utf8," + encodeURIComponent(this.scope.project.exportSVG({ asString: true }));

            var link = document.createElement("a");
            link.download = fileName;
            link.href = url;
            link.click();
        },
        // reset() {
        //     this.scope.project.activeLayer.removeChildren();
        // },
        pathCreate(scope) {
            scope.activate();
            return new paper.Path({
                strokeColor: "#000000",
                strokeJoin: 'round',
                strokeWidth: 4
            })
        },
        createTool(scope) {
            scope.activate();
            return new paper.Tool();
        },
        mouseDown() {
            console.log('f');
            // in order to access functions in nested tool
            let vm = this;
            // create drawing tool
            this.tool = this.createTool(this.scope);
            this.tool.onMouseDown = (event) => {
                console.log('f');
                // init path
                vm.path = vm.pathCreate(vm.scope);
                // add point to path
                vm.path.add(event.point);

            };
            this.tool.onMouseDrag = (event) => {
                vm.path.add(event);
            };
            this.tool.onMouseUp = (event) => {
                // line completed
                vm.path.add(event.point);
            }
        }
    }
}
</script>
<style scoped>
.canvas-style {
    cursor: crosshair;
    width: 1200px;
    height: 700px;
    border: 1px solid black;
    display: fixed;
    top: 0;
    left: 0;
    margin: auto;
}

</style>
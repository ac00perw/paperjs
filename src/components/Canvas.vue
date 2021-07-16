<template>
    <div>
        {{ canvasID }} {{ scope }}
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
        mounted() {
            this.scope = new paper.PaperScope();
            this.scope.setup(this.canvasID);
        },
        methods: {
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
        width: 100% !important;
        height: 500px !important;
        border: 5px solid black;
        border-radius: 10px;
        display: block;
        margin: auto;
        box-shadow: 0 10px 8px -8px black;
    }
</style>
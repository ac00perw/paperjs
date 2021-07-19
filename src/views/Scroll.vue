<template>
    <div class="home relative">
        <div class="fixed p-2 bg-white border top-0 left-0">
            {{ delta }}
        </div>
        <canvas class="canvas-style" ref="c3" @mousemove="mouseMove" />
        <div class="underneath">
            &nbsp;
        </div>
        <div class="text">
            <div class="para">
                <span class="font-bold">Detect scroll velocity and use it to change shape of waves. </span>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>
            <div class="para">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>
            <div class="para">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>
            <div class="para">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>
            <div class="para">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>
            <div class="para">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
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
            lastPos: 0,
            delta: 0,
            deltaMax: 120,
            mousePos: null,
            pathHeight: null,
            tool: null,
            paper: null,
            path: null,
            points: 20,
            width: 0,
            height: 0,
            speed: 0,
            center: null
        }
    },
    destroyed() {
        this.paper = null;
        window.removeEventListener('scroll', this.handleScroll);
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

        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        clear() {
            // this.lastPos = null;
            this.delta = 10;
        },
        handleScroll() {
            var newPos, timer, delay = 50;

            this.clear();

            newPos = window.scrollY;

            if (this.lastPos != null) { // && newPos < maxScroll 
                this.delta = Math.abs(newPos - this.lastPos);
                if (this.delta > this.deltaMax)
                    this.delta = this.deltaMax;
            }
            this.lastPos = newPos;
            clearTimeout(timer);
            timer = setTimeout(this.clear, delay);

        },
        init() {
            var vm = this;
            vm.paper.activate();
            vm
            vm.path = new paper.Path({
                strokeColor: '#99cc88',
                fillColor: '#99cc99',
                strokeWidth: '10',
                closed: true
            });
            vm.path.segments = [];
            vm.path.add(-200, vm.height);
            vm.path.add(-200, vm.height / 2);

            for (var i = 1; i < vm.points; i++) {
                var point = new paper.Point(vm.width / vm.points * i, vm.height/2);
                vm.path.add(point);
            }
            vm.path.add(vm.width + 200, vm.height / 2)
            vm.path.add(vm.width + 200, vm.height)
            vm.path.add(-400, vm.height)

            // var rect = new paper.Shape.Rectangle(new paper.Point(0, vm.height - 10), new paper.Point(vm.width, vm.height))
            // rect.fillColor = new paper.Color(.6, .8, .6);
            vm.paper.view.onFrame = (e) => vm.onFrame(e);
        },
        onFrame(event) {
            var vm = this;
            vm.pathHeight += (vm.center.y - (vm.delta * 8) - (vm.pathHeight/2)) / 60;
            for (var i = 1; i < vm.points; i++) {
                var sinSeed = event.count + (i + i % 10) * (300);
                var sinHeight = Math.sin(sinSeed / 200) * (vm.pathHeight / 2);
                var yPos = Math.sin(sinSeed / 300) * sinHeight + (vm.height/2 - 50);
                vm.path.segments[i+1].point.y = yPos;
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
<style>
:root {
    --canvasheight: 300px;
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
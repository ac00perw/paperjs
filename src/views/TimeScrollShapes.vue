<template>
    <div class="home relative">
        <div class="fixed p-2 bg-white border top-0 left-0 text-xs">
            Scrolling draws background
        </div>
        <span v-if="!mousing"><button @click="init">restart</button></span>
        <canvas class="canvas-style" ref="c3" @mousemove="mouseMove" />
        <div class="progress">
            <div class="bar" :style="{width: `${pct}%`}">&nbsp;</div>
        </div>
        <canvas class="canvas-style" ref="c3" @mousemove="mouseMove" />
        <div class="underneath">
            &nbsp;
        </div>
        <div class="text">
            <div class="para" v-for="index in 50">
                <span class="font-bold">Scroll down to change the background lines.</span> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>
        </div>
    </div>
</template>
<script>
import paper from 'paper';

export default {
    name: 'TimeShapes',
    data() {
        return {
            pct: 0,
            lastPos: 0,
            delta: 0,
            deltaMax: 120,
            mousePos: null,
            mousing: false,
            tool: null,
            paper: null,
            path: null,
            points: 10,
            shapes: [],
            width: 0,
            height: 0,
            speed: 0,
            center: null,
            radius: 1200,
            from: null
        }
    },
    destroyed() {
        this.paper = null;
        console.log('kill')
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
        this.paper = new paper.PaperScope();
        this.paper.setup(this.$refs['c3']);
        this.paper.activate();
        window.addEventListener('scroll', this.handleScroll);
        this.init();
    },
    methods: {
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
                vm.shapes[i].opacity = .2;
                vm.shapes[i].rotate(count * .3)
                // point = point - vm.paper.view.center;
                // point = point + new paper.Point.random();
                // vm.path.add(point);
            }

        },
        drawBox(currentPoint, count) {
            var vm = this;
            var boxSize = 100;
            var theta = ((Math.PI * 2) / vm.points);
            var angle = (theta * currentPoint);
            var modifier1 = Math.cos(count * 300) * (220 + count);
            var modifier2 = Math.sin(count * 300) * vm.rand(100, 300);
            var to = new paper.Point(vm.paper.view.center.x - (vm.radius * Math.cos(angle) + modifier1) - (boxSize / 2), vm.paper.view.center.y - (vm.radius * Math.sin(angle) + modifier2) - (boxSize / 2));
            var rand = new paper.Point.random()
            return new paper.Path.Line(rand, to)
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
            if (vm.delta > 4) {
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
        },
        getDocHeight() {
            var D = document;
            return Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight
            )
        },
        calculatePercentage() {
            var winheight = window.innerHeight || (document.documentElement || document.body).clientHeight
            var docheight = this.getDocHeight()
            var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
            var trackLength = docheight - winheight
            var pctScrolled = Math.floor(scrollTop / trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
            console.log(pctScrolled + '% scrolled');
            this.pct = pctScrolled;
        },
        clear() {
            // this.lastPos = null;
            this.delta = 0;
        },
        handleScroll() {
            var newPos, timer, delay = 50;

            this.clear();

            newPos = window.scrollY;
            this.calculatePercentage();

            if (this.lastPos != null) { // && newPos < maxScroll 
                this.delta = Math.abs(newPos - this.lastPos);
                if (this.delta > this.deltaMax)
                    this.delta = this.deltaMax;
            }
            this.lastPos = newPos;
            clearTimeout(timer);
            timer = setTimeout(this.clear, delay);

        },
    }
}
</script>
<style>
:root {
    --canvasheight: 100vh;
}
</style>
<style scoped>
.home {
    height: 4000px;
}

.canvas-style {
    position: fixed;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100vh;
    display: block;
    margin: auto;
    z-index: -10;
    cursor: pointer;
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
    max-width: 600px;
    padding: 15px;
    margin-bottom: 450px;
    background-color: hsl(80, 40%, 80%);

}
</style>
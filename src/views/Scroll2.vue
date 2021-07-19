<template>
    <div class="home relative">
        <div class="fixed p-2 bg-white border top-0 left-0">
            {{ delta }} <span v-if="path">{{ path.segments.length }}</span>
            <div>
                <custom-slider :values="sliderValues" v-model="sinSeedModifier" />
                sinSeed modifier
            </div>
        </div>
        <div class="progress">
            <div class="bar" :style="{width: `${pct}%`}">&nbsp;</div>
        </div>
        <canvas class="canvas-style" ref="c3" @mousemove="mouseMove" />
        <div class="underneath">
            &nbsp;
        </div>
        <div class="text">
            <div class="para">
                <span class="font-bold">Use distance to bottom of page to affect waves.</span> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
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
import CustomSlider from "vue-custom-range-slider";
import "vue-custom-range-slider/dist/vue-custom-range-slider.css";


export default {
    name: 'Lava',
    props: ['color'],
    components: { CustomSlider },
    data() {
        return {
            scrollY: 0,
            lastPos: 0,
            sinSeedModifier: '50',
            pct: 0,
            windowHeight: 0,
            delta: 0,
            deltaMax: 120,
            mousePos: null,
            pathHeight: null,
            tool: null,
            paper: null,
            path: null,
            points: 18,
            pointsIn: null,
            width: 0,
            height: 0,
            speed: 0,
            center: null,
            changed: false,
            scrollTop: document.scrollTop,
            slider: "a",
            // sliderValues: null,
            sliderValues: [{
                    // label: "Not at all",
                    value: '50'
                },
                {
                    // label: "A tiny bit",
                    value: '100'
                },
                {
                    // label: "Its ok",
                    value: '200'
                },
                {
                    // label: "Its very good",
                    value: '300'
                },
                {
                    // label: "Its AMAZING!",
                    value: '400'
                }
            ],
        }
    },
    destroyed() {
        this.paper = null;
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
        var body = document.body,
            html = document.documentElement;
        this.windowHeight = document.documentElement.scrollHeight;
        this.pointsIn = this.points;

        this.init();

        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
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
            this.delta = 10;
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
        init() {
            var vm = this;
            this.paper = null;
            console.log('init', vm.pointsIn)
            if (!vm.pointsIn && vm.pointsIn != 0) {
                vm.path = null;
                vm.points = vm.pointsIn;
            }
            vm.paper = new paper.PaperScope();
            // this.paper.view.onFrame = () => null;

            vm.paper.setup(this.$refs['c3']);
            vm.width = this.paper.view.size.width;
            vm.height = this.paper.view.size.height;
            vm.center = this.paper.view.center;
            vm.mousePos = this.paper.view.center;
            vm.pathHeight = this.mousePos.y;
            vm.path = null;
            vm.paper.activate();

            vm.path = new paper.Path({
                strokeColor: '#E2F8D1',
                fillColor: '#E2F8D1',
                strokeWidth: '10',
                closed: false
            });
            vm.path.segments = [];
            vm.path.add(0, vm.height);
            vm.path.add(0, vm.height / 2);

            for (var i = 1; i < vm.points; i++) {
                var point = new paper.Point(vm.width / vm.points * i, vm.height / 2);
                vm.path.add(point);
            }
            vm.path.add(vm.width, vm.height / 2)
            vm.path.add(vm.width, vm.height)
            vm.paper.view.onFrame = (e) => vm.onFrame(e);
        },
        onFrame(event) {
            var vm = this;
            // vm.pct = ((window.scrollY / vm.windowHeight) * 100);

            vm.pathHeight += (vm.center.y - (vm.pct) - (vm.pathHeight / 2)) / 160;
            for (var i = 2; i < (vm.points + 1); i++) {
                var sinSeed = event.count + (i + i % 10) * (vm.pct * 3);
                var sinHeight = Math.cos(sinSeed / (vm.sinSeedModifier - vm.pct * 2)) * (vm.pathHeight / 2);
                var yPos = Math.cos(sinSeed / 300) * sinHeight + (vm.height / 2);
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
<style>
:root {
    --canvasheight: 500px;
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
    background-color: #E2F8D1;
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

.progress {
    z-index: 300;
    @apply fixed bottom-0 w-full left-0 border border-black h-2;
}

.bar {
    transition: width .1s ease-in-out;
    @apply bg-yellow-500 h-2;
}
</style>
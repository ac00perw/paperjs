<template>
    <div>
        
        <canvas :id="canvasID" class="canvas-style" @mousemove="mouseMove" />
        <button class="bg-gray-400 text-white p-2 rounded-md my-2" @click="showTest = (showTest == true? false: true)"><span v-if="showTest">Hide</span><span v-else>Show</span> Stats</button>
        <ul v-if="path && showTest">
            <li><span class="font-bold">Mouse Pos</span>: {{ mouse }}</li>
            <li>SEGMENTS</li>
            <li v-for="s,index in path.segments" :key="`p${index}`">
                {{ s }}
            </li>
            <li>SPRINGS</li>
            <li v-for="s,index in springs" :key="index">
                {{ s }}
            </li>
        </ul>
    </div>
</template>
<script>
const paper = require('paper');

export default {
    name: "Canvas",
    props: ['canvasID'],
    data() {
        return {
            showTest: false,
            path: null,
            testpath: null,
            paper: null,
            size: null,
            springs: null,
            friction: 1.5,
            timeStep: 0.4,
            amount: 60,
            mass: 2,
            count: 0,
            invMass: 1,
            mouse: null
        }
    },
    destroyed() {
        this.paper = null;
    },
    mounted() {
        this.paper = new paper.PaperScope();
        this.paper.setup(this.canvasID);
        
        this.invMass = 1 / this.mass;
        this.init();

        // Draw the view now:
        // paper.view.draw();

    },
    methods: {
        init() {
            var vm = this;
            if (this.path)
                this.path.remove();
            this.springs = [];
            this.size = this.paper.view.size;
            this.createPath(.2);

            this.paper.view.onFrame = (e) => this.updateWave(e);

        },
        spring(a, b, strength, restLength, invMass) {
            // this.a = a;
            // this.b = b;
            this.restLength = restLength || 80;
            this.strength = strength ? strength : 0.55;
            this.mamb = invMass * invMass;
            return { a: a, b: b, restLength: this.restLength, mamb: this.mamb };
        },
        createPath(strength) {
            var vm = this;
            vm.path = new paper.Path({
                // fillColor: 'black',
                strokeColor: new paper.Color(1, .4, 0),
                strokeWidth: '10',
                closed: false
            });


            for (var i = 0; i <= vm.amount; i++) {
                var segment = vm.path.add(new paper.Point((i / vm.amount) * vm.size.width, vm.size.height/2));
                var point = segment.point;
                if (i == 0 || i == vm.amount)
                    point.y = vm.size.height/2;
                point.px = point.x;
                point.py = point.y;
                // The first two and last two points are fixed:
                point.fixed = i < 2 || i > vm.amount - 2;
                if (i > 0) {
                    let spring = vm.spring(segment.previous.point, point, strength, null, vm.invMass);
                    vm.springs.push(spring);
                }
            }
            vm.paper.activate();
            // vm.path.position.x =0;// -= vm.size.width / 4;
        },
        updateWave(event) {
            var vm = this;
            var force = 1 - vm.friction * vm.timeStep * vm.timeStep;

            for (let i = 0, l = vm.path.segments.length; i < l; i++) {
                var point = vm.path.segments[i].point;
                // console.log('point', point.y, point.py);
                var dy = (point.y - point.py) * (force + (event.count % 2/10));
                point.py = point.y;
                point.y = Math.max(point.y + dy, 0);
                if (point.y >  vm.size.height)  point.y = vm.size.height - 10;
            }

            for (let j = 0, l = vm.springs.length; j < l; j++) {
                // vm.springs[j] = vm.update(vm.springs[j], vm.invMass);
            }
            
            vm.path.smooth({ type: 'continuous' });
            vm.$forceUpdate();
        },
        update(spring, invMass) {
            
            var delta = new paper.Point(spring.b.x - spring.a.x, spring.b.y - spring.a.y);

            var dist = delta.length;
            var normDistStrength = (dist - spring.restLength) /
                (dist * spring.mamb) * spring.strength;
                
            delta.y *= normDistStrength * invMass * 0.2;
            if (!spring.a.fixed)
                spring.a.y += delta.y + 10;
            if (!spring.b.fixed)
                spring.b.y -= delta.y;
            return spring;
        },
        mouseMove() {
            let vm = this;
            let rect = this.paper.view.bounds;
            this.tool = new paper.Tool();
            this.tool.onMouseMove = (event) => {
                // init path
                // add point to path
                // vm.path.add(event.point);
                vm.mouse = {x: event.point.x, y: event.point.y};
                var location = vm.path.getNearestLocation(event.point);
                // if (!location) return false;
                var segment = location.segment;
                
                var point = segment.point;

                if (!point.fixed && location.distance < vm.size.height / 4) {

                    var y = event.point.y;
                    point.y += (y - point.y) / 6;
                    if (segment.previous && !segment.previous.fixed) {
                        var previous = segment.previous.point;
                        previous.y += (y - previous.y) / 24;
                    }
                    if (segment.next && !segment.next.fixed) {
                        var next = segment.next.point;
                        next.y += (y - next.y) / 24;
                    }
                }
            }
        }
    }
}
</script>
<style scoped>
.canvas-style {
    width: 100% !important;
    height: 500px !important;
    border: 1px solid black;
    border-radius: 10px;
    display: block;
    margin: auto;
}
</style>
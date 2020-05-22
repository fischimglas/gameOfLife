<template>
    <div class="matrix" v-bind:class="{'fullscreen':fullscreen}">
        <canvas :id="id" :style="style" :width="width" :height="height"></canvas>
        <template v-if="showControls">
            <ul class="uk-list">
                <li v-if="matrix">
                    <label>Cells Alive {{matrix.alive()}}</label>
                    <label>Cells Dead {{matrix.dead()}}</label>
                    <label>Activity {{GOL.activity()}}</label>
                </li>
                <li>
                    <label>Speed {{speed}}</label>
                    <input type="range" v-model="speed" min="1" max="100"/>
                </li>
                <li>
                    <label>Width <span>{{width}}</span></label>
                    <input type="range" v-model="width" min="30" max="500"/>
                </li>
                <li>
                    <label>Height <span>{{height}}</span></label>
                    <input type="range" v-model="height" min="30" max="500"/>
                </li>
            </ul>
            <vk-button @click="initView">initView</vk-button>
            <vk-button @click="start">Start</vk-button>
            <vk-button @click="stop">Stop</vk-button>
        </template>
    </div>
</template>

<script>
    import _ from 'lodash';
    import Uikit from 'uikit';

    import gameOfLife from '../gameOfLife/gameoflife';

    export default {
        name: 'matrix',
        props: {
            fullscreen: {type: Boolean, required: false, default: false},
            showControls: {type: Boolean, required: false, default: false},
            autostart: {type: Boolean, required: false, default: false},
            visual: {type: Boolean, required: false, default: true},
        },
        components: {},
        computed: {
            style() {
                return {
                    width: this.width + 'px',
                    height: this.height + 'px',
                }
            }
        },
        watch: {
            'speed'() {
                this.GOL.setSpeed(this.speed);
            }
        },
        data() {
            return {
                id: null,
                cellsize: 10,
                width: 300,
                height: 300,
                speed: 10,
                GOL: null,
            }
        },
        methods: {
            start() {
                this.GOL.start();
            },
            stop() {
                this.GOL.stop();
            },
            initView() {
                let cf = {
                    elementId: this.id,
                    visual: this.visual,
                    autostart: this.autostart,
                    width: this.width,
                    height: this.height,
                    cellsize: this.cellsize,
                };

                this.GOL = gameOfLife.init(cf);
                this.GOL.awakeRandomCells();
                this.GOL.onTick(tick => {
                    console.log('TICK', tick);
                });
                this.GOL.start();

                window.GOL = this.GOL;
            }
        },
        mounted() {
            this.id = _.uniqueId('can');

            if (this.fullscreen) {
                this.width = window.innerWidth;
                this.height = window.innerHeight;
            }
            this.initView();
        },
    }
</script>
<style lang="scss">
    .matrix {
        canvas {
        }

        &.fullscreen,
        &.fullscreen canvas {
            width: 100vw;
            height: 100vh;
        }
    }
</style>
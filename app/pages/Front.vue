<template>
    <div>
        <div>
            <canvas id="jam1" :style="style"></canvas>
        </div>
        <div>
            <div>
                <vk-button @click="createMatrix">Create Matrix</vk-button>
                <vk-button @click="clearMatrix">Clear Matrix</vk-button>

                <vk-button @click="changeSomeStates">Change Some States</vk-button>
                <vk-button @click="updateG">Update G</vk-button>
            </div>
            <ul class="uk-list">
                <li>
                    <label>Size {{size}}</label>
                    <input type="range" v-model="size" min="1" max="100"/>
                </li>
                <li>
                    <label>Width <span>{{width}}</span></label>
                    <input type="range" v-model="width" min="10" max="1000"/>
                </li>
                <li>
                    <label>Height <span>{{height}}</span></label>
                    <input type="range" v-model="height" min="10" max="1000"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import Uikit from 'uikit';
    import UTILS from "../service/utils";
    import CSample from "../components/sample";

    import canvas from '../service/canvas';
    import M from '../service/matrix';
    import G from '../service/gameoflife';

    export default {
        name: 'front',
        components: {CSample},
        computed: {
            style() {
                return {
                    width: this.width + 'px',
                    height: this.height + 'px',
                }
            }
        },
        data() {
            return {
                size: 30,
                width: 600,
                height: 500,
            }
        },
        methods: {
            createMatrix() {
                M.init(this.size);
                // this.$store.commit('setMatrix', tmp)
            },
            clearMatrix() {
                M.clear();
                // this.$store.commit('clearMatrix')
            },
            updateG() {
                let update = G.update(M.get());
                console.log('UPDATE', update);

                M.update(update);
            },
            changeSomeStates() {
                let update = _.map(M.get(), (p, ix) => {
                    return Boolean(_.random(0, 1))
                });
                M.update(update);
            },
        },
        mounted() {
            let cf = {
                element: 'jam1',
                width: this.width,
                height: this.height,
            };
            canvas.init(cf);
            this.createMatrix();
        },
    }

</script>
<style lang="scss">


    #jam1 {
        border: solid 1px red;
        margin: 20px;
        width: 300px;
        height: 300px;
    }
</style>
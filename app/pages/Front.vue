<template>
    <div>
        <div>
            <canvas id="jam1" :style="style"></canvas>
        </div>
        <div>
            <ul class="uk-list">
                <li>
                    <label>Width</label>
                    <input type="range" v-model="width" min="10" max="1000"/>
                </li>
                <li>
                    <label>Height</label>
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
                width: 300,
                height: 300,
            }
        },
        methods: {},
        mounted() {

            canvas.init('jam1');

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
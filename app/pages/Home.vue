<template>
    <div class="uk-flex uk-flex-row">
        <matrix :show-controls="true" :visual="true"></matrix>
    </div>
</template>

<script>
    import _ from 'lodash';
    import Uikit from 'uikit';
    import UTILS from "../service/utils";
    import MATRIX from "../../gameOfLife/matrix";
    import Matrix from "../components/matrix";

    export default {
        name: 'home',
        components: {Matrix},
        mounted() {
            let ma = MATRIX.init(5, 5);

            console.log(ma);
        }
    }

</script>
<style lang="scss">


</style>
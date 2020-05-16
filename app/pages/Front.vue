<template>
    <div class="uk-flex uk-flex-row">
        <matrix></matrix>
    </div>
</template>

<script>
    import _ from 'lodash';
    import Uikit from 'uikit';
    import UTILS from "../service/utils";
    import Matrix from "../components/matrix";

    export default {
        name: 'front',
        components: {Matrix}
    }

</script>
<style lang="scss">


</style>
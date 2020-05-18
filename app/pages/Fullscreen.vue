<template>
    <div>
        <div class="bg-screen">
            <matrix :fullscreen="true" :autostart="true"></matrix>
        </div>
        <div>
            Content
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import UTILS from "../service/utils";
    import Matrix from "../components/matrix";

    export default {
        name: 'front',
        components: {Matrix}
    }

</script>
<style lang="scss">
    .bg-screen {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

</style>
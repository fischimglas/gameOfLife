<template>
    <div>
        <h1>User Detail</h1>

        {{user}}
    </div>
</template>

<script>
    import _ from 'lodash';
    import Uikit from 'uikit';
    import UTILS from "../../service/utils";

    export default {
        name: 'user',
        components: {},
        computed: {
            user() {
                return this.$store.state.users.find(it => it.id === this.$route.params.id);
            }
        },
        methods: {}
    }

</script>
<style lang="scss">

</style>
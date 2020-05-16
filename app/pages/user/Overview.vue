<template>
    <div>
        <h1>User Overview</h1>


        <ul class="uk-list-divider uk-list">
            <li @click="userDetail(user.id)" v-for="user in $store.state.users">
                {{user.id}} - {{user.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    import _ from 'lodash';
    import Uikit from 'uikit';
    import UTILS from "../../service/utils";

    export default {
        name: 'user',
        components: {},
        computed: {},
        methods: {
            userDetail(id) {
                this.$router.push({name: 'user-detail', params:{id:id}})
            }
        }
    }

</script>
<style lang="scss">

</style>
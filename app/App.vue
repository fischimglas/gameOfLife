<template>
    <div id="app">
        <nav class="uk-navbar-container" uk-navbar>
            <!-- NAVIGATION -->
            <div class="uk-navbar-left">
                <ul class="uk-navbar-nav">
                    <li class="uk-active">
                        <router-link :to="{name:'home'}" href="#">Home</router-link>
                    </li>
                    <li class="uk-active">
                        <router-link :to="{name:'fullscreen'}" href="#">FullScreen</router-link>
                    </li>
                </ul>
            </div>
            <!-- USER -->
            <div class="uk-navbar-right">

            </div>
        </nav>

        <!-- ROUTES -->
        <router-view></router-view>
    </div>
</template>
<script>

    export default {
        name: 'app',
        components: {},
        mounted() {
            // Adds some test data to store.
        }
    }

</script>
<style lang="scss">
    @import 'node_modules/uikit/src/scss/variables.scss';
    @import 'node_modules/uikit/src/scss/uikit.scss';
    @import 'node_modules/uikit/src/scss/variables-theme.scss';
    @import 'node_modules/uikit/src/scss/uikit-theme.scss';
</style>

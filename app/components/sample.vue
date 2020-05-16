<template>
    <div class="c-sample">
        Sample Component {{someParam}}
    </div>
</template>

<script>

    export default {
        name: 'c-sample',
        props: {someParam: {type: String, required: false, default: 'empty'}},
        components: {},
        computed: {},
        methods: {}
    }

</script>
<style lang="scss">
    .c-sample {
        width: 200px;
        height: 200px;
        background: red;
    }
</style>
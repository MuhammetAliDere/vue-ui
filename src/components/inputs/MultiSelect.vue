<template>
    <VueSelect multiple v-model="selected" :options="options" name="select2"/>
</template>

<script>
    import VueSelect from 'vue-select'
    export default {
        name: "multi-select",
        data(){
            return{
                selected: ['foo','bar'],
                options: ['foo','bar','baz']
            }
        },
        components: { VueSelect }
    }
</script>

<style scoped>

</style>
<!--todo: theme option u çalışmalı-->
<template>
    <div>
        <h2>Toaster</h2>
        <Button type="primary border" :clicked="addToaster">Add Toaster</Button>
    </div>
</template>

<script>
import Button from '../components/buttons/Button.vue'

export default {
    name: "toaster-story",
    components:{
        Button
    },
    methods:{
        addToaster: function () {
            console.log("toaster will be added.")
            console.log(this.$toaster.add('Your toaster theme message.', {theme: 'danger'}))
        }
    }
}
</script>

<style scoped>

</style>
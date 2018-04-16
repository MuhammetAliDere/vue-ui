<template>
    <button @click="showAlert">Alert Button</button>
</template>

<script>
    export default {
        name: "alert",
        components: {

        },
        methods:{
            showAlert: function () {
                console.log('this is a test alert.');
                this.$swal('this is a test alert.')

            }
        }
    }
</script>

<style scoped>

</style>
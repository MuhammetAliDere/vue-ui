<template>
    <div>
        <h2>Alert</h2>
        <Button type="danger border" :clicked="showAlert">Alert Button</Button>
    </div>
</template>

<script>
import Button from '../components/buttons/Button.vue'

export default {
    name: "alert-story",
    components: {
        Button
    },
    methods:{
        showAlert: function () {
            this.$swal('this is a test alert.')
        }
    }
}
</script>
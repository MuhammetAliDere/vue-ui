<template>
    <input type="hidden" name="_token" :value="csrfToken">
</template>

<script>
    export default {
        name: "csrf-token-input",
        data(){
            return{
                csrfToken: document.getElementsByName('csrf-token')[0].content
            }
        }
    }
</script>

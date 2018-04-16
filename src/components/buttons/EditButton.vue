<template>
    <a href="#" class="btn filled btn-info x-small">
        <slot class="slot"></slot>
        <icon name="pencil" scale="0.8"></icon>
    </a>
</template>

<script>
    import 'vue-awesome/icons/pencil'
    import Icon from 'vue-awesome/components/Icon.vue'

    export default {
        name: "edit-button",
        components: {
            Icon
        }
    }
</script>

<style lang="scss" scoped>
    .btn{
        svg{
            vertical-align: middle;
            margin-left: 3px;
        }
        &.large{
             font-size:24px;
         }
        &.medium{
             font-size:20px;
         }
        &.small{
             font-size:15px;
         }
        &.x-small{
             font-size:12px;
             padding: 7px 5px;
         }
    }
</style>
<template>
    <a href="#" class="btn filled btn-danger x-small">
        <slot></slot>
        <icon name="trash-o" scale="0.8"></icon>
    </a>
</template>

<script>
import 'vue-awesome/icons/trash-o'
import Icon from 'vue-awesome/components/Icon.vue'
export default {
    name: "delete-button",
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
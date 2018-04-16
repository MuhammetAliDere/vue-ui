<template>
    <div class="selectbox">
        <label class="select-box">
            <Icon class="i" name="angle-down" scale="1.5"></Icon>
            <select>
                <slot></slot>
            </select>
        </label>
    </div>
</template>

<script>
    import 'vue-awesome/icons/angle-down'
    import Icon from 'vue-awesome/components/Icon.vue'

    export default {
        name: "selectbox",
        props:{
            name:{
                type: String,
                required: true
            }
        },
        components:{
            Icon
        }
    }
</script>

<style lang="scss" scoped>
    .select-box {
        width: initial;
        border: 0;
        padding: 0;
        text-align: left;
        height: 40px;
        display: inline-block!important;
        font-weight: 400;
        background: #fff;
        position: relative;
        margin: 0;
        .i{
            position: absolute;
            right: 15px;
            top: 8px;
            z-index: 0;
            font-size:25px;
            color: #252525;
        }
        &.inline{
            width:inherit!important;
            margin-right: 10px;
            select{
                padding-right: 30px;
            }
        }
        select {
            background-color: transparent;
            border-radius: 0px;
            display: block;
            height: 41px;
            max-width: 100%;
            cursor: pointer;
            margin-bottom: 15px;
            padding-left: 10px;
            outline: none;
            letter-spacing: 1px;
            border: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            line-height: 41px;
            color: #222;
            border: 1px solid #376298;
            font-size: 16px;
            position: relative;
            z-index: 1;
            padding-right: 30px;
            white-space: nowrap;
        }

    }
</style>
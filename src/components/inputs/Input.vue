<template>
    <div class="form-group">
        <input
            :name="name"
            :class="addClass"
            :value="value"
            type="text"
            class="default"
        >
    </div>
</template>

<script>
    export default {
        name: "inputComp",
        props: {
            addClass: String,
            name: {
                type: String,
                required: true
            },
            value: String
        }
    }
</script>

<style lang="scss" scoped>
    input{
        width: 100%;
        display: block;
        font-size: 16px;
        border: 0;
        outline: none;
        margin-top: 5px;
        border: 0;
        padding: 5px 10px;
        height: 37px;
        &.default{
            color: #376298;
            background: #fdfdfd;
        }
        &.dark{
            color: #fdfdfd;
            background: #376298;
        }
        &.success{
            color: #fdfdfd;
            background: #4fba6f;
        }
        &.error{
            color: #fff;
            background: #b30303;
            &:after{
                content:'/ed1d25d';
                position: absolute;
                right:0;
                top: 10px;
                color: #fdfdfd;
                font-size:20px;
                display: block;
            }
        }
        &.border{
            background: #fdfdfd;
            border:1px solid;
            &.success{
                color: #4fba6f;
                border-color:#4fba6f;
            }
            &.danger{
                color: #ed1d25;
                border-color: #ed1d25;
            }
            &.info{
                color: #68B3C8;
                border-color: #68B3C8;
            }
            &.warning{
                color: #F3BB45;
                border-color: #F3BB45;
            }
            &.default{
                color: #222;
                border-color: #376298;
            }
        }
        &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
            color:  #376298;
            font-size:15px;
        }
        &::-moz-placeholder { /* Firefox 19+ */
            color:  #376298;
            font-size:15px;
        }
        &:-ms-input-placeholder { /* IE 10+ */
            color: #376298;
            font-size:15px;
        }
        &:-moz-placeholder { /* Firefox 18- */
            color: #376298;
            font-size:15px;
        }
    }
</style>

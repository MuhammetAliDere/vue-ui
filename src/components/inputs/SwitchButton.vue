<template>
    <div class="switch-container">
        <input
            class="switch switch-light"
            :id="generatedId"
            :value="value"
            :name="name"
            :checked="checked"
            type="checkbox"
        />
        <label class="switch-btn" :for="generatedId"></label>
    </div>
</template>

<script>
    export default {
        name: "switch-button",
        props:{
            value:{
                type: String,
                required: true
            },
            name:{
                type: String,
                required: true
            },
            checked: Boolean
        },
        data(){
            return {
                generatedId: 'checkbox_' + _.ceil(Math.random() * 10000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .switch-container{
        display: inline-block;
    }
    .switch {
        display: none;

        // add default box-sizing for this scope
        &,
        &:after,
        &:before,
        & *,
        & *:after,
        & *:before,
        & + .tgl-btn {
            box-sizing: border-box;
            &::selection {
                background: none;
            }
        }

        + .switch-btn {
            outline: 0;
            display: block;
            width: 3em;
            height: 1.6em;
            position: relative;
            cursor: pointer;
            user-select: none;
            &:after,
            &:before {
                position: relative;
                display: block;
                content: "";
                width: 50%;
                height: 100%;
            }

            &:after {
                left: 0;
            }

            &:before {
                display: none;
            }
        }

        &:checked + .switch-btn:after {
            left: 50%;
        }
    }

    .switch-light {
        + .switch-btn {
            background: #f0f0f0;
            border-radius: 2em;
            padding: 2px;
            transition: all .4s ease;
            &:after {
                border-radius: 50%;
                background: #fff;
                transition: all .2s ease;
            }
        }

        &:checked + .switch-btn {
            background: #00980c;
        }
    }
</style>
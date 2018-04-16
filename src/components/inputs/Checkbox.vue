<template>
    <div class="checkbox-content">
        <input
                class="checkbox"
                :id="generatedId"
                type="checkbox"
                :value="value"
                :checked="checked"
                :disabled="disabled"
                :name="name"
        >
        <label :for="generatedId">{{label}}</label>
    </div>
</template>

<script>
export default {
    name: "checkbox",
    props:{
        value:{
            type: [String, Number],
            required: true
        },
        name:{
            type: String,
            required: true
        },
        label: String,
        checked: Boolean,
        disabled: Boolean
    },
    data(){
        return {
            generatedId: 'checkbox_' + _.ceil(Math.random() * 10000)
        }
    }
}
</script>

<style lang="scss" scoped>
    .checkbox-content{
        position: relative;
    }
    .checkbox {
        position: absolute; // take it out of document flow
        opacity: 0; // hide it

        & + label {
            position: relative;
            cursor: pointer;
            padding: 0;
            color:#666;
        }

        // Box.
        & + label:before {
            content: '';
            margin:-1px 7px 0 0;
            display: inline-block;
            vertical-align: text-top;
            width: 20px;
            height: 20px;
            background: #ccc;

        }

        // Box hover

        &:hover + label:after {
            content: '';
            position: absolute;
            left: 5px;
            top: 9px;
            background: white;
            width: 2px;
            height: 2px;
            box-shadow:
                    2px 0 0 white,
                    4px 0 0 white,
                    4px -2px 0 white,
                    4px -4px 0 white,
                    4px -6px 0 white,
                    4px -8px 0 white;
            transform: rotate(45deg);
        }
        // Box checked
        &:checked + label:before {
            background: #00980c;
        }

        // Disabled state label.
        &:disabled + label {
            color: #b8b8b8;
            cursor: auto;
        }

        // Disabled box.
        &:disabled + label:before {
            box-shadow: none;
            background: #ddd;
        }

        // Checkmark. Could be replaced with an image
        &:checked + label:after {
            content: '';
            position: absolute;
            left: 5px;
            top: 9px;
            background: white;
            width: 2px;
            height: 2px;
            box-shadow:
                    2px 0 0 white,
                    4px 0 0 white,
                    4px -2px 0 white,
                    4px -4px 0 white,
                    4px -6px 0 white,
                    4px -8px 0 white;
            transform: rotate(45deg);
        }
    }
</style>

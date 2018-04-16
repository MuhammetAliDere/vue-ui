<template>
    <div class="form-group">
        <textarea
            class="textarea"
            :class="addClass"
            :name="name"
        ></textarea>
    </div>
</template>

<script>
export default {
    name: "text-area",
    props:{
        addClass:{
            type: String,
            default: 'default'
        },
        name:{
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.textarea{
    display: inline-block;
    padding:5px;
    resize: none;
    min-height: 100px;
    width:100%;
    &.default{
        color: #376298;
        background: #fdfdfd;
        border:1px solid #376298;
    }
    &.dark{
        color: #fdfdfd;
        background: #376298;
    }
}
</style>
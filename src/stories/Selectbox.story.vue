<template>
    <div class="page">
        <div class="container">
            <h1>SELECTBOX</h1>
            <div class="col-md-4">
                <Select name="select-name-1">
                    <option>Select 1</option>
                    <option>Select 2</option>
                    <option>Select 3</option>
                </Select>
            </div>
            <div class="col-md-4">
                <Select name="select-name-2">
                    <option>Select 1</option>
                    <option>Select 2</option>
                    <option>Select 3</option>
                </Select>
            </div>
            <div>
                <Select name="select-name-3">
                    <option>1</option>
                    <option>2</option>
                    <option selected>3</option>
                </Select>
            </div>
        </div>
    </div>
</template>

<script>
import Select from '../components/inputs/Select.vue'
export default {
    name: "selectbox-story",
    components:{
        Select
    }
}
</script>

<style lang="scss" scoped>
.page{
    background-color: #f5f5f5;
    padding-bottom: 25px;
}
</style>
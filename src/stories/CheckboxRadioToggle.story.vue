<template>
    <div class="page">
        <div class="container">
            <h1 class="title">Checkbox & Radio Button & Slide Toggle</h1>
            <div class="row">
                <div class="col-md-4">
                    <Checkbox name="sameName" value="someValue" label="Unselect"/>
                    <Checkbox name="sameName-2" value="someValue-2" label="Select" checked/>
                    <Checkbox name="sameName-3" value="someValue-3" label="Disabled" disabled/>
                </div>
                <div class="col-md-4">
                    <RadioButton name="radio-group" value="radioValue-1" label="Radio Button 1" />
                    <RadioButton name="radio-group" value="radioValue-2" label="Radio Button 2" checked />
                    <RadioButton name="radio-group" value="radioValue-3" label="Radio Button 3" />
                </div>
                <div class="col-md-4">
                    <SwitchButton name="switchButton" value="switchName"/>
                    <SwitchButton name="switchButton" value="switchName" checked/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
  Checkbox,
  RadioButton,
  SwitchButton
} from '../ui'

export default {
    name: "checkbox-radio-toggle-story",
    components: {
        Checkbox,
        RadioButton,
        SwitchButton
    }
}
</script>

<style lang="scss" scoped>
    .page{
        background-color: #f5f5f5;
        padding-bottom: 25px;
    }
</style>

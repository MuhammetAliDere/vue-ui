<template>
  <div id="app">
    <h1>EANALİZ UI</h1>

    <Button-story/>
    <Space/>

    <Alert-story/>
    <Space/>

    <CheckboxRadioToggle-story/>
    <Space/>

    <DataTable-story/>
    <Space/>

    <date-picker-story/>
    <Space/>

    <input-story/>
    <Space/>

    <Label-story/>
    <Space/>

    <multi-select-story/>
    <Space/>

    <select2-story/>
    <Space/>

    <text-area-story/>
    <Space/>

    <tooltip-story/>
    <Space/>

    <toaster-story/>
    <Space/>

    <popover-story/>
    <Space/>

    <number-input-story/>
    <Space/>

    <string-input-story/>
    <Space/>

    <amount-input-story/>
    <Space/>
  </div>
</template>

<script>
import ButtonStory from './stories/Buttons.story.vue'
import Space from './components/Space.vue'
import AlertStory from './stories/Alert.story.vue'
import CheckboxRadioToggleStory from './stories/CheckboxRadioToggle.story.vue'
import DataTableStory from './stories/DataTable.story.vue'
import DatePickerStory from './stories/DatePicker.story.vue'
import InputStory from './stories/Input.story.vue'
import LabelStory from './stories/Label.story.vue'
import MultiSelectStory from './stories/MultiSelect.story.vue'
import Select2Story from './stories/Select2.story.vue'
import TextAreaStory from './stories/TextArea.story.vue'
import TooltipStory from './stories/Tooltip.story.vue'
import ToasterStory from './stories/Toaster.story.vue'
import PopoverStory from './stories/Popover.story.vue'
import NumberInputStory from './stories/NumberInput.story.vue'
import StringInputStory from './stories/StringInput.story.vue'
import AmountInputStory from './stories/AmountInput.story.vue'

// depencies
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: 'App',
  components: {
    LabelStory,
    ButtonStory,
    Space,
    AlertStory,
    CheckboxRadioToggleStory,
    DataTableStory,
    DatePickerStory,
    InputStory,
    MultiSelectStory,
    Select2Story,
    TextAreaStory,
    TooltipStory,
    ToasterStory,
    PopoverStory,
    NumberInputStory,
    StringInputStory,
    AmountInputStory
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700|Roboto:300,400,400i,500,500i,700,700i,900&subset=latin-ext');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 20px;
}
</style>

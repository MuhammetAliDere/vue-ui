<template>
  <div class="select2 border">
    <VueSelect
      v-model="selected"
      :options="options"
      name="select2"
      class="vue-select border"
      :multiple="multiple"
      :placeholder="placeholder"
      :label="label"
      :filter="(a, b, c) => filter(a, b, c)"
    >
      <span slot="no-options">Sonuç bulunamadı</span>
    </VueSelect>
    <input
      v-if="!multiple"
      type="hidden"
      :value="singleValue"
      :name="name">
    <input
      v-if="multiple"
      v-for="select in selected"
      type="hidden"
      :value="select[value]"
      :name="`${name}[]`">
  </div>
</template>

<script>
import VueSelect from 'vue-select'

export default {
    name: "select2",
    props: {
      selectedValue: String,
      selectedValues: Array,
      options: {
          type: Array,
          required: true
      },
      optionMap: Object,
      name: {
        type: String
      },
      multiple: Boolean,
      placeholder: String
    },
    created(){
      if(this.multiple && this.selectedValues)
        this.setSelectedValues()
      else if(!this.multiple && this.selectedValue)
        this.setSelectedValue()
    },
    data(){
      return{
        selected: null,
        value: _.has(this.optionMap, 'value') ? this.optionMap.value : 'value',
        label: _.has(this.optionMap, 'label') ? this.optionMap.label : 'label'
      }
    },
    computed:{
      singleValue: function () {
        let result = _.has(this.selected, this.value) ? this.selected[this.value] : ''
        result = _.toInteger(result)
        return result
      }
    },
    methods: {
        clearSelected() {
            this.selected = null;
        },
        setSelectedValue(){
          const selectedValue = this.selectedValue;
          const propsValue = this.value;
          const selectedValueIndex = _.findIndex(this.options, function(o) { return o[propsValue] == selectedValue });
          const selectedItem = this.options[selectedValueIndex];
          this.selected = selectedItem;
        },
        setSelectedValues(){
            this.selected = _.reduce(this.selectedValues, (r, val) => {
                r.push(this.filteredOptions[val])
                return r
            }, [])
        }
        // ,
        // getOptionLabel(option) {
        //   if (typeof option === 'object') {
        //     if (!option.hasOwnProperty(this.label)) {
        //       return console.warn(
        //         `[vue-select warn]: Label key "option.${this.label}" does not` +
        //         ` exist in options object ${JSON.stringify(option)}.\n` +
        //         'http://sagalbot.github.io/vue-select/#ex-labels'
        //       )
        //     }
        //     if (this.label && option[this.label]) {
        //       return option[this.label]
        //     }
        //   }
        //   return option;
        // },
        // filterBy(label, search) {
        //   return (label || '').turkishToLower().indexOf(search.turkishToLower()) > -1
        // },
        // filter: function (options, search) {
        //   return options.filter((option) => {
        //     let label = this.getOptionLabel(option)
        //     if (typeof label === 'number') {
        //       label = label.toString()
        //     }
        //     return this.filterBy(label, search)
        //   });
        // }
    },
    components: { VueSelect }
}
</script>

<style lang="scss">
  .select2{
    margin-top: 14px;
    background: #fff;

    .dropdown-toggle{
      display: flex !important;
      .selected-tag{
        display: block;
        position: relative;
        overflow: hidden;
        padding-right: 15px
      }
      input[type=search]{
        flex: 1;
        width: 100% !important;
        display: block
      }
    }
    .dropdown-menu{
      min-width: 400px !important;
    }
    .v-select .selected-tag .close{
      position: absolute;
      right: 2px;
      top: 3px;
    }
    .v-select.searchable .dropdown-toggle{
      padding-right: 12px;
    }
  }
  .v-select input[type=search], .v-select input[type=search]:focus {
    height: 33px;
    box-shadow: none !important
  }

  /*.v-select .open-indicator{*/
    /*top: 15px*/
  /*}*/

  .select2.border{
    color: #222;
    border: 1px solid #376298;
  }
</style>

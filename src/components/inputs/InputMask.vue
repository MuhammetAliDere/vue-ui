<template>
    <div @click="onFocus">
      <masked-input
        :id="compId"
        :class="addClass"
        v-model="model"
        :mask="type == 'date' ? dateMask : mask"
        :placeholder="placeholder"/>
      <input type="hidden" :name="name" :value="formatedValue"/>
    </div>
</template>

<script>
import MaskedInput from 'vue-masked-input'
import moment from 'moment'

export default {
  name: "input-mask",
  props:{
    type: String,
    name:{
      type: String,
      required: false,
    },
    value: {
      required:false
    },
    addClass:{
      type: String,
      default: ''
    },
    mask: {
      type: String,
      default: '(111) 111-11-11'
    },
    trim: Boolean,
    placeholder: String,
    valueReverse: {
      default: false
    },
    modelOnChange:{
      required: false
    },
    validationCallback:{
      required: false
    }
  },
  data(){
    return{
      model: null,
      checkedValue: this.valueReverse ? this.revertedValue() : _.toString(this.value),
      dateMask: {
        pattern: 'Dd-Mm-Yyyy',
        formatCharacters: {
          'D': {
            validate: char => /[0-3]/.test(char)
          },
          'd': {
            validate: char => /[0-9]/.test(char),
            transform: char => {
              const D = _.toInteger(this.model.charAt(0))
              const ch = _.toInteger(char)
              if(D < 3) return char
              if(ch > 1) return 1
              return char
            },
          },
          'M': {
            validate: char => /[0-1]/.test(char)
          },
          'm': {
            validate: char => /[0-9]/.test(char),
            transform: char => {
              const M = _.toInteger(this.model.charAt(3))
              const ch = _.toInteger(char)
              if(M === 0) return char
              if(ch > 2) return 2
              return char
            },
          },
          'Y': {
            validate: char => /[1-2]/.test(char),
            transform: char => char.toUpperCase(),
          },
          'y': {
            validate: char => /[0-9]/.test(char),
            transform: char => char.toUpperCase(),
          }
        }
      },
      compId: `input-mask-${_.random(1000, 9999)}`
    }
  },
  created(){
    if(this.value){
      this.model = this.checkedValue
    }
    if(this.type == 'date'){
      this.$watch('model', function(newModel, oldModel){
        const isFill = newModel ? newModel.indexOf('_') === -1 : false
        if(isFill){
          const date = moment(newModel, 'DD-MM-YYYY', true)
          if(this.validationCallback){
            this.validationCallback(date.isValid())
          }
        }
      })
    }
  },
  methods:{
    revertedValue: function () {
      const valueArray = _.split(this.value, '-')
      if(valueArray.length <= 1) return _.toString(this.value)
      if(valueArray.length == 3){
        return `${valueArray[2]}-${valueArray[1]}-${valueArray[0]}`
      }
      console.log("InputMask revertedValue Bug!")
      return false
    },
    onFocus: function () {
      const input = document.getElementById(this.compId)
      const selectionStart = input.selectionStart
      const index = this.model.indexOf('_')
      if(selectionStart > index && index !== -1){
        input.setSelectionRange(index, index)
      }
    }
  },
  computed: {
    formatedValue() {
      let result = null

      if(!this.trim) {
        result = this.model
      }else{
        const model = _.toString(this.model)
        result = _.trim(model, ' ')
        result = model.replace(/[^0-9]+/g, '')
      }
      if(this.modelOnChange)
        this.modelOnChange(result)

      return result;
    }
  },
  components:{
    MaskedInput
  }
}
</script>

<style scoped>

</style>

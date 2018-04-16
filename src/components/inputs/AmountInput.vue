<template>
  <div :class="addClass" class="amount-wrapper">
    <number-input
      add-class="border amount-one"
      :onchange="e => this.amountOne = e"
      :placeholder="placeholder"
      :value="amountOne"
    ></number-input>
    <number-input
      add-class="border amount-two"
      maxlength="2"
      :onchange="e => this.amountTwo = e"
      :value="amountTwo"
    ></number-input>
    <input type="hidden" :name="name" :value="amount"/>
  </div>
</template>

<script>
import NumberInput from './NumberInput.vue'

export default {
  name: "amount-input",
  props:{
    name: String,
    onchange: {
      required: false
    },
    required: Boolean,
    addClass: String,
    placeholder: String,
    value: {
      required: false
    },
    prefix:{
      type: String,
      default: '.'
    }
  },
  data(){
    return{
      amountOne: '',
      amountTwo: '00'
    }
  },
  created(){
    // todo: . prefix ini props dan al
    // props la gelen default value atanıor
    if(this.value){
      const value = _.toString(this.value)
      const splitedValue = _.split(value, this.prefix)
      if(splitedValue.length == 1){
        this.amountOne = splitedValue[0]
      }else if(splitedValue.length == 2){
        this.amountOne = splitedValue[0]
        this.amountTwo = splitedValue[1]
      }
    }
  },
  computed:{
    amount: function () {
      const result = _.toNumber(`${this.amountOne}.${this.amountTwo}`)
      if(this.onchange){
        this.onchange(result, this.getFilteredAmount(result))
      }
      return result
    }
  },
  methods:{
    getFilteredAmount(amount, decimal){
      const dec = _.isUndefined(decimal) ? 2 : decimal
      const currencyOptions = {
        thousandsSeparator: '.',
        decimalSeparator: ','
      }
      const result = this.$options.filters.currency(amount, '', dec, currencyOptions)
      return result
    }
  },
  components:{
    NumberInput
  }
}
</script>

<style lang="scss" scoped>
.amount-wrapper{
  display: flex;
  .amount-one{
    flex: 1;
    margin-right: 5px;
    text-align: right;
    font-size: 15px;
  }
  .amount-two{
    width: 30px;
    padding: 5px;
    text-align: center;
    font-size: 15px;
  }
}
</style>

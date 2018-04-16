<template>
    <div>
      <h1>Amount Input Story</h1>
      <div class="story-wrapper">
        <amount-input
          name="amount-input"
          add-class="add-class"
          placeholder=""
          :onchange="(amount, filteredAmount) => amountOnChange(amount, filteredAmount)"
          required
        />
      </div>
      <hr>
      onchange amount: {{amount}}<br>
      onchange filteredAmount: {{filteredAmount}}
    </div>
</template>

<script>
import { AmountInput } from '../ui'

export default {
  name: "amount-input-story",
  data(){
    return{
      amount: '',
      filteredAmount: ''
    }
  },
  methods:{
    amountOnChange: function (amount, filteredAmount) {
      this.amount = amount
      this.filteredAmount = filteredAmount
    }
  },
  components:{
    AmountInput
  }
}
</script>

<style scoped>
.story-wrapper{
  width: 200px;
  margin: auto;
}
</style>

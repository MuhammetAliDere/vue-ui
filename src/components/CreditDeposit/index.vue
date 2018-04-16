<template>
  <div>
    <Create
      v-if="step == 'create'"
      :create-form-action="createFormAction"
      :financial-instituon="financialInstituon"
      :created="(e, id) => created(e, id)"
    >
      <slot></slot>
    </Create>
    <Transaction
      :rotary-id="rotaryId"
      v-if="step == 'transaction'"
      :createFormData="createFormData"
    />
  </div>
</template>

<script>
import Create from './Create.vue'
import Transaction from './Transaction.vue'

export default {
    name: "credit-deposit",
    props: {
      createFormAction: {
        type: String,
        required: true
      },
      financialInstituon:{
        required: true
      },
      rotaryId: {
        required: false
      }
    },
    data(){
      return{
        step: 'create',
        createFormData: null,
        // dev config
        testCreateFromData: {
          options: {
            credit_number: "4556456",
            credit_term: "24",
            credit_type: 1,
            currency: "TL",
            financial_institution: 3,
            first_interest_and_commission: 1,
            interest_payment_term: 1,
            is_valor: 1,
            opening_rate: 2
          }
        }
      }
    },
    created(){
      if(this.rotaryId){
        this.getRotary()
      }

    },
    methods:{
      created: function (formData, creditId) {
        this.createFormData = formData
        this.step = 'transaction'
        window.location.href = `/credit/deposit/${creditId}`
        // console.log("successtt formData", formData)
      },
      getRotary(){
        axios.get(`/credit/rotary/api/${this.rotaryId}`)
          .then(response => {
            if(response.status == 200){
              this.createFormData = response.data
              this.createFormData.options = response.data.options
              this.step = 'transaction'
              console.log("this.step", this.step)
            }
          })
          .catch(e => {
            console.log("getRotary e:", e)
          })
      }
    },
    components: {
      Create,
      Transaction
    }
}
</script>

<style scoped>

</style>

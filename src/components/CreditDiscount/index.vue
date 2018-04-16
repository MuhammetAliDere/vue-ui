<template>
  <div>
    <Create
      v-if="step == 'create'"
      :discount-id="discountId"
      :create-form-action="createFormAction"
      :financial-instituon="financialInstituon"
      :created="(e, id) => created(e, id)"
    >
      <slot></slot>
    </Create>
    <Transaction
      :discount-id="discountId"
      v-if="step == 'transaction'"
      :financial-instituon="financialInstituon"
      :createFormData="createFormData"
    />
  </div>
</template>

<script>
import Create from './Create.vue'
import Transaction from './Transaction.vue'

export default {
    name: "credit-discount",
    props: {
      createFormAction: {
        type: String,
        required: true
      },
      financialInstituon:{
        required: true
      },
      discountId: {
        required: false
      }
    },
    data(){
      return{
        step: null,
        createFormData: null,
        // dev config
        testCreateFromData: {
          options: {
            credit_number: "4556456",
            credit_term: "24",
            credit_type: 2,
            currency: "TL",
            financial_institution: 3,
            first_interest_and_commission: 1,
            interest_payment_term: 1,
            is_valor: 0,
            opening_rate: 2
          }
        }
      }
    },
    created(){
      if(this.discountId){
        this.getDiscount()
      }else{
        this.step = 'create'
      }

    },
    methods:{
      created: function (formData, creditId) {
        this.createFormData = formData
        this.step = 'transaction'
        window.location.href = `/credit/discount/${creditId}`
        // console.log("successtt formData", formData)
      },
      getDiscount(){
        axios.get(`/credit/discount/api/${this.discountId}`)
          .then(response => {
            if(response.status == 200){
              this.createFormData = response.data
              this.createFormData.options = response.data.options
              this.step = 'transaction'
            }
          })
          .catch(e => {
            console.log("getDiscount e:", e)
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

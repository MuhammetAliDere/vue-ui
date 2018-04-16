<template>
  <div>
  <Modal v-if="showModal" @close="submitForm">
    <h3 slot="header">Kredili Mevduat Hesabı</h3>
    <div slot="body">
      <div class="form-group white">
        <label>Kredi Adı: </label>
        <input
          type="text"
          name="name"
          class="border default"
          v-model="formData['name']"
        >
        <!--fixme: button theme çalışmıyor-->
        <div slot="footer" class="modal-footer-wrap">
          <v-button :clicked="() => modalSaveButtonPressed()">Kaydet</v-button>
          <v-button
            add-class="pull-right"
            :clicked="() => showModal = false">İptal</v-button>
        </div>
      </div>
    </div>
  </Modal>
  <!--<form method="post" :action="createFormAction">-->
    <slot></slot>
    <div class="row form-panel form">
      <div class="col-md-4 col-sm-4 form-group border-line white">
        <label>Faiz Ödeme Dönemi : </label>
        <span class="inline">
            <input type="radio" id="interest_payment_term1" value="1"
                   name="options[interest_payment_term]"
                   v-model="formData.options['interest_payment_term']"
            >
            <label for="interest_payment_term1">Ay Sonu</label>
        </span>
        <span class="inline">
            <input type="radio" id="interest_payment_term2" value="2"
                   name="options[interest_payment_term]"
                   v-model="formData.options['interest_payment_term']"
            >
            <label for="interest_payment_term2">Devre Sonu</label>
        </span>
      </div>

      <div class="col-md-4 col-sm-4 form-group border-line white">
        <label>Açılış Faiz + Komisyon Oranı (aylık): </label>
        <input-mask
          add-class="border default"
          mask="1.11"
          :model-on-change="m => formData.options['first_interest_and_commission'] = m">
        </input-mask>
      </div>


      <div class="col-md-4 col-sm-4 form-group white border-line">
        <label>Finans Kuruluşu : </label>
        <label class="select-box width-full">
          <i class="fa fa-angle-down" aria-hidden="true"></i>
          <select
            name="options[financial_institution]"
            v-model="formData.options['financial_institution']"
          >
            <option v-for="ins in instituons" :value="ins.id">{{ins.name}}</option>
          </select>
        </label>
      </div>
      <div class="col-md-4 col-sm-4 form-group white">
        <label>Tanımlı Hesap Numarası : </label>
        <input
          type="text"
          name="options[account_number]"
          class="border default"
          v-model="formData.options['account_number']"
        >
      </div>
      <div class="col-md-4 col-sm-4 form-group white">
        <label>Tanımlı Kredi Limiti : </label>
        <number-input
          add-class="border default"
          :onchange="m => formData.options['credit_limit'] = m"
        />
      </div>
    </div>
    <label>Kredi Adı : </label>

    <div class="text-center clearfix">
      <div class="row">
        <div class="col-md-12 col-sm-12 form-group white">

          <button class="btn filled btn-success medium " @click="saveButtonPressed()">
            Kaydet
            <i class="fa fa-save"></i>
          </button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import Select2 from '../inputs/Select2.vue'
import Modal from '../Modal.vue'
import vButton from '../buttons/Button.vue'
import InputMask from '../inputs/InputMask.vue'
import NumberInput from '../inputs/NumberInput.vue'

export default {
  // [true,4]
    name: "create-credit-rotary",
    props: {
      createFormAction: String,
      financialInstituon: [Array, String],
      created: {
        required: true
      }
    },
    data(){
      return{
        instituons: JSON.parse(this.financialInstituon),
        formData: {
          type: 1,
          name: '',
          options:{
            interest_payment_term: 2,
            is_valor: 1,
            // first_interest_and_commission: 12,
            currency: 'TL',
            credit_type: 1,
            opening_rate: 6,
            // credit_number: 54689754321321,
            // credit_term: 24,
            name: null
            // ,financial_institution: 7
          }
        },
        showModal: false
      }
    },
    mounted () {
      this.$watch('$data.formData.options.currency', this.bsmvHandler)
    },
    methods:{
      saveButtonPressed: function () {
        if(!this.formValidation()) return

        this.showModal = true
      },
      bsmvHandler: function () {
        console.log("bsmvHandler...")
        if(this.formData.options.currency === 'TL'){
          this.formData.options.credit_type = 1
        }else{
          this.formData.options.credit_type = 0
        }
        console.log("bsmvHandler")
      },
      submitForm: function () {
        console.log("form will be submited")
      },
      modalSaveButtonPressed: function () {
        axios.post('/credit/rotary', this.formData)
          .then(response => {
            this.showModal = false
            if (response.data[0]) {
              this.created(this.formData, response.data[1])
            } else {
              this.$swal('Geçersiz form', e)
              console.log("deleteButtonPressed status true değil")
              // todo: status true değilse alert edilmeli
            }
          })
          .catch(e => {
            // todo: hata mesajı varsa alert edilmeli
            console.log("deleteButtonPressed e:", e)
            this.$swal('İşlem tamamlanamadı. Hata mesajı:', e)
          })
      },
      formValidation(){
        let isValid = true
        // Açılış Faiz + Komisyon Oranı
        if(!this.formData.options['first_interest_and_commission']){
          this.$toaster.warning('Faiz oranı eklenmeli')
          isValid = false
        }
        // Finans Kuruluşu
        if(!this.formData.options['financial_institution']){
          this.$toaster.warning('Finans kuruluş seçilmeli')
          isValid = false
        }
        // Kredi Limiti
        if(!this.formData.options['credit_limit']){
          this.$toaster.warning('Kredi limiti belirlenmeli')
          isValid = false
        }
        return isValid
      }
    },
    computed: {
      isOpeningRateReadonly() {
        if(this.formData.options['currency'] === 'TL'){
          this.formData.options['opening_rate'] = 1
          return true
        }
        return false
      }
    },
    components: {
      Select2,
      Modal,
      vButton,
      InputMask,
      NumberInput
    }
}
</script>

<style scoped>
.modal-footer-wrap{
  margin-top: 10px
}
</style>

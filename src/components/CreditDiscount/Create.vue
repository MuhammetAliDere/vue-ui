<template>
  <div>
  <Modal v-if="showModal">
    <h3 slot="header">İskonto Kredisi</h3>
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
        <label>Kullanım Tarihi : </label>
        <input-mask
          type="date"
          add-class="border default"
          :model-on-change="m => this.formData.options['date_of_use'] = m "
          :validation-callback="isValid => this.isDateValid = isValid"/>
      </div>
      <div class="col-md-4 col-sm-4 form-group border-line white">
        <label>Kredi Faiz Oranı (Yıllık): </label>
        <input-mask
          name="input-mask"
          add-class="border default"
          mask="11.11"
          :model-on-change="m => this.formData.options['interest_rate'] = m"
        />
      </div>

      <div class="col-md-4 col-sm-4 form-group border-line white">
        <label>Banka Adı : </label>
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

export default {
  // [true,4]
    name: "create-credit-discount",
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
          type: 4,
          name: '',
          options:{}
        },
        showModal: false,
        isDateValid: false
      }
    },
    mounted () {
      this.$watch('$data.formData.options.currency', this.bsmvHandler)
    },
    methods:{
      saveButtonPressed: function () {
        if(!this.formValidation()){
          return
        }else{
          this.showModal = true
        }
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
      modalSaveButtonPressed: function () {
        axios.post('/credit/discount', this.formData)
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
        // Kullanım Tarihi
        const formDate = this.formData.options['date_of_use']
        const transposedDate = this.transposeDate(formDate)
        if(formDate){
          const hasEmptyChar = formDate.indexOf("_")
          if(hasEmptyChar !== -1){
            this.$toaster.warning('Eksik tarih!')
            isValid = false
          }
          // public holiday
          const holidayIndex = _.findIndex(this.publicHolidays, function(d) { return d.date == transposedDate; })
          if(holidayIndex !== -1){
            this.$toaster.warning('Resmi Tatil!')
            isValid = false
          }
        }else{
          this.$toaster.warning('Tarih eklenmedi')
          isValid = false
        }
        if(!this.isDateValid){
          this.$toaster.warning('Geçersiz Tarih!')
          isValid = false
        }


        // Faiz oranı
        const fiac = this.formData.options['first_interest_and_commission']
        if(!fiac){
          this.$toaster.warning('Faiz oranı belirleyin')
          isValid = false
        }else{
          const indexOf = fiac.indexOf('_')
          if(indexOf !== -1){
            this.$toaster.warning('Eksik yada geçersiz faiz oranı!')
            isValid = false
          }
        }
        return isValid
      },
      transposeDate(date){
        const transDate = _.split(date, '-')
        const result = `${transDate[2]}-${transDate[1]}-${transDate[0]}`
        return result
      },
      formValidation(){
        let isValid = true
        // Tarih
        const formDate = this.formData.options['date_of_use']
        const transposedDate = this.transposeDate(formDate)
        if(formDate){
          const hasEmptyChar = formDate.indexOf("_")
          if(hasEmptyChar !== -1){
            this.$toaster.warning('Eksik tarih!')
            isValid = false
          }
        }else{
          this.$toaster.warning('Tarih eklenmedi')
          isValid = false
        }
        if(!this.isDateValid){
          this.$toaster.warning('Geçersiz Tarih!')
          isValid = false
        }
        // Faiz oranı
        const fiac = this.formData.options['interest_rate']
        if(!fiac){
          this.$toaster.warning('Faiz oranı belirleyin')
          isValid = false
        }else{
          const indexOf = fiac.indexOf('_')
          if(indexOf !== -1){
            this.$toaster.warning('Eksik yada geçersiz faiz oranı!')
            isValid = false
          }
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
      InputMask
    }
}
</script>

<style>
.modal-footer-wrap{
  margin-top: 10px
}
.v-toaster {
  z-index: 100000;
}
</style>

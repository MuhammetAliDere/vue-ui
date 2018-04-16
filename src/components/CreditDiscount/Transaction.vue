<template>
  <div class="rotary-transaction">
    <div class="row form-panel green">
      <div class="col-md-4">
        <div class="border-line">
          <span>Kredi Adı : </span>
          <span>{{ createFormData.name }}</span>
        </div>
        <div class="border-line">
          <span>Kredi Faiz Oranı: </span>
          <span>%{{ createFormData.options.interest_rate }}</span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border-line">
          <span>Banka Adı :</span>
          <span> {{ institutionName }} </span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border-line">
          <span>Kullanım Tarihi : </span>
          <span>{{ createFormData.options.date_of_use }}</span>
        </div>
      </div>
    </div>
    <div class="islemler-row">
      <div class="title">
        <h2>İŞLEMLER</h2>
      </div>
      <div class="text-right clearfix action-buttons" v-if="showTable">

        <a href="#" class="btn filled btn-info x-small" tooltip-location="top" tooltip-animate tooltip-size="small"
           tooltip="Pdf İndir"><i class="fa fa-file-pdf-o"></i> </a>
        <a href="#" class="btn filled btn-info x-small" tooltip-location="top" tooltip-animate tooltip-size="small"
           tooltip="Excel İndir"><i class="fa fa-file-excel-o"></i> </a>
        <a href="#" class="btn filled btn-info x-small" tooltip-location="top" tooltip-animate tooltip-size="small"
           tooltip="Yazdır"><i class="fa fa-print"></i> </a>
        <a href="#" class="btn filled btn-danger x-small" tooltip-location="top" tooltip-animate tooltip-size="small"
           tooltip="Yazdır"><i class="fa fa-trash"></i> </a>
      </div>
    </div>
    <div class="table excel border" v-if="showTable">
      <table id="customers">
        <tr>
          <th></th>
          <th></th>
          <th colspan="2"></th>
          <th></th>
          <th></th>
          <th>5,00%</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <th style="width: 115px">
            Çek Vadesi
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>
            Çek Bankası
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>
            Çek Tutarı
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>

          <th>
            Çek No
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>
            KEŞİDECİ VKN/TCKN
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>
            Faiz
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>
            BSMV
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>
            İskonto Değeri
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>
            Tahsil Tarihi
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>
            Tahsil Vadesi
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>
            Faiz Oranı
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>
            Durum
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th></th>
        </tr>

        <tr v-for="rowId in rowIds">
          <!--Çek Vadesi-->
          <td class="date-picker-td">
            <input-mask
              v-if="rowId === editableRowId"
              add-class="border default"
              type="date"
              :value="rows[rowId].date"
              :model-on-change="m => rows[rowId].date = m"
            />
            <input
              v-if="rowId !== editableRowId"
              class="default"
              v-model="rows[rowId].date"/>
          </td>
          <!--Çek Bankası-->
          <td>
            <label
              class="select-box"
              :class="{ disable: rowId !== editableRowId }"
            >
              <i class="fa fa-angle-down" aria-hidden="true"></i>
              <select
                style="width: 140px;"
                v-model="rows[rowId][`bank`]"
                :disabled="rowId !== editableRowId"
              >
                <option v-for="ins in instituons" :value="ins.id">
                  {{ins.name}}
                </option>
              </select>
            </label>
          </td>
          <!--Çek Tutarı-->
          <td class="amount">
            <amount-input
              v-if="rows[rowId].type !== 4 && rowId === editableRowId"
              :value="rows[rowId].amount"
              :onchange="amount => rows[rowId].amount = amount"
            />
            <span v-if="rowId !== editableRowId && rows[rowId].type !== 4" class="amount-span">
              {{ getFilteredAmount(rows[rowId].amount) }}
            </span>
            <span v-if="rows[rowId].type === 4">-</span>
          </td>
          <!--Çek No-->
          <td>
            <input
              class="default"
              :class="{border: rowId === editableRowId}"
              type="text"
              v-model="rows[rowId].check_no"
              :readonly="rowId !== editableRowId"
            />
          </td>
          <!--VKN/TCKN-->
          <td>
            <number-input
              add-class="default"
              :add-class="rowId === editableRowId ? 'border' : ''"
              maxlength="11"
              minlength="11"
              :value="rows[rowId].tax_number"
              :onchange="e => rows[rowId].tax_number = e"
              :readonly="rowId !== editableRowId"
            ></number-input>
          </td>
          <!--Faiz-->
          <td class="price">
            {{ getFilteredAmount(getInterest(rowId)) }}
          </td>
          <!--BSMV-->
          <td>
            {{ getFilteredAmount(getBsmv(rowId)) }}
          </td>
          <!--İskonto Değeri-->
          <td class="price">
            {{ getFilteredAmount(getDiscountValue(rowId)) }}
          </td>
          <!--Tahsil Tarihi-->
          <td>
            {{ getChargeDate(rowId) }}
          </td>
          <!--Tahsil Vadesi-->
          <td class="price">
            {{ getExpiry(rowId) }}
          </td>
          <!--Faiz Oranı-->
          <td>
            <input-mask
              v-if="rowId === editableRowId"
              add-class="border default"
              mask="11.11"
              :value="rows[rowId].interest_rate"
              :model-on-change="m => rows[rowId].interest_rate = m"
            />
            <input
              v-if="rowId !== editableRowId"
              class="default"
              v-model="rows[rowId].interest_rate"
              readonly/>
          </td>
          <!--Durum-->
          <td class="price">
            <label class="select-box" :class="{ disable : rowId !== editableRowId }">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
              <select
                v-model="rows[rowId].status"
                :disabled="rowId !== editableRowId"
                :class="{redborder: hasStatus(rowId)}"
              >
                <option value="1">Tahsil Oldu</option>
                <option value="2">Karşılıksız</option>
              </select>
            </label>
          </td>
          <td class="action-td">
            <a
              v-if="rowId !== editableRowId"
              class="btn filled btn-success small"
              @click="editButtonPressed(rowId)">
                Düzenle
              <i class="fa fa-edit"></i>
            </a>
            <div v-if="rowId === editableRowId">
              <a
                class="btn filled btn-info small"
                @click="updateButtonPressed(rowId)">
                Kaydet
              </a>
              <a
                class="btn filled btn-danger small"
                @click="deleteButtonPressed(rowId)">
                Sil
              </a>
            </div>
          </td>
        </tr>

        <!--Add New Row Begin-->
        <tr>
          <!--DATE-->
          <td class="date-picker-td">
            <input-mask
              add-class="border default"
              type="date"
              :model-on-change="m => this.formData[`date`] = m"
              :validation-callback="isValid => this.isDateValid = isValid"
            />
          </td>
          <!--financial_institution-->
          <td class="price">
            <label class="select-box">
              <select
                style="width: 140px;"
                v-model="formData[`bank`]"
              >
                <option
                  v-for="ins in instituons"
                  :value="ins.id">
                  {{ins.name}}
                </option>
              </select>
            </label>
          </td>
          <!--Çek Tutarı-->
          <td class="amount">
            <div class="amount-wrapper">
              <amount-input
                :value="formData['amount']"
                :onchange="amount => formData['amount'] = amount"
              />
            </div>
          </td>
          <!--Çek No-->
          <td>
            <input
              class="border default"
              type="text"
              v-model="formData[`check_no`]"
            />
          </td>
          <!--VKN/TCKN-->
          <td>
            <number-input
              add-class="border default"
              maxlength="11"
              minlength="11"
              :onchange="e => formData[`tax_number`] = e"
            ></number-input>
          </td>
          <!--Faiz-->
          <td>
            -
          </td>
          <!--BSMV-->
          <td class="price">
            -
          </td>
          <!--İskonto Değeri-->
          <td>
            -
          </td>
          <!--Tahsil Tarihi-->
          <td style="width: 100px">
            -
          </td>
          <!--Tahsil Vadesi-->
          <td class="price">
            -
          </td>
          <!--Faiz Oranı-->
          <td>
            <input-mask
              add-class="border default"
              mask="11.11"
              :value="interestRate"
              :model-on-change="m => formData['interest_rate'] = m"
            />
          </td>
          <!--Durum-->
          <td>
            <label class="select-box">
              <select
                v-model="formData[`status`]"
              >
                <option value="1">Tahsil Oldu</option>
                <option value="2">Karşılıksız</option>
              </select>
            </label>
          </td>
          <!--Aksiyonlar-->
          <td>
            <a
              class="btn filled btn-info small"
              @click="saveButtonPressed()"
            >
              Kaydet
              <i class="fa fa-save"></i>
            </a>
          </td>
        </tr>
        <!--Add New Row End-->
      </table>
    </div>
    <div class="no-transaction" v-if="!showTable">
      <h3>Kayıtlı işlem yok</h3>
      <a
        class="btn filled btn-info small mt40"
        @click="showTable = true"
      >
        İşlem Ekle
      </a>
    </div>
  </div>
</template>

<script>
import DatePicker from '../inputs/DatePickerComp.vue'
import moment from 'moment'
import InputMask from '../inputs/InputMask.vue'
import AmountInput from '../inputs/AmountInput.vue'
import NumberInput from '../inputs/NumberInput.vue'
import Select2 from '../inputs/Select2.vue'

export default{
  name: "transaction",
  props:{
    createFormData: Object,
    discountId:{
      required: false
    },
    financialInstituon: [Array, String],
  },
  data(){
    return{
      rowIds: [],
      rows: {},
      formData: {
        date: "",
        interest_rate: "2",
        status: 1,
        bank: this.createFormData.options['financial_institution']
      },
      editFormData: {},
      // dev config
      showTable: true,
      editableRowId: null,
      isValor: this.createFormData.options.is_valor,
      selectFields:{
        type: [
          {label: "Kullanım", value: 1},
          {label: "Geri Ödeme", value: 2},
          {label: "Faiz + BSMV Ödemesi", value: 3},
          {label: "Faiz Değişimi", value: 4}
        ]
      },
      datesStatus:{},
      dateRowSpan:{},
      datePickerDisabled: [0, 6],
      tableCurrency: this.createFormData.options.currency,
      isBsmv: this.createFormData.options.credit_type,
      lastRowId: null,
      currencyOptions: {
        thousandsSeparator: '.',
        decimalSeparator: ','
      },
      isDateValid: true,
      instituons: JSON.parse(this.financialInstituon),
      institutionName: null,
      institutionId: null,
      rowsDateGroup: {},
      tableTop: 0,
      tableClass: 'hide',
      publicHolidays: [],
      interestRate: this.createFormData.options.interest_rate
    }
  },
  created(){
    if(this.discountId){
      this.getTransactions()
    }
    this.formData.interest_rate = this.createFormData.options.interest_rate

    // set instituonName
    const fi = this.createFormData.options['financial_institution']
    const institution = _.find(this.instituons,
      function(o) { return o.id ==  fi});
    this.institutionName = institution.name | null
    this.institutionId = institution.id | null
    this.formData['bank'] = null
    this.formData['status'] = null
    //add scrool event for
    window.addEventListener('scroll', this.handleScroll);
    //get public holidays
    this.getPublicHolidays()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    rowIds: function (newrowIds, oldrowIds) {
      const lastRowId = newrowIds[newrowIds.length-1]
      this.lastRowId = lastRowId
    }
  },
  methods:{
    saveButtonPressed(){
      // added rotaryid
      if(this.discountId){
        this.formData.credit_id = this.discountId
      }
      // form validation
      if(!this.formValidationCheck()) {
        return
      }
      axios.post('/credit/transaction/check/add', this.formData)
        .then(response => {
          // console.log("response", response)
          if (response.data.success) {
            const rand = _.random(0, 999999);
            // form data cloned and push to rows
            const formDataKeys = Object.keys(this.formData)

            let formDataClone = _.reduce(formDataKeys, (r, key) => {
              r[key] = this.formData[key]
              return r
            }, {})
            // push saved data to the rows
            formDataClone['id'] = response.data.data.id
            formDataClone['order'] = response.data.data.date
            formDataClone['rowId'] = rand
            this.rows[rand] = formDataClone
            this.rowIds.push(rand)
            this.orderRowsByDate()

            // add default values to formData
            const lastRowId = _.findLast(this.rowIds)
            this.formData.rate = this.rows[lastRowId].rate
            this.formData.interest_rate = this.rows[lastRowId].interest_rate
            this.formData.currency = this.tableCurrency
            this.formData.amount = null
            this.formData.bank = this.institutionName
          } else {
            console.log("saveButtonPressed status true değil")
            // todo: status true değilse alert edilmeli
          }
        })
        .catch(e => {
          // todo: hata mesajı varsa alert edilmeli
          console.log("saveButtonPressed e:", e)
        })

    },
    editButtonPressed(rowId){
      this.editableRowId = rowId
    },
    updateButtonPressed(rId){
      const editFormData = this.rows[rId]
      let {rowId, order, ...editForm} = editFormData
      const newOrder = this.transposeDate(editFormData.date)

      axios.post('/credit/transaction/check/update', editForm)
        .then(response => {
          if (response.data.success) {
            this.rows[rId].order = newOrder
            this.orderRowsByDate()
            this.editableRowId = null
          } else {
            this.$toaster.warning('Değişiklik yapılmadı')
            this.editableRowId = null
            console.log("updateButtonPressed status true değil")
            // todo: status true değilse alert edilmeli
          }
        })
        .catch(e => {
          this.editableRowId = null
          // todo: hata mesajı varsa alert edilmeli
          console.log("updateButtonPressed e:", e)
        })
    },
    deleteButtonPressed(rowId){
      const itemId = this.rows[rowId].id

      axios.post('/credit/transaction/check/delete', {id: itemId})
        .then(response => {
          // console.log("delete response", response)
          if (response.data.success) {
            this.editableRowId = null
            _.remove(this.rowIds, function(n) {
              return n  == rowId;
            });
            this.rebaseRowsAfterDelete(rowId)
            this.orderRowsByDate()
          } else {
            console.log("deleteButtonPressed status true değil")
            // todo: status true değilse alert edilmeli
          }
        })
        .catch(e => {
          // todo: hata mesajı varsa alert edilmeli
          console.log("deleteButtonPressed e:", e)
        })
    },
    getLoadBalance(isNew, rowId){
      // is last row
      let result = 0
      if(isNew){
        if(this.formData.type === 4) return '-'
      }else{
        if(this.rows[rowId].type === 4) return '-'
      }

      if(isNew){
        // amount until last row
        const lastAmount = _.reduce(this.rows, (s, row) => {
          const rowAmount = row.currency === this.tableCurrency
            ? _.toInteger(row.amount)
            : _.toInteger(row.amount) * _.toInteger(row.rate)

          if(row.type == 1){
            s += rowAmount
          }else if(row.type == 2){
            s -= rowAmount
          }
          return s
        }, 0)

        const formAmount = this.formData['amount']

        result += _.toInteger(lastAmount)

        if(this.formData['type'] == 1){
          result += _.toInteger(formAmount)
        }else if(this.formData['type'] == 2){
          result -= _.toInteger(formAmount)
        }
      // is loop row
      }else{
        const idx = _.indexOf(this.rowIds, rowId)
        const slicedRowIds =_.slice(this.rowIds, 0, (idx + 1))

        let amountWithCurrency = _.toInteger(this.rows[rowId]['amount'])

        result += _.reduce(slicedRowIds, (s, rowId) => {
          let amount = _.toInteger(this.rows[rowId].amount)

          // currency
          // if(this.rows[rowId]['currency'] !== this.tableCurrency){
          //   if(this.tableCurrency === 'TL'){
          //     amount = _.toInteger(amount * this.rows[rowId]['rate'])
          //   }else{
          //     amount = _.toInteger(amount / this.rows[rowId]['rate'])
          //   }
          // }

          if(this.rows[rowId].type == 1){
            s += amount
          }else if(this.rows[rowId].type == 2){
            s -= amount
          }
          return s
        }, 0)
      }

      return result

    },
    getTypeLabel(rowId){
      const typeValue = this.rows[rowId].type
      const typeIndex = _.findIndex(this.selectFields.type, function(o) { return o.value == typeValue }) //
      const typeLabel = this.selectFields.type[typeIndex].label
      return typeLabel
    },
    datePickerOnChange(value){
      this.formData[`date`] = value
    },
    editDatePickerOnChange(value, rowId){
      console.log("editDatePickerOnChange value", value)
      this.rows[rowId].date = value
    },
    setDatesStatus(){
      this.datesStatus = {}
      let dummyStatus = true
      this.datesStatus = _.reduce(this.rowIds, (r, rowId) => {
        r[rowId] = dummyStatus ? 2 : 0
        console.log("r", r)
        dummyStatus = !dummyStatus
        return r
      }, {})
      console.log("this.datesStatus", this.datesStatus)
    },
    getExpiry(rowId){
      //start date
      const sDate = this.createFormData.options.date_of_use
      const splitedStartDate = _.split(sDate, '-').map(e => _.parseInt(e))
      const startDate = _.reverse(splitedStartDate)
      //end date
      const eDate = this.rows[rowId].date
      const splitedEndDate = _.split(eDate, '-').map(e => _.parseInt(e))
      const endDate = _.reverse(splitedEndDate)

      startDate[1]--
      endDate[1]--
      const start = moment(startDate);
      const end = moment(endDate);
      const valor = this.getValor(rowId)
      const diff = end.diff(start, 'days')

      return diff + valor
    },
    getInterest(rowId){
      const row = this.rows[rowId]
      const amount = row.amount
      const discount = this.getDiscountValue(rowId)
      let interest = amount - discount
      interest = interest/1.05

      const expiry = this.getExpiry(rowId)
      const interestRate = row.interest_rate
      const result = _.ceil((amount*expiry/360*interestRate)/100, 2) | 0;
      return _.ceil(interest, 2)
    },
    getBsmv(rowId){
      const interest = this.getInterest(rowId)
      const result = _.ceil(interest/20, 2)
      return result
    },
    getDiscountValue(rowId){
      const amount = this.rows[rowId].amount
      const interestRate = this.rows[rowId].interest_rate
      const gun = this.getExpiry(rowId)

      let result = amount/ ( 1 + interestRate*1.05*gun / 360 / 100 )
      result = _.ceil(result, 2)
      return result
    },
    getChargeDate(rowId){
      const date = this.rows[rowId].date
      const splitedDate = _.split(date, '-').map(e => _.parseInt(e))
      const reverseDate = _.reverse(splitedDate)
      reverseDate[1]--

      const momentDate = moment(reverseDate)
      const result = momentDate
        .add(this.getValor(rowId), 'days')
        .format('DD-MM-YYYY')
      return result
    },
    getSavedAmount(rowId){
      const row = this.rows[rowId]

      // currency
      // const result = row.currency === this.tableCurrency
      //   ? _.toInteger(row.amount)
      //   : _.toInteger(row.amount) * _.toInteger(row.rate)

      const result = _.toInteger(row.amount)

      return result
    },
    getValor(rowId){
      const row = this.rows[rowId]
      const date = row.date
      const defaultValor = this.institutionId && row.bank == this.institutionId
        ? 0 : 1

      const nrsd = _.split(date, '-').map(e => _.parseInt(e))
      const reverseDateArr = _.reverse(nrsd)
      reverseDateArr[1]--
      const momentDate = moment(reverseDateArr)
      const dayofWeek = momentDate.format('e')
      // set result
      let result = defaultValor
      if(dayofWeek == 5 || dayofWeek == 6)
        result += 2
      if(dayofWeek == 0)
        return result += 1

      // public holiday
      result += this.isholiDay(reverseDateArr, result)

      return result
    },
    getTransactions(){
      axios.get(`/credit/transaction/check/${this.discountId}`)
        .then(response => {
          this.addNewRowWithData(response.data)
        })
        .catch(e => {
          console.log("getTransactions e:", e)
        })
    },
    addNewRowWithData(data){
      const result =_.reduce(data, (obj, row) => {
        let tempRow = row
        const rand = _.random(0, 999999);
        this.rowIds.push(rand)
        tempRow.order = row.date
        tempRow.rowId = rand
        tempRow.date = this.transposeDate(row.date)

        const splitedİntRate = _.split(tempRow.interest_rate, '.')
        if(splitedİntRate.length == 1){
          tempRow.interest_rate = `${tempRow.interest_rate}.00`
        }
        obj[rand] = tempRow
        return obj
      }, {})
      this.rows = result
      this.orderRowsByDate()
    },
    transposeDate(date){
      const transDate = _.split(date, '-')
      const result = `${transDate[2]}-${transDate[1]}-${transDate[0]}`
      return result
    },
    orderRowsByDate(){
      const sortedRowsArray = _.orderBy(this.rows, ['order'], ['asc'])
      const sortedRowIds = _.reduce(sortedRowsArray, (r, row, key) => {
        r.push(row.rowId)
        return r
      }, [])

      // rowsDateGroup: aynı tarihli işlemleri tek key altında listeler
      const rowsDateGroup = _.reduce(sortedRowIds, (r, rowId, key) => {
        const date = this.rows[rowId].date
        if(_.isUndefined(r[date])){
          const equalDatedRows = _.filter(sortedRowIds, rowId => this.rows[rowId].date == date)
          r[date] = equalDatedRows
        }
        return r
      }, {})

      // tarihe göre listelenmiş işlemleri typelarına göre order lar
      // type=1 en önde
      const subSortedRowIds = _.reduce(Object.keys(rowsDateGroup), (r, date) => {
        // rowIds with same date
        let rowIds = rowsDateGroup[date].map(i => i)
        _.map(rowsDateGroup[date], rowId => {

          const rowType = this.rows[rowId].type
          if(rowType == 1){
            r.push(rowId)
            _.remove(rowIds, function(n) {
              return n  == rowId;
            });
          }
        })

        _.map(rowIds, rowId => r.push(rowId))
        return r
      }, [])

      // yeni sıralamayı rowsDateGroup a uygular
      const reOrderRowsDateGroup = _.reduce(subSortedRowIds, (r, rowId, key) => {
        const date = this.rows[rowId].date
        if(_.isUndefined(r[date])){
          const equalDatedRows = _.filter(subSortedRowIds, rowId => this.rows[rowId].date == date)
          r[date] = equalDatedRows
        }
        return r
      }, {})

      this.rowIds = subSortedRowIds
      this.rowsDateGroup = reOrderRowsDateGroup
    },
    getValorInteres(rowId){
      const row = this.rows[rowId]
      const amount = row.amount
      const valor = this.getValor(rowId)
      const interestRate = row.interest_rate

      const result = amount*valor*interestRate/360/100

      return _.ceil(result) | 0
    },
    rebaseRowsAfterDelete(rowId){
      const nextRows = _.reduce(this.rowIds, (r, rId) => {
        if(rId != rowId){
          r[rId] = this.rows[rId]
        }
        return r
      }, {})
      this.rows = nextRows
      this.lastRowId = _.last(this.rowIds)
    },
    getFilteredAmount(amount, decimal){
      const dec = _.isUndefined(decimal) ? 2 : decimal

      let result = this.$options.filters.currency(amount, '', dec, this.currencyOptions)
      return result
    },
    formValidationCheck(){
      let isValid = true

      // Geçersiz işlem tutarı
      if(!this.formData['amount'] || this.formData['amount'] < 0){
        this.$toaster.warning('Geçersiz işlem tutarı!')
        isValid = false
      }

      // Tarih
      const formDate = this.formData.date
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

      // Faiz Oranı
      const interestRate = this.formData.interest_rate
      const isFill = interestRate.indexOf('_') === -1
      if(!isFill){
        this.$toaster.warning('Eksik faiz oranı')
        isValid = false
      }
      if(interestRate){
        if(interestRate <= 0){
          this.$toaster.warning('Geçersiz faiz oranı')
          isValid = false
        }
      }else{
        this.$toaster.warning('Faiz oranı eklenmedi!')
        isValid = false
      }

      // durum
      if(this.hasStatus(false, this.formData['date']) && !this.formData['status']){
        this.$toaster.warning('Durum seçilmeli')
        isValid = false
      }

      return isValid
    },
    handleScroll(){
      // tableRect
      // headerHeight
      // scrollSize
      // if(headerHeight >= tableRect){
      //    add header top atributu
      //    scrollSize + headerHegiht
      // }
      const tableRect = document.getElementById('customers')
        .getBoundingClientRect()
      // console.log("tableRect.top", tableRect.top)

      const header = document.getElementsByTagName('header')
      const headerHeight = header[0].clientHeight
      // const headerStyle = window.getComputedStyle(header)

      const scroolSize = window.pageYOffset

      const offSet = 50

      if(tableRect.top + offSet < 0){
        if(this.tableClass != 'show') this.tableClass = 'show'

        const styleTop = headerHeight-tableRect.top
        // console.log("styleTop:", styleTop)
        this.tableTop = styleTop

      }else{
        if(this.tableClass != 'hide') this.tableClass = 'hide'
      }

    },
    getPublicHolidays(){
      axios.get(`/holidays/api`)
        .then(response => {
          this.publicHolidays = response.data
        })
        .catch(e => {
          console.log("getPublicHolidays e", e)
        })
    },
    ceil(value){
      let result = _.toNumber(`${value}.01`)
      result = result - 0.01
      console.log("result", result)
      return result
    },
    isholiDay(date, valor){
      const momentDate = moment(date)
      const valorArr = new Array(valor)
      const publicHolidays = this.publicHolidays

      const holidayCount = _.reduce(valorArr, (r, key) => {
        momentDate.add(1, 'day')
        const newDate = momentDate.format('YYYY-MM-DD')
        // console.log("newDate", newDate)
        const index = _.findIndex(publicHolidays,
          function(d) { return d.date == newDate })

        if(index !== -1){
          r += publicHolidays[index].expire_days
        }
        return r
      }, 0)

      return holidayCount
    },
    hasStatus(rowId, formDate){
      let rawDate
      if(_.isUndefined(formDate)){
        rawDate = this.rows[rowId].date
      }else{
        rawDate = formDate
      }

      const splitedDate = _.split(rawDate, '-').map(e => _.parseInt(e))
      const date = _.reverse(splitedDate)
      let result = false

      if(moment().isBefore(this.transposeDate(date))){
        result = true
      }

      return result
    }
  },
  components: {
    DatePicker,
    InputMask,
    AmountInput,
    NumberInput,
    Select2
  }
}
</script>

<style lang="scss">
.rotary-transaction{
  .table.excel{
    position: relative;
  }
  .no-transaction{
    text-align: center;
  }
  .date-picker-td{
    overflow: initial;
    width: 114px
  }
  .table.excel.border{
    overflow-x: scroll;
  }
  .align-center{
    text-align: center;
  }
  .amount{
    text-align: right !important;
    color: #376298;
    input{
      text-align: right;
    }
  }
  .valor-td{
    width: 100px;
  }
  .select-box {
    select:disabled{
      border: none;
      color: #376298;
    }
  }
  .select-box.disable{
    i{
      display: none;
    }
  }
  .action-td{
    width: 120px;
  }
  .redborder{
    border: 1px solid red !important;
  }
}

.v-toaster {
  z-index: 100000;
}
.islemler-row{
  display: flex;
  border-bottom: 1px solid;
  margin-bottom: 10px;

  .title{
    flex: 1;
  }
  .action-buttons{
    margin-top: 40px;
  }
  .title h2{
    border-bottom: none;
  }
}

.table tr.table-thead{
  position: absolute;
  top: 250px;
  z-index: 999;
  box-shadow: 0 1px 2px rgba(186,186,186,0.5);
}
.table tr.table-thead.hide{
  display: none;
}
.table tr.table-thead.show{
  display: block;
}
</style>

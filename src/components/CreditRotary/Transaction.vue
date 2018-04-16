<template>
  <div class="rotary-transaction">
    <div class="row form-panel green">
      <div class="col-md-4">
        <div class="border-line">
          <span>Kredi Adı : </span>
          <span>{{ createFormData.name }}</span>
        </div>
        <div class="border-line">
          <span>Kredi Numarası : </span>
          <span>{{ createFormData.options.credit_number }}</span>
        </div>
        <div class="border-line">
          <span>Geri ödemelerde valör uygulanıyor mu : </span>
          <span>{{ createFormData.options.is_valor ? 'Evet' : 'Hayır' }}</span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border-line">
          <span>Banka Adı :</span>
          <span> {{ institutionName }} </span>
        </div>
        <div class="border-line">
          <span>BSMV :</span>
          <span>{{ createFormData.options.credit_type ? 'Uygulanıyor' : 'Uygulanmıyor' }} </span>
        </div>
        <div class="border-line">
          <span>Kredi Vadesi :</span>
          <span> {{ createFormData.options.credit_term }} </span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border-line">
          <span>Açılış Faiz + Komisyon Oranı : </span>
          <span>%{{ createFormData.options.first_interest_and_commission }}</span>
        </div>
        <div class="border-line">
          <span>Faiz Ödeme Dönemi : </span>
          <span>{{ createFormData.options.interest_payment_term == 1 ? 'Ay Sonu' : 'Devre Sonu' }}</span>
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
          <th></th>
          <th></th>
          <th></th>
          <th>5,00%</th>
          <th></th>

          <!--<th></th>-->
          <th v-if="isBsmv"></th>
          <th v-if="isValor"></th>
        </tr>
        <tr>
          <th style="width: 115px">
            <!-- 1.Input -->
            İşlem Tarihi
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <!--<th>-->
          <!--&lt;!&ndash; 1.Select &ndash;&gt;-->
          <!--Döviz-->
          <!--<i class="fa fa-caret-down" aria-hidden="true"></i>-->
          <!--</th>-->
          <th>
            <!-- 2.Select  -->
            İşlem Tipi
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>
            <!-- 2.Input  -->
            İşlem Tutarı
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>

          <th>
            <!-- 4.Input  -->
            Faiz Oranı
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th v-if="isValor">Valör
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>Kredi Bakiyesi
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>Faiz İşleyen Gün
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>Anapara Faiz
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>
            Valör Kaynaklı Faiz
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th v-if="isBsmv">BSMV
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>Faiz+Vergi
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th>Kümülatif Faiz Vergi
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <!--<th>Kredi Kapama Bakiyesi-->
          <!--<i class="fa fa-caret-down" aria-hidden="true"></i>-->
          <!--</th>-->
          <th></th>
        </tr>
        <tr class="table-thead" :class="tableClass" :style="{ top: tableTop + 'px' }">
          <th style="width: 115px;">
          İşlem Tarihi
          <i aria-hidden="true" class="fa fa-caret-down"></i></th> <th style="width: 171px;">
          İşlem Tipi
          <i aria-hidden="true" class="fa fa-caret-down"></i></th> <th style="width: 150px;">
          İşlem Tutarı
          <i aria-hidden="true" class="fa fa-caret-down"></i></th> <th style="width: 100px;">
          Faiz Oranı
          <i aria-hidden="true" class="fa fa-caret-down"></i></th> <th style="width: 100px;">Valör
          <i aria-hidden="true" class="fa fa-caret-down"></i></th> <th>Kredi Bakiyesi
          <i aria-hidden="true" class="fa fa-caret-down"></i></th> <th>Faiz İşleyen Gün
          <i aria-hidden="true" class="fa fa-caret-down"></i></th> <th>Anapara Faiz
          <i aria-hidden="true" class="fa fa-caret-down"></i></th> <th>
          Valör Kaynaklı Faiz
          <i aria-hidden="true" class="fa fa-caret-down"></i></th> <th>BSMV
          <i aria-hidden="true" class="fa fa-caret-down"></i></th> <th>Faiz+Vergi
          <i aria-hidden="true" class="fa fa-caret-down"></i></th> <th>Kümülatif Faiz Vergi
          <i aria-hidden="true" class="fa fa-caret-down"></i></th> <th width="120"></th>
        </tr>



        <tr v-for="rowId in rowIds">
          <td class="date-picker-td" :rowspan="getDateRowSpan(rowId)" v-if="getDateShowStatus(rowId)">
            <input-mask
              v-if="rowId === editableRowId"
              name="input-mask"
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
          <td>
            <label
              :class="{ disable : rowId !== editableRowId }"
              class="select-box">
              <i
                class="fa fa-angle-down"
                aria-hidden="true"></i>
              <!-- 2.Select  -->
              <select
                style="width: 140px;"
                v-model="rows[rowId][`type`]"
                :disabled="rowId !== editableRowId"
              >
                <option
                  v-for="option in selectFields.type"
                  :value="option.value">
                  {{option.label}}
                </option>
              </select>
            </label>
          </td>
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
          <td>
            <input
              class="default align-center"
              :class="{'border': rowId === editableRowId && rows[rowId].type === 4}"
              v-model="rows[rowId].interest_rate"
              :readonly="rowId !== editableRowId || rows[rowId].type !== 4"/>
          </td>
          <!--valör-->
          <td v-if="isValor" class="valor-td">
            {{ getValor(rowId) }}
          </td>
          <td class="price">
            <!--Loan Balance-->
            {{ getFilteredAmount(getLoadBalance(false, rowId)) }}
          </td>
          <td>
            <!--interest-bearing day-->
            {{
              (rows[rowId].type == 1 || rows[rowId].type == 2)
              && lastRowId != rowId && getLoadBalance(false, rowId) > 0
                ? getInterest(rows[rowId].date, rowId)
                : '-' }}
          </td>
          <td class="price">
            <!--Functioning Interest-->
            {{ (rows[rowId].type == 1 || rows[rowId].type == 2)  && lastRowId != rowId
              ? getFilteredAmount(getFunctioningInterest(rowId))
              : '-'
            }}
          </td>
          <td>
            {{ rows[rowId].type == 2
              ? getFilteredAmount(getValorInteres(rowId))
              : '-'
            }}
          </td>
          <td v-if="isBsmv" class="price">
            <!--BSMV-->
            {{ (rows[rowId].type == 1 && lastRowId != rowId) || rows[rowId].type == 2
              ? getFilteredAmount(getBsmv(rowId))
            : '-'
            }}
          </td>
          <td class="price">
            <!--total interest-->
            {{
            (rows[rowId].type == 1 && lastRowId != rowId) || rows[rowId].type == 2
              ? getFilteredAmount(getTotalInterest(rowId))
              : '-'
            }}
          </td>
          <td class="price">
            <!--Cumulative Interest-->
            {{
              rows[rowId].type !== 4 && (lastRowId != rowId || rows[rowId].type == 2)
              ? getFilteredAmount(getCumulativeInterest(rowId, getInterest(rows[rowId].date)))
              : '-'
            }}
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
          <!-- 4 Input - 2 Select -->
          <td class="date-picker-td">
            <!-- 1.Input  -->
            <input-mask
              name="input-mask"
              add-class="border default"
              type="date"
              :model-on-change="m => this.formData[`date`] = m"
              :validation-callback="isValid => this.isDateValid = isValid"
            />
          </td>
          <td class="price">
            <label class="select-box">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
              <!-- 2.Select  -->
              <select
                style="width: 150px;"
                v-model="formData[`type`]"
              >
                <option
                  v-for="option in selectFields.type"
                  :value="option.value">
                  {{option.label}}
                </option>
              </select>
            </label>
          </td>

          <td class="amount">
            <!-- 2.Input  -->
            <div class="amount-wrapper">
              <amount-input
                v-if="formData[`type`] !== 4"
                :onchange="(amount) => formData['amount'] = amount"
              />
            </div>
          </td>
          <td style="width: 100px">
            <!-- 4.Input  -->
            <input
              :disabled="formData[`type`] != 4"
              class="border default align-center"
              type="text"
              v-model="formData[`interest_rate`]"
            />
          </td>
          <!--valör-->
          <td v-if="isValor" class="valor-td">
            -
            <!--<input-->
              <!--class="default"-->
              <!--type="text"-->
              <!--v-model="formData[`is_valor`]"-->
              <!--disabled-->
            <!--/>-->
          </td>
          <td class="price">
            <!--Loan Balance-->
            {{getLoadBalance(true)}}
          </td>
          <td>
            <!--interest-bearing day-->
            -
          </td>
          <td class="price">
            <!--Functioning Interest-->
            -
          </td>
          <td>
            -
          </td>
          <td class="price">
            <!--BSMV-->
            -
          </td>
          <td v-if="isBsmv" class="price">
            <!--total interest-->
            -
          </td>
          <td class="price">
            <!--Cumulative Interest-->
            -
          </td>
          <!--<td class="price">-->
            <!--&lt;!&ndash;Credit Close Review&ndash;&gt;-->
            <!-- - -->
          <!--</td>-->
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

export default{
  name: "transaction",
  props:{
    createFormData: Object,
    rotaryId:{
      required: false
    },
    financialInstituon: [Array, String],
  },
  data(){
    return{
      rowIds: [],
      rows: {},
      formData: {
        // amount: "100000",
        currency: this.createFormData.options.currency,
        date: "",
        interest_rate: "2",
        rate: 1,
        type: "1"
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
      rowsDateGroup: {},
      tableTop: 0,
      tableClass: 'hide',
      publicHolidays: []
    }
  },
  created(){
    if(this.rotaryId){
      this.getTransactions()
    }
    this.formData.rate = this.createFormData.options.opening_rate
    this.formData.interest_rate = this.createFormData.options.first_interest_and_commission

    // set instituonName
    const fi = this.createFormData.options['financial_institution']
    const institution = _.find(this.instituons,
      function(o) { return o.id ==  fi});
    this.institutionName = institution.name
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
      if(this.rotaryId){
        this.formData.credit_id = this.rotaryId
      }
      // form validation
      if(!this.formValidationCheck()) {
        return
      }

      axios.post('/credit/transaction/add', this.formData)
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

      axios.post('/credit/transaction/update', editForm)
        .then(response => {
          if (response.data.success) {
            this.rows[rId].order = newOrder
            this.orderRowsByDate()
            this.editableRowId = null
          } else {
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

      axios.post('/credit/transaction/delete', {id: itemId})
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
    getInterest(date, rowId){
      const splitedDate = _.split(date, '-').map(e => _.parseInt(e))
      const startDate = _.reverse(splitedDate)
      let valor = 0
      let end = moment();

      if(rowId){
        const startRowIndex = this.rowIds.indexOf(rowId)
        if(this.rowIds.length > startRowIndex+1){
          const nextRowIds = _.slice(this.rowIds, (startRowIndex + 1), this.rowIds.length)

          let nextRowDate = null
          _.map(nextRowIds, rowId => {
            const type = this.rows[rowId].type
            if(type != 3 && !nextRowDate){
              nextRowDate = this.rows[rowId].date
              const nrsd = _.split(nextRowDate, '-').map(e => _.parseInt(e))
              const endDate = _.reverse(nrsd)
              endDate[1]--
              end = moment(endDate)
            }
          })
        }
        // valor
        const getValor = this.getValor(rowId)
        if(getValor !== '-'){
          valor = getValor
        }
      }

      startDate[1]--

      const start = moment(startDate);
      const diff = end.diff(start, 'days')   // =1

      // return diff + valor
      return diff
    },
    getFunctioningInterest(rowId){
      const row = this.rows[rowId]
      const amount = this.getLoadBalance(false, rowId)
      const interestDays = this.getInterest(row.date, rowId)
      const interestRate = row.interest_rate

      const result = _.ceil((amount*interestDays/360*interestRate)/100) | 0;
      return result
    },
    getBsmv(rowId){
      const row = this.rows[rowId]
      const totalInterest = this.getFunctioningInterest(rowId) + this.getValorInteres(rowId)
      const result = _.ceil(totalInterest/20)

      return result | 0
    },
    getTotalInterest(rowId){
      const functioningInterest = this.getFunctioningInterest(rowId)
      const bsmv = this.getBsmv(rowId)
      const valor = this.getValorInteres(rowId)

      return functioningInterest + bsmv + valor
    },
    getCumulativeInterest(rowId, interestDays){
      const idx = _.indexOf(this.rowIds, rowId)
      const slicedRowIds =_.slice(this.rowIds, 0, (idx + 1))

      const result = _.reduce(slicedRowIds, (s, rowId) => {
        const amount = this.rows[rowId]['amount']
        const type = this.rows[rowId]['type']

        if(type != 3){
          s += _.toInteger(this.getTotalInterest(rowId))
        }else{
          s -= amount
        }

        return s
      }, 0)

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

      if(row.type != 2) return '-'

      const nrsd = _.split(date, '-').map(e => _.parseInt(e))
      const reverseDateArr = _.reverse(nrsd)
      reverseDateArr[1]--
      const momentDate = moment(reverseDateArr)
      const dayofWeek = momentDate.format('e')

      if(dayofWeek == 5) return 3
      return 1;
    },
    getTransactions(){
      axios.get(`/credit/transaction/${this.rotaryId}`)
        .then(response => {
          this.addNewRowWithData(response.data)
        })
        .catch(e => {
          console.log("getRotary e:", e)
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
      if(this.formData['type'] !== 4 && (!this.formData['amount'] || this.formData['amount'] < 0)){
        this.$toaster.warning('Geçersiz işlem tutarı!')
        isValid = false
      }
      // geri ödeme
      if(this.formData['type'] == 2 && this.getLoadBalance(true) < 0){
        this.$toaster.warning('Toplam kullanım miktarından daha fazla geri ödeme yapılamaz!')
        isValid = false
      }
      // Faiz ödemesi
      else if(this.formData['type'] == 3){
        const lastRowId = _.last(this.rowIds)
        const LastRow = this.rows[lastRowId]

        const cumulativeInterest = this.getCumulativeInterest(lastRowId, this.getInterest(LastRow.date))
        if(cumulativeInterest - this.formData['amount'] < 0){
          this.$toaster.warning('Güncel faizden daha fazla faiz ödemesi yapılamaz!')
          isValid = false
        }
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
      // Faiz Oranı
      if(this.formData.type == 4){
        const interestRate = this.formData.interest_rate
        const lastRowId = _.findLast(this.rowIds)
        const lastInterestRate = this.rows[lastRowId].interest_rate

        if(interestRate){
          if(interestRate <= 0){
            this.$toaster.warning('Geçersiz Faiz oranı')
            isValid = false
          }
          if(interestRate == lastInterestRate){
            this.$toaster.warning('Geçerli faiz oranı eklenemez!')
            isValid = false
          }
        }else{
          this.$toaster.warning('Faiz oranı eklenmedi!')
          isValid = false
        }
      }

      return isValid
    },
    // aynı tarihli işlemlerin tarihlerini tek block görüntülemek için
    getDateRowSpan(rowId){
      // editable işlem ise tek satır olmalı
      if(this.editableRowId === rowId) return 1

      const row = this.rows[rowId]
      const date = row.date
      const rId = row.rowId
      const rowGroup = this.rowsDateGroup[date]

      // aynı tarihli editable işlem varsa tek satır olmalı
      const editableRow = this.rows[this.editableRowId]
      const editableRowId = editableRow ? editableRow.rowId : null
      if(editableRowId){
        if(rowGroup.indexOf(editableRowId) !== -1){
          return 1
        }
      }

      if(rowGroup.length > 1 && rowGroup.indexOf(rId) === 0){
        return rowGroup.length
      }

      return 1
    },
    // aynı tarihli işlemlerin tarihlerini tek block görüntülemek için
    getDateShowStatus(rowId){
      const row = this.rows[rowId]
      const date = row.date
      const rId = row.rowId
      const rowGroup = this.rowsDateGroup[date]

      // aynı tarihli editable işlem varsa -> return true
      const editableRow = this.rows[this.editableRowId]
      const editableRowId = editableRow ? editableRow.rowId : null
      if(editableRowId){
        if(rowGroup.indexOf(editableRowId) !== -1){
          return true
        }
      }

      if(rowGroup.indexOf(rId) > 0){
        return false
      }

      return true
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
    }
  },
  components: {
    DatePicker,
    InputMask,
    AmountInput
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
  }
  .table.excel.border{
    overflow-x: scroll;
  }
  .align-center{
    text-align: center;
  }
  .amount input{
    text-align: right;
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
  .amount-wrapper{
    display: flex;
  }
  .amount-one{
    flex: 1;
    margin-right: 5px;
  }
  .amount-two{
    width: 30px;
    padding: 5px;
  }
  .amount-span{
    color: #376298;
    text-align: right;
    display: block
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

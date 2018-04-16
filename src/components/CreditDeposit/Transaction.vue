<template>
  <div class="rotary-transaction">
    <div class="row form-panel green">
      <div class="col-md-4">
        <div class="border-line">
          <span>Kredi Adı : </span>
          <span>{{ createFormData.name }}</span>
        </div>
        <div class="border-line">
          <span>Tanımlı Hesap Numarası : </span>
          <span>{{ createFormData.options.account_number }}</span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border-line">
          <span>Tanımlı Kredi Limiti :</span>
          <span> {{ createFormData.options.credit_limit }} </span>
        </div>
        <div class="border-line">
          <span>Faiz Ödeme Dönemi : </span>
          <span>{{ createFormData.options.interest_payment_term == 1 ? 'Ay Sonu' : 'Devre Sonu' }}</span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border-line">
          <span>Açılış Faiz + Komisyon Oranı : </span>
          <span>%{{ createFormData.options.first_interest_and_commission }}</span>
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
           tooltip="Sil"><i class="fa fa-trash"></i> </a>
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
          <th>5,00%</th>
          <th></th>

          <th></th>
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
          <th>İşleyen Faiz
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
          <th>Kredi Kapama Bakiyesi
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </th>
          <th></th>
        </tr>
        <tr v-for="rowId in rowIds">
          <td class="date-picker-td">
            <input-mask
              v-if="rowId === editableRowId"
              add-class="border default"
              type="date"
              :value="rows[rowId].date"
              :model-on-change="e => editDatePickerOnChange(e, rowId)"
            />
            <input
              v-if="rowId !== editableRowId"
              class="default"
              :class="{'border': rowId === editableRowId}"
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
            <input
              v-if="rows[rowId].type !== 4"
              class="default"
              :class="{'border': rowId === editableRowId}"
              v-model="rows[rowId].amount"
              :readonly="rowId !== editableRowId"/>
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
            {{ getLoadBalance(false, rowId) }}
          </td>
          <td>
            <!--interest-bearing day-->
            {{ rows[rowId].type == 1 ? getInterest(rows[rowId].date, rowId) : '-' }}
          </td>
          <td class="price">
            <!--Functioning Interest-->
            {{ rows[rowId].type == 1
              ? getFunctioningInterest(rowId)
              : '-'
            }}
          </td>
          <td v-if="isBsmv" class="price">
            <!--BSMV-->
            {{ rows[rowId].type == 1
              ? getBsmv(rowId)
            : '-'
            }}
          </td>
          <td class="price">
            <!--total interest-->
            {{
              rows[rowId].type == 1
              ? getTotalInterest(rowId)
              : '-'
            }}
          </td>
          <td class="price">
            <!--Cumulative Interest-->
            {{
              rows[rowId].type === 4
              ? '-'
              : getCumulativeInterest(rowId, getInterest(rows[rowId].date))
            }}
          </td>
          <td class="price">
            {{
            rows[rowId].type === 4
            ? '-'
            : getLoadBalance(false, rowId)*-1 +
              getCumulativeInterest(rowId, getInterest(rows[rowId].date))
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

        <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
        <!--Add New Row Begin-->
        <tr>
          <!-- 4 Input - 2 Select -->
          <td class="date-picker-td">
            <!-- 1.Input  -->
            <input-mask
              add-class="border default"
              type="date"
              :model-on-change="e => datePickerOnChange(e)"
              :validation-callback="isValid => this.isDateValid = isValid" />
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
            <input
              v-if="formData[`type`] !== 4"
              class="border default"
              type="number"
              v-model="formData[`amount`]"
            />
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
          <td class="price">
            <!--Credit Close Review-->
            -
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

export default{
  name: "transaction",
  props:{
    createFormData: Object,
    rotaryId:{
      required: false
    }
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
      isDateValid: false
    }
  },
  created(){
    if(this.rotaryId){
      this.getTransactions()
    }

    this.formData.rate = this.createFormData.options.opening_rate
    this.formData.interest_rate = this.createFormData.options.first_interest_and_commission
  },
  methods:{
    saveButtonPressed(){
      if(this.formData['type'] == 1){
        const creditLimit = this.createFormData.options.credit_limit
        const loadBalance = this.getLoadBalance(true) * -1
        if(loadBalance > creditLimit){
          this.$toaster.error('Kredi limitinden daha fazla kredi kullanamazsınız!')
          return
        }
      }
      if(this.formData['type'] == 3){
        const lastRowId = _.last(this.rowIds)
        const LastRow = this.rows[lastRowId]

        const cumulativeInterest = this.getCumulativeInterest(lastRowId, this.getInterest(LastRow.date))
        if(cumulativeInterest - this.formData['amount'] < 0){
          this.$toaster.error('Güncel faizden daha fazla faiz ödemesi yapılamaz!')
          return
        }
      }

      if(this.formData['type'] !== 4 && !this.formData['amount']){
        this.$toaster.warning('İşlem tutarı eklenmeli')
        return
      }

      if(this.rotaryId){
        this.formData.credit_id = this.rotaryId
      }

      axios.post('/credit/transaction/add', this.formData)
        .then(response => {
          if (response.data.success) {
            const rand = _.random(0, 999999);
            // form data cloned and push to rows
            const formDataKeys = Object.keys(this.formData)

            let formDataClone = _.reduce(formDataKeys, (r, key) => {
              r[key] = this.formData[key]
              return r
            }, {})
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
      let editFormData = this.rows[rId]
      const {order, rowId, ...editForm} = editFormData
      this.editFormData = editForm

      axios.post('/credit/transaction/update', this.editFormData)
        .then(response => {
          // console.log("update response", response)
          if (response.data.success) {
            this.editableRowId = null
          } else {
            this.editableRowId = null
            console.log("updateButtonPressed status true değil")
            // todo: status true değilse alert edilmeli
          }
        })
        .catch(e => {
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
        const lastAmount = _.reduce(this.rowIds, (s, rowId) => {
          const row = this.rows[rowId]

          const rowAmount = row.currency === this.tableCurrency
            ? _.toInteger(row.amount)
            : _.toInteger(row.amount) * _.toInteger(row.rate)

          if(row.type == 1){
            s -= rowAmount
          }else if(row.type == 2){
            s += rowAmount
          }
          return s
        }, 0)

        const formAmount = _.toInteger(this.formData['amount'])

        result += _.toInteger(lastAmount)

        if(this.formData['type'] == 1){
          result -= _.toInteger(formAmount)
        }else if(this.formData['type'] == 2){
          result += _.toInteger(formAmount)
        }
      // is loop row
      }else{
        const idx = _.indexOf(this.rowIds, rowId)
        const slicedRowIds =_.slice(this.rowIds, 0, (idx + 1))

        let amountWithCurrency = _.toInteger(this.rows[rowId]['amount'])

        result += _.reduce(slicedRowIds, (s, rowId) => {
          let amount = _.toInteger(this.rows[rowId].amount)

          if(this.rows[rowId].type == 1){
            s -= amount
          }else if(this.rows[rowId].type == 2){
            s += amount
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
      }

      startDate[1]--

      const start = moment(startDate);
      const diff = end.diff(start, 'days')   // =1

      return diff
    },
    getFunctioningInterest(rowId){
      const amount = this.getSavedAmount(rowId)
      const interestDays = this.getInterest(this.rows[rowId].date)
      const interestRate = this.rows[rowId].interest_rate

      const result = (amount*interestDays/365*interestRate)/100 | 0;

      return result
    },
    getBsmv(rowId){
      const result = this.getFunctioningInterest(rowId)/20
      return result | 0
    },
    getTotalInterest(rowId){
      const functioningInterest =
        this.getFunctioningInterest(rowId)
      const bsmv = functioningInterest/20
      return functioningInterest + bsmv
    },
    getCumulativeInterest(rowId, interestDays){
      const idx = _.indexOf(this.rowIds, rowId)
      const slicedRowIds =_.slice(this.rowIds, 0, (idx + 1))

      const result = _.reduce(slicedRowIds, (s, rowId) => {
        const amount = this.rows[rowId]['amount']
        const type = this.rows[rowId]['type']
        if(type == 1){
          s += _.toInteger(this.getTotalInterest(rowId))
        }else if(type == 3){
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

      this.rowIds = sortedRowIds
    }
  },
  components: {
    DatePicker,
    InputMask
  }
}

</script>

<style lang="scss">
.rotary-transaction{
  .no-transaction{
    text-align: center;
  }
  .date-picker-td{
    overflow: initial;
  }
  .table.excel.border{
    overflow: initial;
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
</style>

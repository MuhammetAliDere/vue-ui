<template>
  <div>
    <date-picker
      class="date-picker"
      :placeholder="placeholder"
      :name="name"
      :language="lang"
      :format="format"
      :input="onChangeEvent()"
      :disabled="disabled"
      v-model="model"
    />
  </div>
</template>

<script>
    import DatePicker from 'vuejs-datepicker'
    import moment from 'moment'

    export default {
        name: "date-picker-comp",
        props: {
            name: String,
            lang: {
                type: String,
                default: 'tr'
            },
            format: {
                type: String,
                default: 'dd-MM-yyyy'
            },
            placeholder: {
                type: String,
                default: 'Tarih Seçin'
            },
            value: String,
            setToday: Boolean,
            onChange:{
              required: false
            },
            disabledDays: {
              required: false
            },
            useValue: {
              type: Boolean,
              default: true
            }
        },
        data() {
            return {
              defaultValue: this.setToday ? new Date() : this.useValue
                ? this.value
                : this.valueParseToDate(),
              model: null,
              disabled: {
                from: new Date(), // Disable all dates up to specific date
                days: this.disabledDays
              }
            }
        },
        created(){
          this.model = this.defaultValue
        },
        methods: {
          valueParseToDate() {
              const splitedDate = _.split(this.value, '-')
              const splitedDateToNumber = _.reduce(splitedDate, (r, date) => {
                  r.push(_.toNumber(date))
                  return r
              }, [])

              return new Date(Date.UTC(splitedDateToNumber[2], splitedDateToNumber[1]-1, splitedDateToNumber[0]));
          },
          onChangeEvent(){
            if(this.onChange){
              const date = moment(String(this.model)).format('DD-MM-YYYY')
              this.onChange(date)
            }
          }
        },
        components: {DatePicker}
    }
</script>

<style lang="scss">
.date-picker {
  border: 1px solid #376298;

  input {
    height: 34px;
      margin-top:0px;
  }
  .vdp-datepicker__calendar {
    z-index: 99999;
    padding-top: 25px;
  }
  .vdp-datepicker__calendar header {
    position: absolute;
    line-height: 23px !important;
    height: 13px !important;
  }
}

</style>

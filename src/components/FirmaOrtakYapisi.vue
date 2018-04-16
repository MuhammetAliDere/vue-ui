<template>
    <div class="table-content">
        <div class="table-title clearfix">
            <h3>Firma Ortaklık Yapısı
                <span>
                    <a v-if="capital != '' && capital != 0" @click="addRow" class="btn filled btn-warning small">
                        Ortak Ekle
                    </a>
                  <button disabled v-if="capital == '' || capital == 0" class="btn filled btn-warning small">
                        Ortak Ekle
                    </button>
                </span>
            </h3>
        </div>
        <div class="table">
            <table id="customers">
                <tr>
                    <th>
                        Şahıs/Tüzel <i class="fa fa-caret-down" aria-hidden="true"></i>
                    </th>
                    <th>Ortak TCKN/VKN <i class="fa fa-caret-down" aria-hidden="true"></i></th>
                    <th>Ad Soyad/Ünvan <i class="fa fa-caret-down" aria-hidden="true"></i></th>
                    <th>Telefon <i class="fa fa-caret-down" aria-hidden="true"></i></th>
                    <th>Doğum/Kuruluş <i class="fa fa-caret-down" aria-hidden="true"></i></th>
                    <th>Sermaye Tutarı<i class="fa fa-caret-down" aria-hidden="true"></i></th>
                    <th></th>
                </tr>
                <tr v-for="(n, idx) in rows">
                    <td>
                        <label class="select-box width-full">
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                            <select
                                    v-if="models[`${n} + type`] ? 1 : models[`${n} + type`] = 1"
                                    class="select"
                                    :name="getInputName(idx, 'type')"
                                    v-model="models[`${n} + type`]"

                            >
                                <option selected value="1">Şahıs</option>
                                <option value="2">Tüzel</option>
                            </select>
                        </label>
                    </td>
                    <td>
                        <input-mask
                                :name="getInputName(idx, 'identity_number')"
                                mask="11111111111"
                                add-class="border default"
                                :value="models[`${n} + identity_number`]"
                        />

                    </td>
                    <td>
                        <input type="text" :name="getInputName(idx, 'fullname')" class="border default"
                               v-model="models[`${n} + fullname`]">
                    </td>
                    <td>
                        <input-mask
                                add-class="border default"
                                :name="getInputName(idx,'phone')"
                                :trim="true"
                                v-model="models[`${n} + phone`]"
                        >
                        </input-mask>

                    </td>
                    <td>
                        <input-mask
                                :name="getInputName(idx, 'birth_date')"
                                type="date"
                                add-class="border default"
                                :value="models[`${n} + birth_date`]"
                                placeholder="Tarih Seçin"/>
                    </td>
                    <td>
                        <number-input
                                add-class="border default"
                                :name="getInputName(idx, 'share')"
                                :value="models[`${n} + share`]"
                                v-model="models[`${n} + share`]"

                                :onchange="e => models[`${n} + share`] = e"
                        ></number-input>

                    </td>


                    <td>
                        <a @click="removeRow(n)" class="btn filled btn-danger x-small">
                            Sil
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </a> 
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>

    import DatePicker from './inputs/DatePickerComp.vue'
    import InputMask from './inputs/InputMask.vue'
    import NumberInput from './inputs/NumberInput.vue'
    export default {
        name: "firma-ortak-yapisi",
        props: {
            shareholders: Array,
            capital: {
              default: 0
            }
        },
        data() {
            return {
                rows: [],
                models: {}
            }
        },
        created() {
            // this.$watch('$data.models', this.modelHandler, {deep: true})
            // fixme: rand ın daha önce eklenme ihtimali!
            if (this.shareholders) {
                _.reduce(this.shareholders, (r, elem) => {
                    const rand = _.random(0, 999999);
                    this.rows.push(rand);
                    _.map(Object.keys(elem), key => {
                        this.models[`${rand} + ${key}`] = elem[key]
                    });
                }, []);
            }
            const rand = _.random(0, 999999);
            //this.rows.push(rand);

            console.log("this.models", this.models)
        },
        methods: {
            getInputName: function (idx, name) {
                return "shareholder[" + idx + "][" + name + "]"
            },
            addRow: function () {

                if (this.capitaltotal() > this.capital) {
                  this.$toaster.warning('Ortakların sermayesi şirket sermayesinden büyük olmaz')
                }
                else {
                  const rand = _.random(0, 999999);
                  this.rows.push(rand);
                }

            },
            capitaltotal: function () {

                let sumshare = 0;
                this.rows.forEach((item) => {

                    let rakam = parseFloat(this.models[item + ' + share']);
                    if (!isNaN(rakam)) {

                        sumshare += rakam;
                    }

                });
                return sumshare;

            },
            removeRow: function (value) {
                const index = this.rows.indexOf(value)

                this.rows.splice(index, 1)
            }
            // , modelHandler(){
            //   console.log("modelHandler")
            //   if(this.focusInput){
            //     const capital = _.reduce(this.rows, (t, rowId) => {
            //       const share = this.models[`${rowId}-share`]
            //       t += _.toInteger(share)
            //       return t
            //     }, 0)
            //
            //     if(capital > _.toInteger(this.companyCapital)){
            //       this.$toaster.warning('Ortaklarım sermayeleri toplam sermayeden daha fazla olamaz!')
            //     }
            //   }
            // }
        },
        components: {
            DatePicker,
            InputMask,
            NumberInput
        }
    }

</script>
<style lang="scss">
    .firma-ortak-yapisi {
        .table {
            overflow: initial
        }

        .table table tr td {
            overflow: initial
        }

        .select {
            white-space: pre;
        }
    }

    /*.v-toaster {*/
    /*z-index: 100000;*/
    /*}*/
</style>

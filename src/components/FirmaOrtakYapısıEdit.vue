<template>
    <div class="table-content firma-ortak-yapisi">
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
                                    v-if="models[`${n}-holder_type`] ? 1 : models[`${n}-holder_type`] = 1"
                                    class="select"
                                    :name="getInputName(idx, 'holder_type')"
                                    v-model="models[`${n}-holder_type`]"

                            >

                                <option value="1">Şahıs</option>
                                <option value="2">Tüzel</option>
                            </select>
                        </label>
                    </td>
                    <td>
                        <input type="hidden" class="border default"
                               :name="getInputName(idx, 'id')"
                               v-model="models[`${n}-id`]"/>


                        <input-mask
                                add-class="border default"
                                :name="getInputName(idx,'identity_number')"
                                :value="models[getModelName(n,'identity_number')]"
                                :trim="true"
                                mask="11111111111"
                                v-model="models[getModelName(n,'identity_number')]"
                        >
                        </input-mask>

                    </td>
                    <td>
                        <input type="text"
                               :name="getInputName(idx,'fullname')"
                               class="  border default"
                               v-model="models[getModelName(n,'fullname')]">
                    </td>
                    <td>
                        <input-mask
                                add-class="border default"
                                :name="getInputName(idx,'phone')"
                                :value="models[getModelName(n,'phone')]"
                                :trim="true">
                        </input-mask>
                    </td>
                    <td>
                        <input-mask
                                :name="getInputName(idx, 'birth_date')"
                                type="date"
                                add-class="border default"
                                :value="models[getModelName(n,'birth_date')]"
                                placeholder="Tarih Seçin"
                                :value-reverse="true"/>
                    </td>
                    <td>
                        <number-input
                                add-class="border default"
                                :name="getInputName(idx, 'share')"
                                :value="models[`${n}-share`]"
                                v-model="models[`${n}-share`]"

                                :onchange="e => models[`${n}-share`] = e"
                        ></number-input>

                    </td>


                    <td>
                        <a @click="removeRow(n,models[`${n}-id`])" class="btn filled btn-danger x-small">
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
        name: "firma-ortak-yapisi-edit",
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
            if (this.shareholders) {
                _.map(this.shareholders, elem => {
                    const rand = _.random(0, 999999);
                    this.rows.push(rand);
                    _.map(Object.keys(elem), key => {
                        // holder
                        if (key == 'holder' && elem[key]) {
                            const holder = elem[key]
                            _.map(Object.keys(holder), ky => {
                                if (
                                    holder[ky] &&
                                    typeof this.models[`${rand}-${ky}`] === 'undefined'
                                ) {
                                    this.models[`${rand}-holder-${ky}`] = holder[ky]
                                }
                            })
                        } else {
                            this.models[`${rand}-${key}`] = elem[key]
                        }
                    });
                });
            }
            const rand = _.random(0, 999999);
            this.rows.push(rand);
        },
        methods: {

            getInputName: function (idx, name) {
                return "shareholder[" + idx + "][" + name + "]"
            },
            getModelName: function (idx, name) {

                if (this.models[`${idx}-holder_type`] === 1) {

                    if (name === 'id') {
                        return `${idx}-id`;
                    }
                    else {
                        return `${idx}-${name}`;
                    }
                }
                else {
                    switch (name) {
                        case 'fullname':
                            return `${idx}-fullname`;
                            break;
                        case 'id':
                            return `${idx}-id`;
                            break;
                        case 'share':
                            return `${idx}-share`;
                            break;
                        case 'birth_date':
                            return `${idx}-birth_date`;
                            break;
                        case 'identity_number':
                            return `${idx}-identity_number`;
                            break;
                        case 'phone':
                            return `${idx}-phone`;
                            break;
                    }
                }
            },
            capitaltotal: function () {

                let sumshare = 0;
                this.rows.forEach((item) => {

                    let rakam = parseFloat(this.models[item + '-share']);
                    if (!isNaN(rakam)) {

                        sumshare += rakam;
                    }

                });
                return sumshare;

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
            removeRow: function (value, idx) {
                const index = this.rows.indexOf(value);


                if (confirm('Silmek istediğinize eminmisiniz ? ')) {


                    axios.post(`/company/commercial/delete/${idx}`)
                        .then(response => {

                            location.reload();
                            // kayma oluyordu garanti olsun diye sayfayı yeniletiyorum
                        })
                        .catch(e => {

                        })
                    this.rows.splice(index, 1);
                }

            }
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

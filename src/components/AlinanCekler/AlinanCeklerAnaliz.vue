<template>
    <div>

        <ul class="nav nav-tabs">
            <li :class="{ active: !bordro_id }" role="presentation"><a href="/check/received/">ALINAN ÇEKLER ANALİZ</a>
            </li>
            <li><a href="">VERİLEN ÇEKLER</a></li>
            <li :class="{ active: bordro_id }" role="presentation">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                   aria-expanded="false">
                    <template v-if="bordro_id">BORDRO : {{sabittensec('bordrolar',bordro_id)}} <span
                            class="caret"></span></template>
                    <template v-else>BORDROLAR <span class="caret"></span></template>

                </a>
                <ul class="dropdown-menu">
                    <li v-for="(key) in sabitler.bordrolar">
                        <a v-bind:href="'/check/received/'+key.id">{{key.name}}</a>
                    </li>

                </ul>

            </li>


        </ul>
        <div class="ceklerdiv">

            <div v-if="rows.length > 0">
                <div v-if="typeof analiz['analiz'] !== 'undefined'">
                    <div class="title">
                        <h2>
                            ÇEK DEPONUZDAKİ ÇEKLERİN GENEL ANALİZİ
                        </h2>
                    </div>
                    <div class="table border table-fixed-header">
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    Çek Adedi
                                </th>
                                <th>Toplam Tutar</th>
                                <th>Ort. Vade</th>
                                <th>Ort. Tutar</th>
                                <th>En Yüksek Çek</th>
                                <th>En Çok Çek Kesilen Banka</th>
                                <th>En Uzun Vade</th>
                                <th>En Yüksek Risk</th>
                            </tr>
                            </thead>
                            <tr>
                                <td>{{analiz['analiz'].ceksayisi}}</td>
                                <td class="price-cell">{{analiz['analiz'].toplam | moneyformat}} TL</td>
                                <td>{{analiz.ortalamavade}} GÜN</td>
                                <td class="price-cell">{{analiz['analiz'].ortalamatutar | moneyformat}} TL</td>
                                <td class="price-cell">{{analiz['analiz'].enyuksek.dovizli | moneyformat}}
                                    {{analiz['analiz'].enyuksek.symbol}}
                                </td>
                                <td>{{sabittensec('bankalar',analiz['analiz'].enyuksekbanka)}}</td>
                                <td>{{analiz['analiz'].enuzunvade}} Gün</td>
                                <td>
                                    {{analiz['analiz'].enriskli}} <br/> {{analiz.risksay[analiz['analiz'].enriskli] |
                                    moneyformat}} TL
                                </td>

                            </tr>
                        </table>

                    </div>
                    <hr class="mb10">
                </div>
            </div>


            <div class="title">
                <h2>
                    ANALİZ FİLTRELERİ
                </h2>
            </div>
            <div class="form-panel analizform form clearfix">
                <div class="table">
                    <table>
                        <tr>
                            <td>
                                <label>Banka</label>
                                <label class="select-box width-full">
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                    <select name="location" v-model="e.location" class="border default">
                                        <option v-for="(key) in sabitler.bankalar" v-bind:value="key.id">
                                            {{key.name}}
                                        </option>
                                    </select>
                                </label>



                            </td>
                            <td>
                                <label>Vade Alt</label>
                                <amount-input :onchange="amount => e.amount = amount" required/>
                            </td>
                            <td>
                                <label>Vade Üst</label>
                                <amount-input :onchange="amount => e.amount = amount" required/>
                            </td>
                            <td>
                                <label>Keşideci</label>
                                <label class="select-box width-full">
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                    <select name="location" v-model="e.location" class="border default">
                                        <option v-for="(value,key) in apidata.risksay" v-bind:value="value">
                                            {{key}}
                                        </option>
                                    </select>
                                </label>



                            </td>
                        </tr>
                    </table>
                </div>
                <div class="text-center">
                    <a href="#" class="btn filled btn-info medium mt25">ÇEK DEPOSUNU ANALİZ ET</a>
                </div>
            </div>
            <div class="table border">
                <table>
                    <tr>
                        <th></th>
                        <th>
                            Tahsil Olan
                        </th>
                        <th>Yazılan</th>
                        <th>Vadesi Gelmemiş</th>
                        <th>Bankada</th>
                        <th>Kasada</th>
                        <th>Müşteride</th>
                    </tr>
                    <tr>
                        <td class="col-title gray">Toplam Adet</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="col-title gray">Toplam Tutar</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="col-title gray">Yüzde (Adet)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="col-title gray">Tutar Max</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="col-title gray">Toplam Min</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="col-title gray">Ort. Vade</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="col-title gray">En Uzun Vade</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

    import InputMask from './../inputs/InputMask.vue'
    import AmountInput from './../inputs/AmountInput.vue'
    import CsrfTokenInput from '../CsrfTokenInput.vue'
    import moment from 'moment'
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.min.css';


    export default {
        name: "alinan-cekler-analiz",
        props: ['cekdata', 'bordro_id'],
        data() {
            return {

                rows: [],
                isLoading: false,
                importdiv: false,
                checks: [],
                apidata: [],
                e: [],
                duzenlenenid: 0,
                yeniEkle: false,
                sabitler: {},
                ertelenen_tarih_goster: false,
                isFixed: false,
                islem: null,
                bugun: new Date(),
                t: {},
                analiz: [],
                n: {
                    currency: 1,
                    installment_date: '',
                },
                hepsiSecBtn: false
            }
        },
        created() {
            this.sabitlerapi();
            if (this.cekdata) {
                _.forEach(this.cekdata, (elem, key) => {
                    this.rows.push(elem);
                });
            }

            this.analizcek();

            this.datayenile();
        },
        methods: {
            topluIslem: function () {
                this.isLoading = true;

                switch (this.t.islem) {
                    case "1":
                        _.forEach(this.checks, (idx) => {
                            this.tsil(idx, 0, _.last(this.checks));
                        });

                        this.datayenile();

                        break;
                    case "2":

                        axios.post('/check/payrollCreate', {
                            'name': this.t.bordro_adi,
                            'checks': this.checks,
                            'portfolio': this.t.portfolio
                        })
                            .then(response => {
                                this.$toaster.success('Bordoya kaydedildi');
                                this.isLoading = false;
                                this.datayenile();
                            });

                        break;
                }


            },
            datediff: function (date) {

                if (date) {
                    var datez = date.split('-');
                    var date1 = new Date(datez[1] + '-' + datez[0] + '-' + datez[2]);

                    var date2 = new Date();
                    var timeDiff = (date1.getTime() - date2.getTime());

                    var diff = (timeDiff / (1000 * 3600 * 24)).toFixed(0);

                    if (!isNaN(diff)) {
                        if (diff > 0) {
                            return false;
                        }


                    }
                    return Math.abs(diff);
                }


            },
            datayenile: function () {
                axios.get('/check/received/api/apiIndex/' + this.bordro_id)
                    .then(response => {
                        this.rows = response.data.cekdata;
                        this.apidata = response.data;

                        this.sabitlerapi();
                    });

                this.$forceUpdate();

            },
            sabittensec: function (type, id) {

                var result = _.find(this.sabitler[type], function (o) {
                    return o.id == id;
                });
                if (typeof result !== 'undefined') {
                    return result.name;
                }

                return '-';


            },
            duzenle: function (id) {
                this.duzenlenenid = id;
                this.yeniEkle = false;


            },
            sabitlerapi: function () {


                axios.get('/check/received/api/sabitler')
                    .then(response => {


                        this.sabitler = response.data;
                        this.sabitler.durumlar = [
                            {
                                "id": 1,
                                "name": "Tahsil Oldu"
                            },
                            {
                                "id": 2,
                                "name": "Karşılıksız"
                            },
                            {
                                "id": 3,
                                "name": "Ertelendi"
                            },
                            {
                                "id": 4,
                                "name": "İade"
                            },
                            {
                                "id": 5,
                                "name": "Tedbir"
                            }
                        ];


                        this.sabitler.musteriler = [
                            {
                                "id": 1,
                                "name": "Ali"
                            },
                            {
                                "id": 2,
                                "name": "Veli"
                            },
                            {
                                "id": 3,
                                "name": "Kenan"
                            },
                            {
                                "id": 4,
                                "name": "Falan"
                            }
                        ];


                    })
                    .catch(e => {


                    });


            },
            analizcek: function () {

                axios.get('/check/received/api/' + this.bordro_id)
                    .then(response => {

                        this.analiz = response.data;
                        this.yeniEkle = false;

                        this.sabitlerapi();

                    })
                    .catch(e => {


                    });

            },
            hizlikaydet: function (data) {

                if (data.status === "3") {
                    data.ertelenen_tarih_goster = true;
                }
                else {
                    this.kaydet(data);
                }


            },
            kaydet: function (data) {

                delete data.ertelenen_tarih_goster;
                var url = '/check/create';
                var type = 'new';
                if (data.id > 0) {
                    var url = '/check/update';
                    var type = 'edit';
                }

                axios.post(url, data)
                    .then(response => {


                        if (response.data.success) {
                            this.$toaster.success('Başarıyla güncellendi');
                            this.duzenlenenid = 0;
                            this.analizcek();
                        }
                        else {
                            if (type == 'new') {

                                this.rows.push(response.data);
                                this.$toaster.success('Başarıyla eklendi');
                                this.n = {
                                    currency: 1,
                                    installment_date: null,

                                }
                                this.analizcek();
                            }
                        }

                    })
                    .catch(e => {

                        this.$toaster.add(e, {theme: 'danger'});
                        // todo: hata mesajı varsa alert edilmeli


                    });
            },
            takastarihigecmismi: function (installment_date) {


                var date1 = new Date(this.takastarihi(installment_date));
                var date2 = new Date();
                var timeDiff = (date1.getTime() - date2.getTime());
                var diff = (timeDiff / (1000 * 3600 * 24)).toFixed(0);

                if (!isNaN(diff)) {
                    if (diff >= 0) {
                        return diff;
                    }


                }
                return diff;


            },
            takastarihi: function (installment_date) {

                var datez = installment_date.split('-');
                var d = new Date(datez[1] + '-' + datez[0] + '-' + datez[2]);

                var weekday = new Array(7);
                weekday[0] = "Pazar";
                weekday[1] = "Pazartesi";
                weekday[2] = "Salı";
                weekday[3] = "Çarşamba";
                weekday[4] = "Perşembe";
                weekday[5] = "Cuma";
                weekday[6] = "Cumartesi";

                if (d.getDay() == 6) {
                    return moment(d, "DD-MM-YYYY").add(3, 'days');
                }
                if (d.getDay() == 0) {
                    return moment(d, "DD-MM-YYYY").add(2, 'days');
                }
                return moment(installment_date, "DD-MM-YYYY").add(1, 'days');


            },
            bordoyaekle: function (id, index) {


                axios.post('/check/payroll/', {'id': id})
                    .then(response => {


                        this.rows.splice(index, 1);
                        this.duzenlenenid = 0;
                        this.analizcek();
                        return true;

                    })
                    .catch(e => {

                        return false;

                    });


            },
            sil: function (id, index) {


                this.isLoading = true;
                axios.post('/check/delete/', {'id': id})
                    .then(response => {


                        this.rows.splice(index, 1);
                        this.duzenlenenid = 0;
                        this.analizcek();
                        this.isLoading = false;

                        return true;

                    })
                    .catch(e => {

                        return false;

                    });


            },
            tsil: function (id, index, sonid) {


                this.isLoading = true;
                axios.post('/check/delete/', {'id': id})
                    .then(response => {


                        this.rows.splice(index, 1);
                        this.duzenlenenid = 0;
                        this.analizcek();
                        if (id === sonid) {
                            this.isLoading = false;
                        }

                        return true;

                    })
                    .catch(e => {

                        return false;

                    });


            },
            hepsiniSec: function () {
                this.checks = [];
                if (!this.hepsiSecBtn) {
                    _.forEach(this.cekdata, (elem, key) => {
                        this.checks.push(elem.id);
                    });
                }
            }
        },
        filters: {
            moneyformat: function (n) {
                var c = 2;
                var d = ',';
                var t = '.';

                n = parseFloat(n);
                var c = isNaN(c = Math.abs(c)) ? 2 : c,
                    d = d == undefined ? "." : d,
                    t = t == undefined ? "," : t,
                    s = n < 0 ? "-" : "",
                    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
                    j = (j = i.length) > 3 ? j % 3 : 0;
                return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

            },
        },
        components: {
            InputMask, AmountInput, CsrfTokenInput, moment, Loading

        }
    }


</script>

<style scoped>

    .analizform label {
        color: #555;
        text-align: left !important;
        font-size: 15px;
    }

    .analizform td {
        text-align: left !important;
    }

    .ceklerdiv {
        background: #fff;
        padding: 15px;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
    }

    .cekdurum2 {
        color: red;
    }

    .cekdurum3 {
        color: darkorange;
    }

    .form-ozel {
        clear: both;
        margin: 0px;

    }

    .fix {
        clear: Both;
    }

    .form-ozel .form-group {
        width: 190px;
        float: left;
        margin-left: 10px;
        height: 50px;
    }

    .form-ozel .form-group {
        text-align: left !important;
    }

    .kesideci {
        display: inline-block;
        width: 180px;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;

    }

    .tfix2 {
        text-align: left !important;
    }

    .tfix8 span {
        display: inline-block;
        width: 110px;
        overflow: hidden !important;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .tfix9 span {
        display: inline-block;
        width: 110px;
        overflow: hidden !important;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .price-cell {
        text-align: right !important;
    }

    .kirmizi select {
        border: 2px solid #d40505 !important;
    }

    .kirmizi select option:checked {
        color: #d40505;
    }

</style>
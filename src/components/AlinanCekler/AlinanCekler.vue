<template>
    <div>
        <ul class="nav nav-tabs">
            <li :class="{ active: !bordro_id }" role="presentation"><a href="/check/received/">ALINAN ÇEKLER</a></li>
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

                            <template v-if="!bordro_id">ÇEK DEPONUZDAKİ</template>
                            <template v-else>{{sabittensec('bordrolar',bordro_id)}} -</template>
                            ÇEKLERİN ÖZET ANALİZİ
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
                    ALINAN ÇEKLER
                    <div class="text-right inline pull-right">
                        <a @click="importdiv = true" class="btn filled btn-info x-small" tooltip-location="top"
                           tooltip-animate=""
                           tooltip-size="small" tooltip="Excel ile Yükle">Excel Yükle <i
                                class="fa fa-file-excel-o"></i> </a>
                        <a :href="'/check/export/'+bordro_id" class="btn filled btn-info x-small" tooltip-location="top"
                           tooltip-animate=""
                           tooltip-size="small" tooltip="Excel İndir">Excel İndir <i
                                class="fa fa-file-excel-o"></i> </a>
                    </div>
                </h2>
            </div>

            <div class="import-div" v-if="importdiv">
                <form method="post" action="/check/import" enctype="multipart/form-data">
                    <csrf-token-input/>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Excel Dosyası</label>
                                <input type="file" class="default border" name="file"/>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Çekler Nerede</label>
                                <label class="select-box width-full">
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                    <select class="border default" name="location_type" v-model="e.location_type">
                                        <option value="">Seçiniz</option>
                                        <option value="1">Portföyde</option>
                                        <option value="2">Ciro Edildi</option>
                                        <option value="3">Finansal Kurumda</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div v-if="e.location_type > 1" class="col-md-3">
                            <div v-if="e.location_type == 2" class="form-group">
                                <label>Ciro Edildikleri Müşteri</label>
                                <label class="select-box width-full">
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                    <select name="location" v-model="e.location" class="border default">
                                        <option v-for="(key) in sabitler.musteriler" v-bind:value="key.id">
                                            {{key.name}}
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div v-if="e.location_type == 3" class="form-group">
                                <label>Verildikleri Finans Kurumu</label>
                                <label class="select-box width-full">
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                    <select name="location" v-model="e.location" class="border default">
                                        <option v-for="(key) in sabitler.bankalar" v-bind:value="key.id">
                                            {{key.name}}
                                        </option>
                                    </select>
                                </label>
                            </div>

                        </div>
                        <div class="col-md-2 mt40">
                            <button type="submit" class="btn filled btn-info">Yükle</button>
                        </div>
                    </div>

                </form>
            </div>


            <div class="row">
                <div class="col-md-10">

                    <div v-if="checks.length > 0">
                        <div class=" col-md-3 form-group">


                            <label>Yapılacak İşlem</label>
                            <label class="select-box width-full">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                <select v-model="t.islem" class="border default">
                                    <option value="">Şeçiniz</option>
                                    <option value="1">Seçilenleri sil</option>
                                    <option value="2">Seçilenleri Bordro oluştur</option>
                                </select>
                            </label>
                        </div>
                        <div class=" col-md-3 form-group" v-if="t.islem == 2">
                            <label>Bordro Adı</label>
                            <input type="text" class="border default" v-model="t.bordro_adi"/>
                        </div>
                        <div class=" col-md-3 form-group" v-if="t.islem == 2">

                            <label>Verildiği Finans Kurumu</label>
                            <label class="select-box width-full">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                <select v-model="t.portfolio" class="border default" name="portfolio">
                                    <option value="">Seçiniz</option>
                                    <option v-for="(key) in sabitler.bankalar" v-bind:value="key.id">
                                        {{key.name}}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="col-md-2 mt40  form-group">
                            <button type="button" @click="topluIslem(); isLoading = true;" class="btn filled btn-info">
                                Uygula
                            </button>
                        </div>

                    </div>

                </div>
            </div>
            <div class="table border">
                <table>
                    <tr class="is_fixed">
                        <th class="tfix1">

                            <div style="width:20px;" class="checkbox-content">
                                <input type="checkbox" v-model="hepsiSecBtn" @click="hepsiniSec(hepsiSecBtn)"/>
                            </div>
                        </th>
                        <th class="tfix2">Keşideci</th>
                        <th class="tfix3">Keşideci VKN</th>
                        <th class="tfix4">Tutar</th>
                        <th class="tfix5">Döviz</th>
                        <th class="tfix6">Vade</th>
                        <th class="tfix7">Çek No</th>
                        <th class="tfix8">Çekin Bankası</th>
                        <th class="tfix9">Nerede</th>
                        <th class="tfix12">Vade Durumu</th>
                        <th class="tfix12">Çekin Durumu</th>
                        <th class="tfix13">Düzenleme</th>
                    </tr>
                    <template v-if="rows.length == 0">
                        <tr>
                            <td colspan="13">
                                <br/>
                                Kayıtlı çek bulanamadı, çek eklemek için yeni ekle butonunu kulllanabilirsiniz.
                                <br/>
                                <br/>
                                <button type="button" @click="yeniEkle = true; duzenlenenid = 0;"
                                        class="btn filled btn-info">Yeni Ekle
                                </button>

                            </td>
                        </tr>
                    </template>
                    <tr v-for="(n,index) in rows">

                        <template v-if="duzenlenenid == n.id">

                            <td colspan="11">
                                <form v-on:submit.prevent="kaydet(n)">

                                    <div class="form-ozel">
                                        <div class="form-group">
                                            <label>Keşideci</label>
                                            <input type="text" v-model="n.owner" class="border default"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Keşideci VKN</label>
                                            <input-mask v-model="n.owner_tax_number"
                                                        :model-on-change="m => n.owner_tax_number = m"
                                                        mask="11111111111"
                                                        :trim="true" add-class="border default"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Tutar</label>
                                            <amount-input :onchange="amount => n.amount = amount" :value="n.amount"
                                                          required/>
                                        </div>
                                        <div class="form-group">
                                            <label>Döviz</label>
                                            <label class="select-box width-full">
                                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                <select v-model="n.currency" class="border default">
                                                    <option v-for="key in sabitler.doviz" v-bind:value="key.id">
                                                        {{key.name}}
                                                    </option>
                                                </select>
                                            </label>

                                        </div>

                                        <div class="form-group">
                                            <label>Vade Tarihi</label>
                                            <input-mask
                                                    add-class="border default"

                                                    type="date"
                                                    v-model="n.installment_date"
                                                    placeholder="GUN-AY-YIL"
                                                    :model-on-change="m => n.installment_date = m"
                                            >
                                            </input-mask>

                                        </div>
                                        <div class="form-group">
                                            <label>Çek Numarası</label>
                                            <input type="text" v-model="n.number" class="border default"/>


                                        </div>
                                        <div class="form-group">
                                            <label>Çekin Bankası</label>
                                            <label class="select-box width-full">
                                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                <select v-model="n.bank_id" class="border default" name="banks">
                                                    <option value="">Seçiniz</option>
                                                    <option v-for="(key) in sabitler.bankalar" v-bind:value="key.id">
                                                        {{key.name}}
                                                    </option>
                                                </select>
                                            </label>
                                        </div>
                                        <div class="form-group">
                                            <label>Çekin bağlandığı hesap</label>
                                            <label class="select-box width-full">
                                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                <select v-model="n.linked_account" class="border default"
                                                        name="portfoy">
                                                    <option value="">Seçiniz</option>
                                                    <option v-for="(key) in sabitler.portfoy" v-bind:value="key.id">
                                                        {{key.name}}
                                                    </option>
                                                </select>
                                            </label>
                                        </div>
                                        <div class="form-group">
                                            <label>Çekin bağlandığı kredi</label>
                                            <label class="select-box width-full">
                                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                <select v-model="n.linked_credit" class="border default">
                                                    <option value="">Seçiniz</option>
                                                    <option v-for="(key) in sabitler.krediler" v-bind:value="key.id">
                                                        {{key.name}}
                                                    </option>
                                                </select>
                                            </label>
                                        </div>
                                        <div class="form-group">
                                            <label>Çek Nerede</label>
                                            <label class="select-box width-full">
                                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                <select class="border default" v-model="n.location_type">
                                                    <option value="">Seçiniz</option>
                                                    <option value="1">Portföyde</option>
                                                    <option value="2">Ciro Edildi</option>
                                                    <option value="3">Finansal Kurumda</option>
                                                </select>
                                            </label>
                                        </div>
                                        <div v-if="n.location_type == 2" class="form-group">
                                            <label>Ciro Edildiği Müşteri</label>
                                            <label class="select-box width-full">
                                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                <select v-model="n.location" class="border default">

                                                    <option v-for="(key) in sabitler.musteriler" v-bind:value="key.id">
                                                        {{key.name}}
                                                    </option>
                                                </select>
                                            </label>
                                        </div>
                                        <div v-if="n.location_type == 3" class="form-group">
                                            <label>Verildiği Finans Kurumu</label>
                                            <label class="select-box width-full">
                                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                <select v-model="n.location" class="border default">
                                                    <option v-for="(key) in sabitler.bankalar" v-bind:value="key.id">
                                                        {{key.name}}
                                                    </option>
                                                </select>
                                            </label>
                                        </div>

                                        <div class="form-group">
                                            <label>Çek Durumu</label>
                                            <label class="select-box width-full">
                                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                <select v-model="n.status" class="border default" name="yeri">
                                                    <option value="">Seçiniz</option>
                                                    <option v-if="datediff(n.installment_date)" value="1">Tahsil Oldu
                                                    </option>
                                                    <option v-if="datediff(n.installment_date)" value="2">Karşılıksız
                                                    </option>
                                                    <option v-if="datediff(n.installment_date)" value="3">Ertelendi
                                                    </option>
                                                    <option value="4">İade</option>
                                                    <option v-if="datediff(n.installment_date)" value="5">Tedbir
                                                    </option>
                                                </select>
                                            </label>
                                        </div>
                                        <div class="form-group" v-if="n.status == 3">
                                            <label>Ertelendiği Tarih</label>
                                            <input-mask
                                                    add-class="border default"
                                                    type="date"
                                                    v-model="n.deferment_date"
                                                    placeholder="GUN-AY-YIL"
                                                    :model-on-change="m => n.deferment_date = m"
                                            ></input-mask>
                                        </div>
                                        <div class="fix"></div>
                                    </div>
                                </form>
                            </td>

                        </template>
                        <template v-else>
                            <td class="tfix1">
                                <div style="width:20px;" class="checkbox-content"><label><input type="checkbox"
                                                                                                v-model="checks"
                                                                                                :value="n.id"/></label>
                                </div>
                            </td>
                            <td class="tfix2">
                            <span class="kesideci">
                            {{n.owner}}
                            </span>
                            </td>
                            <td class="tfix3">
                                <template v-if="n.owner_tax_number">{{n.owner_tax_number}}</template>
                                <template v-else><span class="btn filled btn-danger small"> Vergi Numarası yok</span>
                                </template>


                            </td>
                            <td class="tfix4">{{n.amount | moneyformat}}</td>
                            <td class="tfix5">{{sabittensec('doviz',n.currency)}}</td>
                            <td class="tfix6">{{n.installment_date}}</td>
                            <td class="tfix7">{{n.number}}</td>
                            <td class="tfix8"><span>{{sabittensec('bankalar',n.bank_id)}}</span></td>
                            <td class="tfix9">
                            <span>
                            <template v-if="n.location_type == 3">
                                {{sabittensec('bankalar',n.location)}}
                            </template>
                            <template v-else-if="n.location_type == 2">

                                {{sabittensec('musteriler',n.location)}}
                            </template>
                            <template v-else>
                                Portföyde
                            </template>
                            </span>

                            </td>

                            <td class="tfix12">
                            <span v-if="datediff(n.installment_date)">
                               
                                {{datediff(n.installment_date)}} gün geçmiş
                            </span>
                                <span v-else>
                                Vadesi Gelmemiş
                            </span>
                            </td>
                            <td class="tfix12">
                                <template v-if="takastarihigecmismi(n.installment_date) < 0">
                                    <template v-if="n.status">
                                    <span v-if="n.status == 3 && n.ertelenen_tarih_goster">
                                       Ertelendiği Tarih:
                                       <input-mask
                                               add-class="border default"
                                               type="date"
                                               :value="bugun"
                                               v-model="n.deferment_date"
                                               placeholder="GUN-AY-YIL"
                                               :model-on-change="m => n.deferment_date = m"
                                       ></input-mask>
                                        <button type="button" class="btn filled btn-success small" @click="kaydet(n)">Kaydet</button>
                                    </span>
                                        <span v-else v-bind:class="'cekdurum'+n.status">{{sabittensec('durumlar',n.status)}}
                                    <span v-if="n.status == 3 && n.deferment_date != '01-01-1970'">{{n.deferment_date}}
                                    </span> </span>
                                    </template>
                                    <template v-else>
                                        <label class="select-box kirmizi width-full">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            <select placeholder="Seçiniz" v-bind="n.status ? n.status : n.status = 0"
                                                    v-model="n.status" v-on:change="hizlikaydet(n)"
                                                    class="border default">
                                                <option class="seciniz" value="0">Seçiniz</option>
                                                <option v-if="datediff(n.installment_date)" value="1">Tahsil Oldu
                                                </option>
                                                <option v-if="datediff(n.installment_date)" value="2">Karşılıksız
                                                </option>
                                                <option v-if="datediff(n.installment_date)" value="3">Ertelendi</option>
                                                <option value="4">İade</option>
                                                <option v-if="datediff(n.installment_date)" value="5">Tedbir</option>
                                            </select>

                                        </label>


                                    </template>
                                </template>
                                <template v-else-if="n.status">
                                    {{sabittensec('durumlar',n.status)}}
                                </template>
                            </td>
                        </template>
                        <td class="tfix13">
                        <span v-if="duzenlenenid == n.id">
                            <button @click="duzenlenenid = 0;" type="submit"
                                    class="btn filled btn-warning small">İptal </button>

                           <button @click="kaydet(n)" type="submit" class="btn filled btn-info small">Kaydet <i
                                   class="fa fa-edit"></i></button>

                           <a @click="sil(n.id,index)" class="btn filled btn-danger small">Sil <i
                                   class="fa fa-edit"></i></a>
                        </span>
                            <a v-if="duzenlenenid !== n.id" @click="duzenle(n.id)"
                               class="btn filled btn-success small">Düzenle <i class="fa fa-edit"></i></a>
                        </td>
                    </tr>
                    <tr v-if="yeniEkle">
                        <template>

                            <td colspan="11">
                                <div class="form-ozel">
                                    <div class="form-group">
                                        <label>Keşideci</label>
                                        <input type="text" v-model="n.owner" class="border default"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Keşideci VKN</label>

                                        <input-mask v-model="n.owner_tax_number"
                                                    :model-on-change="m => n.owner_tax_number = m" mask="11111111111"
                                                    :trim="true" add-class="border default"/>


                                    </div>
                                    <div class="form-group">
                                        <label>Tutar</label>
                                        <amount-input :onchange="amount => n.amount = amount" required/>
                                    </div>
                                    <div class="form-group">
                                        <label>Döviz</label>
                                        <label class="select-box width-full">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            <select v-model="n.currency" class="border default">

                                                <option v-for="(key) in sabitler.doviz" v-bind:value="key.id">
                                                    {{key.name}}
                                                </option>
                                            </select>

                                        </label>

                                    </div>

                                    <div class="form-group">
                                        <label>Vade Tarihi</label>
                                        <input-mask
                                                add-class="border default"

                                                type="date"
                                                v-model="n.installment_date"
                                                placeholder="GUN-AY-YIL"
                                                :model-on-change="m => n.installment_date = m"
                                        >
                                        </input-mask>

                                    </div>
                                    <div class="form-group">
                                        <label>Çek Numarası</label>
                                        <input type="text" v-model="n.number" class="border default"/>


                                    </div>
                                    <div class="form-group">
                                        <label>Çekin Bankası</label>
                                        <label class="select-box width-full">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            <select v-model="n.bank_id" class="border default">
                                                <option value="">Seçiniz</option>
                                                <option v-for="(key) in sabitler.bankalar" v-bind:value="key.id">
                                                    {{key.name}}
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <label>Çekin bağlandığı hesap</label>
                                        <label class="select-box width-full">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            <select v-model="n.linked_account" class="border default" name="portfoy">
                                                <option value="">Seçiniz</option>
                                                <option v-for="(key) in sabitler.portfoy" v-bind:value="key.id">
                                                    {{key.name}}
                                                </option>
                                            </select>
                                        </label>
                                    </div>

                                    <div class="form-group">
                                        <label>Çekin bağlandığı kredi</label>
                                        <label class="select-box width-full">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            <select v-model="n.linked_credit" class="border default">
                                                <option value="">Seçiniz</option>
                                                <option v-for="(key) in sabitler.krediler" v-bind:value="key.id">
                                                    {{key.name}}
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <label>Çek Nerede</label>
                                        <label class="select-box width-full">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            <select class="border default" v-model="n.location_type">
                                                <option value="">Seçiniz</option>
                                                <option value="1">Portföyde</option>
                                                <option value="2">Ciro Edildi</option>
                                                <option value="3">Finansal Kurumda</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div v-if="n.location_type == 2" class="form-group">
                                        <label>Ciro Edildiği Müşteri</label>
                                        <label class="select-box width-full">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            <select v-model="n.location" class="border default">

                                                <option v-for="(key) in sabitler.musteriler" v-bind:value="key.id">
                                                    {{key.name}}
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                    <div v-if="n.location_type == 3" class="form-group">
                                        <label>Verildiği Finans Kurumu</label>
                                        <label class="select-box width-full">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            <select v-model="n.location" class="border default">
                                                <option v-for="(key) in sabitler.bankalar" v-bind:value="key.id">
                                                    {{key.name}}
                                                </option>
                                            </select>
                                        </label>
                                    </div>

                                    <div class="form-group">
                                        <label>Çek Durumu</label>
                                        <label class="select-box width-full">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            <select v-model="n.status" class="border default" name="yeri">
                                                <option value="">Seçiniz</option>
                                                <option v-if="datediff(n.installment_date)" value="1">Tahsil Oldu
                                                </option>
                                                <option v-if="datediff(n.installment_date)" value="2">Karşılıksız
                                                </option>
                                                <option v-if="datediff(n.installment_date)" value="3">Ertelendi</option>
                                                <option value="4">İade</option>
                                                <option v-if="datediff(n.installment_date)" value="5">Tedbir</option>

                                            </select>
                                        </label>
                                    </div>
                                    <div class="form-group" v-if="n.status == 3">
                                        <label>Ertelendiği Tarih</label>
                                        <input-mask
                                                add-class="border default"
                                                type="date"
                                                v-model="n.deferment_date"
                                                placeholder="GUN-AY-YIL"
                                                :model-on-change="m => n.deferment_date = m"
                                        ></input-mask>
                                    </div>
                                    <div class="fix"></div>
                                </div>
                            </td>

                        </template>
                        <td>
                            <button @click="yeniEkle = false; n = {}" type="submit"
                                    class="btn filled btn-warning small">
                                İptal
                            </button>

                            <a @click="kaydet(n)" class="btn filled btn-info small">Kaydet <i
                                    class="fa fa-edit"></i></a>
                        </td>
                    </tr>

                    <tr v-if="rows.length > 0 ">
                        <td>
                            <div style="width:20px;" class="checkbox-content">
                                <input type="checkbox" v-model="hepsiSecBtn" @click="hepsiniSec(hepsiSecBtn)"/>
                            </div>
                        </td>
                        <td colspan="11">

                            <button type="button" @click="yeniEkle = true; duzenlenenid = 0;"
                                    class="pull-right btn filled btn-info">
                                Yeni Ekle
                            </button>
                        </td>


                    </tr>
                </table>

                <div>
                    <loading :active.sync="isLoading"></loading>
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
        name: "alinan-cekler",
        props: ['cekdata', 'bordro_id'],
        data() {
            return {

                rows: [],
                isLoading: false,
                importdiv: false,
                checks: [],
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
<template>
    <div class="container">
        <h1>Select2</h1>
        <Select2 placeholder="Seçim yapın" :options="['foo','bar','baz']" name="selectName" selected-value="foo"/>
        <Space/>

        <h2>Option Map</h2>
        <Select2 :options='testData.optionForMap'
                 :option-map="{label:'name', value:'code'}"
                 :selected-values="['1201', '1250']"
                 name="tax_office"
                 multiple
        ></Select2>
    </div>
</template>

<script>
import {Select2} from '../ui'
import Space from '../components/Space.vue'

export default {
    name: "select2-story",
    data(){
      return {
        selected: ['foo', 'bar'],
        testData: {
          optionForMap: [
            {
            "id": 1,
            "name": "Adana \u0130htisas Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Merkez",
            "code": 1250,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 2,
            "name": "5 Ocak Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Merkez",
            "code": 1251,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 3,
            "name": "Y\u00fcre\u011fir Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Merkez",
            "code": 1252,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 4,
            "name": "Seyhan Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Merkez",
            "code": 1253,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 5,
            "name": "Ziyapa\u015fa Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Merkez",
            "code": 1254,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 6,
            "name": "\u00c7ukurova Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Merkez",
            "code": 1255,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 7,
            "name": "Ceyhan Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Ceyhan",
            "code": 1201,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 8,
            "name": "Kozan Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Kozan",
            "code": 1203,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 9,
            "name": "Karata\u015f Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Karata\u015f",
            "code": 1205,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 10,
            "name": "Feke Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Feke",
            "code": 1103,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 11,
            "name": "Karaisal\u0131 Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Karaisal\u0131",
            "code": 1105,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 12,
            "name": "Pozant\u0131 Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Pozant\u0131",
            "code": 1109,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 13,
            "name": "Saimbeyli Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Saimbeyli",
            "code": 1110,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 14,
            "name": "Tufanbeyli Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Tufanbeyli",
            "code": 1111,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 15,
            "name": "Yumurtal\u0131k Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Yumurtal\u0131k",
            "code": 1112,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 16,
            "name": "Alada\u011f Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "Alada\u011f",
            "code": 1114,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 17,
            "name": "\u0130mamo\u011flu Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADANA",
            "plate": 1,
            "county": "\u0130mamo\u011flu",
            "code": 1115,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 18,
            "name": "Ad\u0131yaman Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADIYAMAN",
            "plate": 2,
            "county": "Merkez",
            "code": 2260,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 19,
            "name": "Kahta Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADIYAMAN",
            "plate": 2,
            "county": "Kahta",
            "code": 2261,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 20,
            "name": "Besni Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADIYAMAN",
            "plate": 2,
            "county": "Besni",
            "code": 2101,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 21,
            "name": "\u00c7elikhan Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADIYAMAN",
            "plate": 2,
            "county": "\u00c7elikhan",
            "code": 2102,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 22,
            "name": "Gerger Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADIYAMAN",
            "plate": 2,
            "county": "Gerger",
            "code": 2103,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 23,
            "name": "G\u00f6lba\u015f\u0131 Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADIYAMAN",
            "plate": 2,
            "county": "G\u00f6lba\u015f\u0131",
            "code": 2104,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 24,
            "name": "Samsat Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADIYAMAN",
            "plate": 2,
            "county": "Samsat",
            "code": 2106,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 25,
            "name": "Sincik Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADIYAMAN",
            "plate": 2,
            "county": "Sincik",
            "code": 2107,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 26,
            "name": "Tut Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ADIYAMAN",
            "plate": 2,
            "county": "Tut",
            "code": 2108,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 27,
            "name": "T\u0131naztepe Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Merkez",
            "code": 3201,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 28,
            "name": "Kocatepe Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Merkez",
            "code": 3280,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 29,
            "name": "Dinar Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Dinar",
            "code": 3260,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 30,
            "name": "Bolvadin Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Bolvadin",
            "code": 3261,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 31,
            "name": "Emirda\u011f Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Emirda\u011f",
            "code": 3262,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 32,
            "name": "Sand\u0131kl\u0131 Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Sand\u0131kl\u0131",
            "code": 3263,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 33,
            "name": "\u00c7ay Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "\u00c7ay",
            "code": 3202,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 34,
            "name": "Dazk\u0131r\u0131 Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Dazk\u0131r\u0131",
            "code": 3103,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 35,
            "name": "\u0130hsaniye Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "\u0130hsaniye",
            "code": 3105,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 36,
            "name": "Sinanpa\u015fa Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Sinanpa\u015fa",
            "code": 3107,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 37,
            "name": "Sultanda\u011f\u0131 Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Sultanda\u011f\u0131",
            "code": 3108,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 38,
            "name": "\u015euhut Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "\u015euhut",
            "code": 3109,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 39,
            "name": "Ba\u015fmak\u00e7\u0131 Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Ba\u015fmak\u00e7\u0131",
            "code": 3111,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 40,
            "name": "Bayat Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Bayat",
            "code": 3112,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 41,
            "name": "\u0130scehisar Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "\u0130scehisar",
            "code": 3264,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 42,
            "name": "\u00c7obanlar Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "\u00c7obanlar",
            "code": 3114,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 43,
            "name": "Evciler Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Evciler",
            "code": 3115,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 44,
            "name": "Hocalar Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "Hocalar",
            "code": 3116,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 45,
            "name": "K\u0131z\u0131l\u00f6ren Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AFYONKARAH\u0130SAR",
            "plate": 3,
            "county": "K\u0131z\u0131l\u00f6ren",
            "code": 3117,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 46,
            "name": "A\u011fr\u0131 Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "A\u011eRI",
            "plate": 4,
            "county": "Merkez",
            "code": 4260,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 47,
            "name": "Do\u011fubeyaz\u0131t Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "A\u011eRI",
            "plate": 4,
            "county": "Do\u011fubeyaz\u0131t",
            "code": 4261,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 48,
            "name": "Patnos Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "A\u011eRI",
            "plate": 4,
            "county": "Patnos",
            "code": 4262,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 49,
            "name": "Diyadin Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "A\u011eRI",
            "plate": 4,
            "county": "Diyadin",
            "code": 4101,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 50,
            "name": "Ele\u015fkirt Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "A\u011eRI",
            "plate": 4,
            "county": "Ele\u015fkirt",
            "code": 4103,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 51,
            "name": "Hamur Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "A\u011eRI",
            "plate": 4,
            "county": "Hamur",
            "code": 4104,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 52,
            "name": "Ta\u015fl\u0131\u00e7ay Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "A\u011eRI",
            "plate": 4,
            "county": "Ta\u015fl\u0131\u00e7ay",
            "code": 4106,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 53,
            "name": "Tutak Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "A\u011eRI",
            "plate": 4,
            "county": "Tutak",
            "code": 4107,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 54,
            "name": "Amasya Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AMASYA",
            "plate": 5,
            "county": "Merkez",
            "code": 5260,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 55,
            "name": "Merzifon Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AMASYA",
            "plate": 5,
            "county": "Merzifon",
            "code": 5261,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 56,
            "name": "G\u00fcm\u00fc\u015fhac\u0131k\u00f6y Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AMASYA",
            "plate": 5,
            "county": "G\u00fcm\u00fc\u015fhac\u0131k\u00f6y",
            "code": 5262,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 57,
            "name": "Ta\u015fova Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AMASYA",
            "plate": 5,
            "county": "Ta\u015fova",
            "code": 5263,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 58,
            "name": "Suluova Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AMASYA",
            "plate": 5,
            "county": "Suluova",
            "code": 5264,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 59,
            "name": "G\u00f6yn\u00fccek Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AMASYA",
            "plate": 5,
            "county": "G\u00f6yn\u00fccek",
            "code": 5101,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 60,
            "name": "Hamam\u00f6z\u00fc Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "AMASYA",
            "plate": 5,
            "county": "Hamam\u00f6z\u00fc",
            "code": 5106,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 61,
            "name": "Anadolu \u0130htisas Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6280,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 62,
            "name": "Ankara \u0130htisas Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6281,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 63,
            "name": "Kavakl\u0131dere Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6253,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 64,
            "name": "Hitit Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6268,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 65,
            "name": "Ostim Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6271,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 66,
            "name": "Veraset ve Har\u00e7lar Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6252,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 67,
            "name": "Maltepe Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6254,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 68,
            "name": "Yenimahalle Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6255,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 69,
            "name": "\u00c7ankaya Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6257,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 70,
            "name": "K\u0131z\u0131lbey Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6258,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 71,
            "name": "Mithatpa\u015fa Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6259,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 72,
            "name": "Ulus Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6260,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 73,
            "name": "Y\u0131ld\u0131r\u0131m Beyaz\u0131t Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6261,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 74,
            "name": "Se\u011fmenler Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6262,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 75,
            "name": "Dikimevi Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6264,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 76,
            "name": "Do\u011fanbey Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6265,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 77,
            "name": "Ye\u011fenbey Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6266,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 78,
            "name": "Yahya Galip Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6269,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 79,
            "name": "Muhammet Karag\u00fczel Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6270,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 80,
            "name": "G\u00f6lba\u015f\u0131 Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6272,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 81,
            "name": "Sincan Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6273,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 82,
            "name": "D\u0131\u015fkap\u0131 Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6274,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 83,
            "name": "Etimesgut Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6275,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 84,
            "name": "Ba\u015fkent Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6276,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 85,
            "name": "Cumhuriyet Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6277,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 86,
            "name": "Ke\u00e7i\u00f6ren Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez",
            "code": 6278,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 87,
            "name": "Kahramankazan Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez- (5216)",
            "code": 6279,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 88,
            "name": "Polatl\u0131 Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Polatl\u0131",
            "code": 6205,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 89,
            "name": "\u015eerefliko\u00e7hisar Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "\u015eerefliko\u00e7hisar",
            "code": 6207,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 90,
            "name": "Beypazar\u0131 Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Beypazar\u0131",
            "code": 6209,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 91,
            "name": "\u00c7ubuk Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez- (5216)",
            "code": 6211,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 92,
            "name": "Haymana Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Haymana",
            "code": 6213,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 93,
            "name": "Elmada\u011f Vergi Dairesi M\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez- (5216)",
            "code": 6215,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 94,
            "name": "Aya\u015f Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez- (5216)",
            "code": 6102,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 95,
            "name": "Bal\u00e2 Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez- (5216)",
            "code": 6103,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 96,
            "name": "\u00c7aml\u0131dere Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "\u00c7aml\u0131dere",
            "code": 6106,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 97,
            "name": "G\u00fcd\u00fcl Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "G\u00fcd\u00fcl",
            "code": 6110,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 98,
            "name": "Kalecik Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Merkez- (5216)",
            "code": 6112,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 99,
            "name": "K\u0131z\u0131lcahamam Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "K\u0131z\u0131lcahamam",
            "code": 6115,
            "created_at": null,
            "updated_at": null
          }, {
            "id": 100,
            "name": "Nall\u0131han Malm\u00fcd\u00fcrl\u00fc\u011f\u00fc",
            "city": "ANKARA",
            "plate": 6,
            "county": "Nall\u0131han",
            "code": 6117,
            "created_at": null,
            "updated_at": null
          }]
        }
      }
    },
    components: {
      Select2,
      Space
    }
}
</script>

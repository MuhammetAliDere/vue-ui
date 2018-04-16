<template>
    <div class="page">
        <div class="container">
            <DataTable
                :headers="headers"
                :sourceUrl="'http://www.json-generator.com/api/json/get/ceirkPsYbS?indent=2'"
                :limit="10"
            />
            <!--<DataTable-->
                <!--:headers="headers"-->
                <!--:data="data"-->
                <!--:limit="10"-->
            <!--/>-->
        </div>
    </div>
</template>

<script>
import {DataTable} from "../ui"

export default {
    name: "data-table-story",
    data() {
        return {
            // headers: [
            //     {text: 'Name', value: 'name'},
            //     {text: 'Calories', value: 'calories'},
            //     {text: 'Fat (g)', value: 'fat'},
            //     {text: 'Carbs (g)', value: 'carbs'},
            //     {text: 'Protein (g)', value: 'protein'},
            //     {text: 'Sodium (mg)', value: 'sodium'},
            //     {text: 'Calcium (%)', value: 'calcium'},
            //     {text: 'Iron (%)', value: 'iron'}
            // ],
            headers: [
                {text: 'Name', value: 'name'},
                {text: 'Age', value: 'age'},
                {text: 'Email', value: 'email'},
                {text: 'Phone', value: 'phone'},
                {text: 'Address', value: 'address'}
            ],
            data: [
                {
                    value: false,
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    sodium: 87,
                    calcium: '14%',
                    iron: '1%'
                },
                {
                    value: false,
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    sodium: 129,
                    calcium: '8%',
                    iron: '1%'
                },
                {
                    value: false,
                    name: 'Ice cream sandwich 11',
                    calories: 237,
                    fat: 9.0,
                    carbs: 11,
                    protein: 4.3,
                    sodium: 11,
                    calcium: '8%',
                    iron: '1%'
                },
                {
                    value: false,
                    name: 'Ice cream sandwich  1',
                    calories: 237,
                    fat: 9.0,
                    carbs: 1,
                    protein: 4.3,
                    sodium: 129,
                    calcium: '8%',
                    iron: '1%'
                },
                {
                    value: false,
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 2,
                    protein: 6.0,
                    sodium: 337,
                    calcium: '6%',
                    iron: '7%'
                },
                {
                    value: false,
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    sodium: 413,
                    calcium: '3%',
                    iron: '8%'
                },
                {
                    value: false,
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    sodium: 327,
                    calcium: '7%',
                    iron: '16%'
                },
                {
                    value: false,
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    sodium: 50,
                    calcium: '0%',
                    iron: '0%'
                },
                {
                    value: false,
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    sodium: 38,
                    calcium: '0%',
                    iron: '2%'
                },
                {
                    value: false,
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    sodium: 562,
                    calcium: '0%',
                    iron: '45%'
                },
                {
                    value: false,
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    sodium: 326,
                    calcium: '2%',
                    iron: '22%'
                },
                {
                    value: false,
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    sodium: 54,
                    calcium: '12%',
                    iron: '6%'
                }
            ]

        }
    },
    components: {
        DataTable
    }
}
</script>

<style>
.page{
    background-color: #f5f5f5;
    padding-bottom: 25px;
}
</style>

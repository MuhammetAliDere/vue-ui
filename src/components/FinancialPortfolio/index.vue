<template>
    <div>
        <div class="col-lg-1">
            <div :class="{'form-group' : true, 'has-error' : errors['institution_type']}">
                <label for="institution_type">Kuruluş Türü: </label>
                <label class="select-box width-full">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                    <select name="institution_type" id="institution_type" v-model="type">
                        <option value="1">Banka</option>
                        <option value="2">Leasing</option>
                        <option value="3">Faktoring</option>
                        <option value="4">Finansman</option>
                    </select>
                </label>
            </div>
        </div>
        <div class="col-lg-3">
            <div :class="{'form-group' : true, 'has-error' : errors['financial_institution_id']}">
                <label for="financial_institution_id">Finans Kuruluşu: </label>
                <Select2 :options='getInstitutions()'
                         :option-map="{label:'name', value:'id'}"
                         :selected-value="selectedIns"
                         placeholder="-- Lütfen bir finans kuruluşu seçin --"
                         id="financial_institution_id"
                         name="financial_institution_id">
                </Select2>
            </div>
        </div>
    </div>
</template>

<script>
    import Select2 from '../inputs/Select2.vue';

    export default {
        name: "portfolio",
        props: {
            financialInstitutions: {
                required: true,
                type : Array
            },
            errors : {
                required: false,
                type : Array|Object,
                default : function() {
                    return [];
                }
            },
            selectedIns : {
                required: false,
                type : String|Number,
                default : function() {
                    return '';
                }
            },
            selectedType : {
                required: false,
                type : String|Number,
                default : function() {
                    return '';
                }
            }
        },
        data() {
            return {
                type: 1
            };
        },
        methods: {
            getInstitutions: function () {
                return _.filter(this.financialInstitutions, o => o.type == this.type);
            }
        },
        components: {
            Select2
        }
    }
</script>

<style scoped>

</style>

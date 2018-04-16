<!--todo: error için natification pakiti kullanılmalı-->
<!--todo: headers boş geldiğinde header oluşturulmalı-->
<!--todo: data table sourceUrl ile çalıştığında search live data ile çalışmalı-->
<template>
    <div class="table">
        <table id="customers">
            <tr>
                <th v-for="header in headers">
                    <a class="header-text" @click="sort(header.value)">
                        {{header.text}}
                        <!--<Icon-->
                                <!--v-if="sortFilter.name === header.value"-->
                                <!--name="caret-up"-->
                                <!--scale="1"-->
                        <!--&gt;-->
                        <!--</Icon>-->
                    </a>
                </th>
            </tr>
            <tr>
                <td v-for="header in headers">
                    <input type="text" v-model="filters[header.value]"/>
                </td>
            </tr>
            <tr v-for="item in items">
                <td v-for="h in headers">
                    {{item[h.value]}}
                </td>
            </tr>
        </table>
        <Pagination
            :limit="limit"
            :pageCount="pageCountBySearch"
            :onChange="setPage"
        />
    </div>
</template>

<script>
import 'vue-awesome/icons/caret-down'
import 'vue-awesome/icons/caret-up'
import Icon from 'vue-awesome/components/Icon.vue'
import Pagination from './Pagination.vue'

export default {
    name: "data-table",
    props: {
        headers: {
            type: Array,
            required: true
        },
        data: [Array],
        limit: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            activePage: 1,
            pageCount: _.ceil(this.data.length / this.limit),
            filters: {},
            // 0 is low to high
            // 1 is high to low
            sortFilter: {
                name: null,
                type: 0
            }
        }
    },
    computed: {
        activeFilters(){
            if(_.isEmpty(this.filters)) return false;
            const output = _.reduce(Object.keys(this.filters), (sum, fk) => {
                if(this.filters[fk] !== ""){
                    sum.push(fk);
                }
                return sum;
            }, []);
            return output;
        },
        filteredItems(){
            let output = this.data;
            if(this.activeFilters){
                output = _.filter(output, item => {
                    let isPassFilter = true;
                    _.map(this.activeFilters, f => {
                        if
                        (
                            this.toLowString(item[f]).indexOf(this.toLowString(this.filters[f])) === -1
                            &&
                            this.toLowString(item[f]) !== this.toLowString(this.filters[f])
                        ){
                            isPassFilter = false;
                        }
                    });
                    return isPassFilter;
                });
            }
            return output;
        },
        short(){
            if(_.isEmpty(this.sortFilter.name)) return this.filteredItems;
            let sortFilterName = this.sortFilter.name;
            // console.log("sort will be start..");
            console.log("this.sortColumnName", sortFilterName);
            let output =_.sortBy(this.filteredItems, [function(o) {
                return o[sortFilterName];
            }]);
            if(this.sortFilter.type){
                output = _.reverse(output);
            }
            return output;
        },
        pageCountBySearch(){
            return _.ceil(this.short.length / this.limit)
        },
        paginatedItems(){
            if(this.activePage > this.pageCountBySearch){
                this.activePage = 1;
            }
            const endPoint = this.limit * this.activePage;
            const beginPoint = endPoint - this.limit;
            return _.slice(this.short, beginPoint, endPoint)
        },
        items(){
            return this.paginatedItems;
        }
    },
    methods: {
        setPage(pageNumber) {
            this.activePage = pageNumber;
        },
        toLowString(value){
            return _.toLower(_.toString(value))
        },
        sort(columnName){
            if(this.sortFilter.name === columnName){
                this.sortFilter.type = ++this.sortFilter.type % 2;
            }else{
                this.sortFilter.name = columnName;
            }
        }
    },
    components: {
        Icon,
        Pagination
    }
}
</script>

<style lang="scss" scoped>
    // custom
    .search-col{
        width: 100px;
    }
    input{
        width: 11vw;
    }
    .header-text{
        color: red;
    }
    // theme
    .table{
        overflow-x: auto;
        .filter{
            margin-bottom: 10px;
            overflow: hidden;
            width: 100%;
            @media(max-width:991px){
                .text-right{
                    text-align: center;
                    margin-top: 10px;
                }
            }
            .search{
                position: relative;
                i{
                    position: absolute;
                    right: 10px;
                    top: 10px;
                }
            }
        }
        table{
            width: 100%;
            border-collapse: collapse;
            border:1px solid #eaeaea;
            tr{
                position: relative;
                background: #fff;
                &:nth-of-type(1){
                    border-bottom:2px solid #035280;
                }
                &.selected{
                    background: rgba(229,235,241,0.5);
                }
                &:hover{
                    background-color: rgba(229,235,241,0.5);
                }
                &::nth-child(even){
                    background-color: #eaeaea;
                }
                td{
                    border-bottom: 1px solid #eaeaea;
                    padding: 12px 8px;
                    color: #636363;
                    font-size: 15px;
                    position: relative;
                    overflow: hidden;
                    input[type=checkbox]{
                        cursor:pointer;
                        height: 40px;
                        z-index: 999;
                    }
                    label{
                        width: inherit;
                        display: inline;
                    }
                }
            }
            th{
                border: 1px solid transparent;
                padding: 12px 8px;
                text-align: left;
                background-color: #fff;
                color: #035280;
                font-size:18px;
                position: relative;
                i{
                    margin-left: 10px;
                    font-size:20px;
                }
            }
        }
    }
</style>

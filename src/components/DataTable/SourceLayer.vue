<template>
    <DataTable
        :headers="headers"
        :data="data"
        :limit="limit"
    />
</template>

<script>
import axios from 'axios'
import DataTable from './DataTable.vue'

export default {
    name: "source-layer",
    props: {
        headers: [Array],
        sourceUrl: [String],
        limit: [Number]
    },
    data(){
        return{
            data: [],
            errors: []
        }
    },
    created() {
        let self = this;
        return axios.get(this.sourceUrl)
            .then(function (response) {
                self.data = response.data;
                if(!self.headers){
                    self.headers = response.data.map(e => {
                        console.log('==e', e);
                    });
                }
            })
            .catch(function (error) {
                this.errors.push(error);
            })
    },
    components: {
        DataTable
    }
}
</script>
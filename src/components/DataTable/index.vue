<!--todo: stiller düzeltilmeli-->
<template>
    <div>
        <DataTable
            v-if="data && data.length"
            :headers="headers"
            :data="data"
            :limit="limit"
        />
        <SourceLayer
            v-if="sourceUrl"
            :headers="headers"
            :sourceUrl="sourceUrl"
            :limit="limit"
        />
    </div>
</template>

<script>
import DataTable from './DataTable.vue'
import SourceLayer from './SourceLayer.vue'

export default {
    name: "data-table-index",
    props: {
        headers: {
            type: Array,
            required: true
        },
        data: [Array],
        sourceUrl: [String],
        limit: {
            type: Number,
            default: 10
        }
    },
    methods: {

    },
    components: {
        DataTable,
        SourceLayer
    }
}
</script>
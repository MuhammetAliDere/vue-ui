<template>
    <div class="page">
        <div class="container">
            <h1 class="title">Label</h1>
            <div class="label">
                <v-label type="success">Success</v-label>
                <v-label>Default</v-label>
                <v-label type="danger">Danger</v-label>
                <v-label type="warning">Warning</v-label>
                <v-label type="info">Info</v-label>
            </div>
        </div>
    </div>
</template>

<script>
import {vLabel} from '../ui'

export default {
    name: "label-story",
    components:{ vLabel }
}
</script>

<style lang="scss" scoped>
    .page{
        background-color: #f5f5f5;
        padding-bottom: 25px;
    }
</style>

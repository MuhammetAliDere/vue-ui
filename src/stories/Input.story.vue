<template>
    <div class="page">
        <div class="container">
            <h1>INPUT</h1>
            <div class="row">
                <div class="col-md-3">
                    <h3>Default</h3>
                    <v-input name="default"/>
                </div>
                <div class="col-md-3">
                    <h3>Success</h3>
                    <v-input addClass="success" name="success"/>
                </div>
                <div class="col-md-3">
                    <h3>Error</h3>
                    <v-input addClass="error" name="error"/>
                </div>
                <div class="col-md-3">
                    <h3>Dark</h3>
                    <v-input addClass="dark" name="dark"/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <h3>Border</h3>
                    <v-input addClass="border" name="border"/>
                </div>
                <div class="col-md-3">
                    <h3>Border Success</h3>
                    <v-input addClass="border success" name="border-success"/>
                </div>
                <div class="col-md-3">
                    <h3>Border Danger</h3>
                    <v-input addClass="border danger" name="border-danger"/>
                </div>
                <div class="col-md-3">
                    <h3>Border Info</h3>
                    <v-input addClass="border info" name="border-info"/>
                </div>
            </div>


            <div class="row">
                <div class="col-md-3">
                    <h3>Border Warning</h3>
                    <v-input addClass="border warning" name="border-warning"/>
                </div>
                <div class="col-md-3">
                    <h3>Border Default</h3>
                    <v-input addClass="border default" name="border-default"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {vInput} from '../ui'

export default {
    name: "input-story",
    components: { vInput }
}
</script>

<style lang="scss" scoped>
    .page{
        background: #f5f5f5;
    }
</style>

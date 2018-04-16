<template>
    <div class="page">
        <div class="container">
            <h1 class="title">TEXTAREA</h1>
            <div class="row">
                <div class="col-md-6">
                    <h3>Default</h3>
                    <TextArea name="default"/>
                </div>
                <div class="col-md-6">
                    <h3>Dark</h3>
                    <TextArea addClass="dark" name="dark"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {TextArea} from '../ui'

export default {
    name: "text-area",
    components: { TextArea }
}
</script>

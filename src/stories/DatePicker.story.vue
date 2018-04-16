<template>
    <div action="" type="post">
        <h1>Date Picker</h1>
        <date-picker name="*dataPickerName" placeholder="Tarih Seçin" format="dd.MM.yyyy" lang="tr" />
    </div>
</template>

<script>
import {DatePicker} from '../ui'

export default {
    name: "data-picker-story",
    components: {DatePicker}
}
</script>

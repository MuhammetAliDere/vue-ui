<template>
    <div>
      <h1>Tckn Input</h1>
      <number-input
        name="test"
        placeholder="sadece rakam"
        add-class="border"
        maxlength="11"
        minlength="11"
        :onchange="e => data = e"
      ></number-input>
      number-input story data: {{data}}
    </div>
</template>

<script>
  import { NumberInput } from '../ui'

export default {
  name: "number-input-story",
  data(){
    return{
      data: null
    }
  },
  components:{
    NumberInput
  }
}
</script>

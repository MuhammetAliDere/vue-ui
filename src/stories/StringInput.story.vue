<template>
    <div>
      <h1>String Input</h1>
      <string-input
        name="test"
        placeholder="sadece text"
        add-class="border"
        :onchange="e => data = e"
      ></string-input>
      string-input story data: {{data}}
    </div>
</template>

<script>
  import { StringInput } from '../ui'

export default {
  name: "string-input-story",
  data(){
    return{
      data: null
    }
  },
  components:{
    StringInput
  }
}
</script>

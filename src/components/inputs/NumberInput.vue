<template>
      <input
        :name="name"
        :class="addClass"
        v-model="model"
        type="text"
        class="default"
        :maxlength="maxlength"
        :minlength="minlength"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
      />
</template>

<script>
  export default {
    name: "number-input",
    props: {
      addClass: String,
      name: {
        type: String,
        default: 'number-input'
      },
      value: String|Number,
      required: Boolean,
      placeholder: String,
      onchange:{
        required: false
      },
      minlength:{
        required: false
      },
      maxlength:{
        required: false
      },
      readonly: Boolean
    },
    data(){
      return{
        model: this.value
      }
    },
    created(){
      if(this.onchange){
        this.onchange(this.value)
      }
    },
    watch: {
      model(newM, oldM) {
        newM = newM.replace(/([a-zA-Z])/g, "")
        newM = newM.replace(/[^\w\s]/gi, '')
        this.model = newM
        if(this.onchange){
          this.onchange(newM)
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  input{
    width: 100%;
    display: block;
    font-size: 16px;
    border: 0;
    outline: none;
    margin-top: 5px;
    border: 0;
    padding: 5px 10px;
    height: 37px;
    &.default{
      color: #376298;
      background: #fdfdfd;
    }
    &.dark{
      color: #fdfdfd;
      background: #376298;
    }
    &.success{
      color: #fdfdfd;
      background: #4fba6f;
    }
    &.error{
      color: #fff;
      background: #b30303;
      &:after{
        content:'/ed1d25d';
        position: absolute;
        right:0;
        top: 10px;
        color: #fdfdfd;
        font-size:20px;
        display: block;
      }
    }
    &.border{
      background: #fdfdfd;
      border:1px solid;
      &.success{
        color: #4fba6f;
        border-color:#4fba6f;
      }
      &.danger{
        color: #ed1d25;
        border-color: #ed1d25;
      }
      &.info{
        color: #68B3C8;
        border-color: #68B3C8;
      }
      &.warning{
        color: #F3BB45;
        border-color: #F3BB45;
      }
      &.default{
        color: #222;
        border-color: #376298;
      }
    }
    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color:  #376298;
      font-size:15px;
    }
    &::-moz-placeholder { /* Firefox 19+ */
      color:  #376298;
      font-size:15px;
    }
    &:-ms-input-placeholder { /* IE 10+ */
      color: #376298;
      font-size:15px;
    }
    &:-moz-placeholder { /* Firefox 18- */
      color: #376298;
      font-size:15px;
    }
  }
</style>

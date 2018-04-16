<template>
    <label
        class="filled lbl-success"
        :class="'lbl-' + type"
    >
        <slot></slot>
    </label>
</template>

<script>
  export default {
      name: "v-label",
      props:{
          type:{
              type: String,
              default: 'default'
          }
      }
  }
</script>

<style lang="scss" scoped>
    label{
        width: 100%;
        display: block;
        font-size: 19px;
        color:#fff;
        font-weight: 400;
    &.filled{
         border:0;
         padding: 10px;
         border-radius: 2px;
         display: inline-block;
         width: inherit;
         font-size:14px;
         text-align: center;
    &.lbl-success{
         color: #fff;
         background: #4fba6f;
     }
    &.lbl-danger{
         color: #fff;
         background: #ed1d25;
     }
    &.lbl-info{
         color: #fff;
         background: #68B3C8;
     }
    &.lbl-warning{
         color: #fff;
         background: #F3BB45;
     }
    &.lbl-default{
         color: #fff;
         background: #66615B;
     }
    }
    &.error{
         color:#b30303!important;
         font-size: 13px!important;
         margin-top: 10px;
         display: block;
         font-weight: 700;
     }
    &.hint{
         font-weight: 700;
         font-style: italic;
         font-size:13px!important;
         color: #035280!important;
     }
    }
</style>

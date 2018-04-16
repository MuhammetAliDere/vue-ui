<template>
    <div
        tooltip-animate
        :tooltip-location="location"
        :tooltip-size="size"
        :tooltip="text"
    >
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "tooltip",
        props:{
            location:{
                type: String,
                default: 'top'
            },
            size:{
                type: String,
                default: 'medium'
            },
            text:{
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    *[tooltip] {
        position: relative;
        display: inline-block;
        font-size:17px;
        &:after,&:before{
            visibility: hidden;
            position: absolute;
            margin: 0;
            z-index: 98;
        }
        &:before {
            border-style: solid;
            border-color: #376298 transparent;
            content: "";

        }
        &:after{
            background: rgba(55,98,152,1);
            color: #fff;
            content: attr(tooltip);
            padding: 10px 15px;
            font-size: 80%;
            border-radius: 2px;
        }
        &:hover{
            &:after,&:before{ visibility: visible; }
        }

        &,&[tooltip-location="bottom"]{
            &:before {
                border-width: 0 6px 6px 6px;
                bottom: auto;
                top : 20px;
                left: 50%;
            }
            &:after{
                left: 0px;
                top: 26px;
            }
        }
        &[tooltip-location="top"]{
            &:before {
                border-width: 6px 6px 0px 6px;
                top: auto;
                bottom : 20px;
            }
            &:after{
                top:auto;
                bottom: 26px;
            }
        }
        &[tooltip-location="right"]{
            &:before {
                border-width: 6px 6px 0px 6px;
                top: 50%;
                left: 100%;
                transform: rotate(90deg);
            }
            &:after{
                top : -10%;
                left : calc(100% + 9px);
            }
        }
        &[tooltip-location="left"]{
            &:before {
                border-width: 6px 6px 0px 6px;
                top: 50%;
                right: 100%;
                left: auto;
                transform: rotate(-90deg);
            }
            &:after{
                top : -10%;
                left : auto;
                right : calc(100% + 9px);
            }
        }

        &[tooltip-animate]{
            &,&[tooltip-location="bottom"]{
                &:before,&:after { margin: 10px 0px 0px 0px; }
            }
            &[tooltip-location="top"]{
                &:before,&:after { margin: 0px 0px 10px 0px;}
            }
            &[tooltip-location="right"]{
                &:before,&:after { margin: 0px 0px 0px 10px; }
            }
            &[tooltip-location="left"]{
                &:before,&:after { margin: 0px 10px 0px 0px; }
            }
            &:after,&:before{
                transition: all 0.3s ease;
                opacity : 0;
            }
            &:hover{
                &:after,&:before{
                    margin: 0;
                    opacity: 1;
                }
            }
        }
        &[tooltip-size="small"]{
            &:after{ width: 100px; }
        }
        &,&[tooltip-size="medium"]{
            &:after{ width: 150px; }
        }
        &[tooltip-size="full-width"]{
            &:after{ width: 100%; min-width: 200px; }
        }
    }
</style>
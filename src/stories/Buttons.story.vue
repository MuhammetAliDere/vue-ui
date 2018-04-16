<template>
    <div class="page">
        <div class="container">
            <h1>Buttons</h1>
            <div>
                <h2>Color - Border</h2>
                <v-button  type="success" btn-style="border" :clicked="successButtonClicked">success</v-button>
                <v-button  type="danger" btn-style="border">danger</v-button>
                <v-button  type="info" btn-style="border">info</v-button>
                <v-button  type="warning" btn-style="border">warning</v-button>
                <v-button  type="default" btn-style="border">default</v-button>
            </div>
            <div>
                <h2>Color - Filled</h2>
                <v-button  type="success" btn-style="filled" href="#">success</v-button>
                <v-button  type="danger" btn-style="filled">danger</v-button>
                <v-button  type="info" btn-style="filled">info</v-button>
                <v-button  type="warning" btn-style="filled">warning</v-button>
                <v-button  type="default" btn-style="filled">default</v-button>
            </div>
            <div>
                <h2>Size</h2>
                <v-button type="success" btn-style="border large" href="#">success</v-button>
                <v-button type="danger" btn-style="border medium">danger</v-button>
                <v-button type="info" btn-style="border small">info</v-button>
                <v-button type="warning" btn-style="border x-small">warning</v-button>
            </div>
            <div>
                <h2>Style</h2>
                <v-button type="success" btn-style="border filled" href="#">success</v-button>
                <v-button type="warning" btn-style="border">warning</v-button>
                <v-button type="warning" btn-style="simple">warning</v-button>
            </div>
            <div>
                <h2>Icon</h2>
                <edit-button>Edit</edit-button>
                <delete-button>Delete</delete-button>
            </div>
        </div>
    </div>
</template>

<script>
import {
  vButton,
  EditButton,
  DeleteButton
} from '../ui'


export default {
    name: "buttons",
    components: {
        vButton,
        EditButton,
        DeleteButton
    },
    methods:{
        successButtonClicked: function () {
            console.log("successButtonClicked !!!!!")
        }
    }
}
</script>

<style lang="scss" scoped>
    html,body{
        height: 100%;
        box-sizing: border-box;

    }
    body{
        box-sizing:border-box;
        position: relative;
        margin: 0;
        padding: 0;
        width: 100%;
        overflow-x: hidden;
        font-family: 'Roboto', sans-serif;
        background: #fff;
        color: #222;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .page{
        background: #f5f5f5;
    }
    /*layout*/
    h1, h2, h3, h4{
        color: #222;
        font-weight: 700;
    }
    h1{
        font-size:40px;
        text-align: center;
        margin-top: 20px;
        &.title{
            &:after{
                content:'';
                position: relative;
                display: block;
                height:1px;
                margin: 20px auto;
                width: 120px;
                background: #6f7d96;
            }
        }
    }
    h2{
        font-size:30px;
        &.title{
            &:after{
                content:'';
                position: relative;
                display: block;
                height:1px;
                margin: 20px auto;
                width: 120px;
                background: #6f7d96;
            }
        }
    }
    h3{
        font-size:25px;
    }
    h4{
        font-size:20px;
    }
    h5{
        font-size:16px;
        font-weight: 400;
    }

    p{
        font-size:13px;
        font-weight: 400;
        &.italic{
            font-style: italic;
        }
    }
    a,
    button,
    input,
    select{
        &:focus,
        &:active{
            outline: none!important;
        }
        outline: none!important;
    }
    .width-full{
        width:100%;
    }
</style>

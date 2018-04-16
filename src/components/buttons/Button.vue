<!--todo: goTo metodu eklenmeli-->
<template>
    <button
        class="btn"
        :class="themedClassName + ' ' + addClass"
        :href="href"
        @click="linkClicked"
        :type="type"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "v-button",
    props: {
        type: String,
        theme: {
            type: String,
            default: 'default'
        },
        href: String,
        label: {
            type: String,
            default: 'label'
        },
        addClass: {
            type: String,
            default: ''
        },
        clicked: {
            default: null
        }
    },
    computed: {
        themedClassName: function () {
            return 'btn-' + this.theme;
        }
    },
    methods: {
        linkClicked() {
            return this.clicked ? this.clicked() : null
        }
    }
}
</script>

<style lang="scss" scoped>
    .btn{
        box-sizing: border-box;
        border-width: 2px;
        background-color: transparent;
        font-size: 16px;
        font-weight: 500;
        padding: 7px 25px;
        transition: all 0.2s ease;
        position: relative;
        outline:none;
        z-index: 99;
        position: relative;
        i{
            margin-left: 5px;
        }
        &.border{
            background: transparent;
            &.btn-success{
                color: #4fba6f;
                border-color:#4fba6f;
                &:hover{
                    color: #fff;
                    background: #4fba6f;
                    i{
                        color: #fff;
                    }
                }
                i{
                    color: #4fba6f;
                }
            }
            &.btn-danger{
                color: #ed1d25;
                border-color: #ed1d25;
                &:hover{
                    color: #fff;
                    background: #ed1d25;
                    i{
                        color: #fff;
                    }
                }
                i{
                    color: #ed1d25;
                }
            }
            &.btn-info{
                color: #68B3C8;
                border-color: #68B3C8;
                &:hover{
                    color: #fff;
                    background: #68B3C8;
                    i{
                        color: #fff;
                    }
                }
                i{
                    color: #68B3C8;
                }
            }
            &.btn-warning{
                color: #F3BB45;
                border-color: #F3BB45;
                &:hover{
                    color: #fff;
                    background: #F3BB45;
                    i{
                        color: #fff;
                    }
                }
                i{
                    color: #F3BB45;
                }
            }
            &.btn-default{
                color: #fff;
                border-color: #fff;
                &:hover{
                    color: #376298;
                    background: #fff;
                    i{
                        color: #376298;
                    }
                }
                i{
                    color: #376298;
                }
            }
        }
        &.filled{
            border:0;
            &.btn-success{
                color: #fff;
                background: #4fba6f;
                &:hover{
                    color: #fff;
                    background: #06823d;
                }
            }
            &.btn-danger{
                color: #fff;
                background: #ed1d25;
                &:hover{
                    color: #fff;
                    background: #d40505;
                }
            }
            &.btn-info{
                color: #fff;
                background: #68B3C8;
                &:hover{
                    color: #fff;
                    background: #1c8faf;
                }
            }
            &.btn-warning{
                color: #fff;
                background: #F3BB45;
                &:hover{
                    color: #fff;
                    background: #e49c03;
                }
            }
            &.btn-default{
                color: #fff;
                background: #66615B;
                &:hover{
                    color: #fff;
                    background: #44403b;
                }
            }
        }
        &.simple{
            border:0;
            background: transparent;
            &.btn-success{
                color: #4fba6f;
                &:hover{
                    color: #4fba6f;
                }
            }
            &.btn-danger{
                color: #ed1d25;
                &:hover{
                    color: #ca420f;
                }
            }
            &.btn-info{
                color: #68B3C8;
                &:hover{
                    color: #3392ad;
                }
            }
            &.btn-warning{
                color: #F3BB45;
                &:hover{
                    color: #e6a212;
                }
            }
            &.btn-default{
                color: #66615B;
                background: #66615B;
                &:hover{
                    color: #44413e;
                }
            }
        }
        &.large{
            font-size:24px;
        }
        &.medium{
            font-size:20px;
        }
        &.small{
            font-size:15px;
        }
        &.x-small{
            font-size:12px;
            padding: 7px 5px;
        }
    }
</style>

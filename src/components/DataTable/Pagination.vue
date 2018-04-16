<!--todo: limit eklenmeli-->
<!--todo: active eklenmeli-->
<template>
    <div>
        <nav aria-label="Page navigation" class="text-right">
            <ul class="pagination">
                <li>
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li>
                    <a
                        class="page-link"
                        v-for="n in pageCount"
                        v-if="pageCount > 1"
                        @click="onChange(n)"
                    >
                        {{n}}
                    </a>
                </li>
                <li>
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "pagination",
        props: {
            limit: {
                type: Number,
                required: true
            },
            pageCount: {
                type: Number,
                required: true
            },
            onChange: {
                type: Function,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pagination{
        .page-link{
            cursor: pointer;
        }
        li{
            &:first-child,
            &:last-child{
                a{
                    background: #035180;
                    color: #fff;
                    display: inline-block;
                }
            }
            a{
                display: inline-block;
                color: #035180;
            }
        }
    }
</style>
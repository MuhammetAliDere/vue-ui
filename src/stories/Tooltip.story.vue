<template>
    <div class="page">
        <h2>Tooltip</h2>
        <div class="container">
            <div class="tooltipContent">
                <div class="col-md-3">
                    <Tooltip location="top" size="medium" text="Sed leo neque, imperdiet in luctus ac, hendrerit sit amet neque. Nam placerat nisi magna, non porttitor">
                        <a href="#">Top Animate</a>
                    </Tooltip>
                </div>
                <div class="col-md-3">
                    <Tooltip location="bottom" size="large" text="Nullam eu tortor non odio faucibus viverra. Aliquam rhoncus placerat tellus, ac venenatis est feugiat nec.">
                        <a href="#">Bottom Animate</a>
                    </Tooltip>
                </div>
                <div class="col-md-3">
                    <Tooltip location="left" size="full-width" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rutrum dolor molestie nisi suscipit, ac fringilla turpis tristique. Donec ac sodales neque.">
                        <a href="#">Left Animate</a>
                    </Tooltip>
                </div>
                <div class="col-md-3">
                    <Tooltip location="right" size="full-width" text="Donec ornare purus sit amet purus tempor accumsan. Maecenas a nunc ut tellus iaculis posuere sed gravida ipsum. Aliquam erat volutpat. In condimentum,">
                        <a href="#">Right Animate</a>
                    </Tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Tooltip} from '../ui'

export default {
    name: "tooltip-story",
    components:{ Tooltip }
}
</script>

<style lang="scss" scoped>
    .page{
        background-color: #f5f5f5;
        padding-top: 200px;
        padding-bottom: 200px;
    }
</style>

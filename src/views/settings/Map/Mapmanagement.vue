<template>
    <div class="Map_manag">
        <div class="Map_title">Gis地图数据来源</div>
        <div class="button_edi">
            <CButton class="form_butt" type="submit">百度地图</CButton>
            <CButton class="form_butt1" type="submit">高德地图</CButton>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.Map_manag{
    padding: 0 10px;
    .Map_title{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 600;
        margin-bottom: 10px;
    }
    .button_edi{
        button{
            font-size: 16px;
        }
    }
}
</style>
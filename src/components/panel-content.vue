<template>
    <div ref="panelContent" class="tticar-panel-content">
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            childrenComponentJson:{},
        }
    },
    props: {

    },
    methods: {
		rowResize(refName){
            if(this.childrenComponentJson[refName]){
                this.childrenComponentJson[refName].eventPublish();
            }
        },
        resizeHandle() {
            let _this = this;
            setTimeout(function(){
                _this.$children.forEach(item => {
                    item.eventPublish();
                })
            },0)
        }
    },
    created(){
        let _this = this;
        window.addEventListener('resize',_this.resizeHandle)
    },
    mounted (){
        this.$children.forEach(item => {
            this.childrenComponentJson[item.ref] = item;
        })
    },
    beforeDestroy(){
        let _this = this;
        window.removeEventListener('resize',_this.resizeHandle)
    }
}
</script>

<style>
.tticar-panel-content {
    flex: 1;
    height: 100%;
    width: 100%;
}

.tticar-panel-content .tticar-panel-row ,.tticar-panel-content .tticar-panel-col {
    position: relative;
    display: flex;
    box-sizing: border-box;
}

.tticar-panel-content .handle{
    position: absolute;
    display: block;
    background: #eee;
    z-index: 100;
}

.tticar-panel-content .handle.handle-row {
    height: 6px;
    top: 2px;
    left: 0;
    right: 0;
    cursor:ns-resize;
}

.tticar-panel-content .handle.handle-col {
    width: 6px;
    height: 100%;
    left: -3px;
    bottom: 0;
    cursor:ew-resize;
}

.tticar-panel-content .handle::after {
    display: block;
    position: absolute;
    content: '';
    border: 1px dashed #ddd;
    box-sizing: border-box;
}
.tticar-panel-content .handle.handle-row::after {
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    margin-top: -1px;
}

.tticar-panel-content .handle.handle-col::after {
    width: 2px;
    height: 100%;
    left: 50%;
    top: 0;
    margin-left: -1px;
}
</style>




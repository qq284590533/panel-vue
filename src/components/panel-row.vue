<template>
    <div :ref="refName" class="tticar-panel-row" :data-ref='refName' :style="styleObj">
        <slot></slot>
        <span ref="handle" class="handle handle-row" v-show="isElderBrother" :style="{left:gutter/2+'px',right:gutter/2+'px'}"></span>
    </div>
</template>

<script>
export default {
    data(){
        return {
            styleObj:{
                height:"100%"
            },
            isElderBrother:false,
            el:null,
            parentEl:null,
            previousEl: null,
            _height: null,
            parentELHeight:null,
            previousElHeight:null,
            startY:null,
            refName:null,
            handleClass:''
        }
    },
    props: {
        // 高度百分比
        height:{
            type: Number,
            default: 100
        },

        // 单元格panel-col间距
        gutter:{
            type: Number,
            default: 0
        },

        // 子元素高度
        value: {
            type: Number,
        }
    },
    methods: {
        getHeight(el){
            let height = window.getComputedStyle(el).height;
            return parseFloat(height.substring(0,height.length-2));
        },
        onMouseDown (e) {
            let _this = this;
            return function(e){
                _this.startY= e.y
                _this._height = _this.getHeight(_this.el);
                _this.parentELHeight = _this.getHeight(_this.parentEl);
                _this.previousElHeight = _this.getHeight(_this.previousEl);
                document.addEventListener('mousemove',_this.onMouseMove(event))
                document.addEventListener('mouseup',_this.onMouseUp(event))
            }
        },
        onMouseMove (e) {
            return this.mouseMoveHandle
        },
        onMouseUp (e) {
            return this.mouseUpHandle
        },
        mouseMoveHandle(e){
            let distance = this.startY-e.y;
            let height = this._height+distance;
            let previousElHeight = this.previousElHeight-distance;
            let percentHeight= height/this.parentELHeight*100+'%'
            let percentpreviousElHeight = previousElHeight/this.parentELHeight*100+'%'
            this.styleObj.height = percentHeight;
            this.previousEl.style.height = percentpreviousElHeight;
            this.emitFun()
            // 触发实践修改高度，使用 value.sync 传递参数
            if(this.previousEl){
                height = height-10;
            }
            this.$emit('update:value',height)

        },
        mouseUpHandle(e){
            let _this = this;
            document.removeEventListener('mousemove',this.mouseMoveHandle)
            document.removeEventListener('mouseup',this.mouseUpHandle)
        },

        // 传refName给父元素通过父元素找到对应的兄弟元素并执行兄弟元素的eventPublish方法
        emitFun(){
            let refName = this.previousEl.getAttribute('data-ref');
            this.$parent.rowResize(refName)
        },

        // 触发数据更新事件方法
        eventPublish(){
            let height = this.getHeight(this.el);
            if(this.previousEl){
                height = height-10;
            }
            this.$emit('update:value',height)
        }
    },
    created() {
        let _this = this;
        this.refName = 'panelRow_'+this._uid;
    },
    mounted() {
        let _this = this;
        this.ref = 'panelRow_'+this._uid;
        this.el = this.$refs[this.refName];
        this.styleObj.height = this.height+'%'
        this.parentEl = this.el.parentNode;
        this.previousEl = this.el.previousElementSibling;
        console.log(this.previousEl)
        if(this.previousEl){
            this.isElderBrother = true;
            this.styleObj.paddingTop = '10px'
            this.$nextTick(() => {
                this.eventPublish();
                this.emitFun();
            })
        }

        if (this.gutter) {
            let handle = this.$refs.handle;
            this.styleObj.marginLeft = this.styleObj.marginRight = `-${this.gutter / 2}px`;
        }
        // 添加鼠标点下事件监听
        this.$refs.handle.addEventListener('mousedown', _this.onMouseDown(event));
    },
}
</script>




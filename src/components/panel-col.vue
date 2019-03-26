<template>
    <div :ref="refName" class="tticar-panel-col" :data-ref='refName' :style="styleObj">
        <span ref="handle" class="handle handle-col" v-show="isElderBrother"></span>
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            styleObj:{
                width:"100%"
            },
            isElderBrother:false,
            el:null,
            parentEl:null,
            previousEl: null,
            width: null,
            parentELWidth:null,
            previousElWidth:null,
            startX:null,
            refName: null
        }
    },
    props: {
        span:{
            type: Number,
            default: 24
        }
    },
    computed: {
        gutter() {
            let parent = this.$parent;
            return parent ? parent.gutter : 0;
        },
    },
    methods: {
        getWidth(el){
            let width = window.getComputedStyle(el).width
            return parseFloat(width.substring(0,width.length-2));
        },
        onMouseDown (e) {
            let _this = this;
            return function(e){
                _this.startX = e.x
                _this.width = _this.getWidth(_this.el);
                _this.parentELWidth = _this.getWidth(_this.parentEl);
                _this.previousElWidth = _this.getWidth(_this.previousEl);
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
            let distance = this.startX-e.x;
            let percentWidth = (this.width+distance)/this.parentELWidth*100+'%'
            let percentpreviousElWidth = (this.previousElWidth-distance)/this.parentELWidth*100+'%'
            this.styleObj.width = percentWidth;
            this.previousEl.style.width = percentpreviousElWidth;
        },
        mouseUpHandle(e){
            let _this = this;
            document.removeEventListener('mousemove',this.mouseMoveHandle)
            document.removeEventListener('mouseup',this.mouseUpHandle)
        },
    },
    created() {
        this.refName = 'panelCol_'+this._uid;
    },
    mounted() {
        let _this = this;
        this.el = this.$refs[this.refName];
        this.styleObj.width = this.span/24*100+'%'
        this.parentEl = this.el.parentNode;
        this.previousEl = this.el.previousElementSibling;
        if(this.previousEl){
            this.isElderBrother = true;
        }
        this.$refs.handle.addEventListener('mousedown', _this.onMouseDown(event));
        if (this.gutter) {
            this.styleObj.paddingLeft = this.styleObj.paddingRight = this.gutter / 2 + 'px';
        }

    }

}
</script>




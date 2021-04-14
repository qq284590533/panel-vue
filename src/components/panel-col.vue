<template>
	<div :ref="refName" class="panel-col" :data-ref="refName" :style="styleObj">
		<span ref="handle" class="handle handle-col" v-show="isElderBrother"></span>
		<slot></slot>
	</div>
</template>

<script>
export default {
	data() {
		return {
			styleObj: {
				width: '100%',
			},
			isElderBrother: false,
			el: null,
			parentEl: null,
			previousEl: null,
			width: null,
			parentELWidth: null,
			previousElWidth: null,
			startX: null,
			refName: null,
		}
	},
	props: {
		span: {
			type: Number,
			default: 24,
		},
	},
	computed: {
		gutter() {
			let parent = this.$parent
			return parent ? parent.gutter : 0
		},
	},
	methods: {
		getWidth(el) {
			let width = window.getComputedStyle(el).width
			return parseFloat(width.substring(0, width.length - 2))
		},
		onMouseDown(e) {
			return e => {
        document.body.style.userSelect = 'none'
				this.startX = e.x
				this.width = this.getWidth(this.el)
				this.parentELWidth = this.getWidth(this.parentEl)
				this.previousElWidth = this.getWidth(this.previousEl)
				document.addEventListener('mousemove', this.onMouseMove())
				document.addEventListener('mouseup', this.onMouseUp())
			}
		},
		onMouseMove(e) {
			return this.mouseMoveHandle
		},
		onMouseUp(e) {
			return this.mouseUpHandle
		},
		mouseMoveHandle(e) {
			let distance = this.startX - e.x
      let diffWidth = this.width + distance
      let previousDiffWidth = this.previousElWidth - distance
      if(diffWidth>=this.previousElWidth + this.width) {
        diffWidth = this.previousElWidth + this.width
        previousDiffWidth = 0
      }

      if(previousDiffWidth >=this.previousElWidth + this.width) {
        previousDiffWidth = this.width + this.previousElWidth
        diffWidth = 0
      }

      if(diffWidth <= 0) {
        this.previousDiffWidth = this.previousElWidth + this.width
        diffWidth = 0
      }

			let percentWidth = (diffWidth / this.parentELWidth) * 100 + '%'
			let percentpreviousElWidth = (previousDiffWidth / this.parentELWidth) * 100 + '%'
			this.styleObj.width = percentWidth
			this.previousEl.style.width = percentpreviousElWidth
		},
		mouseUpHandle(e) {
      document.body.style.userSelect = 'initial'
			document.removeEventListener('mousemove', this.mouseMoveHandle)
			document.removeEventListener('mouseup', this.mouseUpHandle)
		},
	},
	created() {
		this.refName = 'panelCol_' + this._uid
	},
	mounted() {
		let _this = this
		this.el = this.$refs[this.refName]
		this.styleObj.width = (this.span / 24) * 100 + '%'
		this.parentEl = this.el.parentNode
		this.previousEl = this.el.previousElementSibling
		if (this.previousEl) {
			this.isElderBrother = true
		}
		this.$refs.handle.addEventListener('mousedown', _this.onMouseDown())
		if (this.gutter) {
			this.styleObj.paddingLeft = this.styleObj.paddingRight = this.gutter / 2 + 'px'
		}
	},
}
</script>

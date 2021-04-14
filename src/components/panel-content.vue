<template>
	<div ref="panelContent" class="panel-content">
		<slot></slot>
	</div>
</template>

<script>
export default {
	data() {
		return {
			childrenComponentJson: {},
		}
	},
	props: {},
	methods: {
		rowResize(refName) {
			if (this.childrenComponentJson[refName]) {
				this.childrenComponentJson[refName].eventPublish()
			}
		},
		resizeHandle() {
			setTimeout(() => {
				this.$children.forEach((item) => {
					item.eventPublish()
				})
			}, 0)
		},
	},
	created() {
		window.addEventListener('resize', this.resizeHandle)
	},
	mounted() {
		this.$children.forEach(item => {
			this.childrenComponentJson[item.ref] = item
		})
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeHandle)
	},
}
</script>

<style>
.panel-content {
	flex: 1;
	height: 100%;
	width: 100%;
}

.panel-content .panel-row,
.panel-content .panel-col {
	position: relative;
	display: flex;
	box-sizing: border-box;
}

.panel-content .handle {
	position: absolute;
	display: block;
	background: #eee;
	z-index: 100;
}

.panel-content .handle.handle-row {
	height: 2px;
	top: -1px;
	left: 0;
	right: 0;
	cursor: ns-resize;
  background: #000;
}

.panel-content .handle.handle-col {
	width: 2px;
	height: 100%;
	left: -1px;
	bottom: 0;
	cursor: ew-resize;
  background: #000;
}

.panel-content .handle::after {
	display: block;
	position: absolute;
	content: '';
	box-sizing: border-box;
}
.panel-content .handle.handle-row::after {
	width: 100%;
	height: 2px;
	top: 50%;
	left: 0;
	margin-top: -1px;
}

.panel-content .handle.handle-col::after {
	width: 2px;
	height: 100%;
	left: 50%;
	top: 0;
	margin-left: -1px;
}
</style>

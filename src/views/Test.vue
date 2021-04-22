<template>
	<div>
		<div class="body">
			<div class="aside" v-show="showAside"></div>
			<panel-content>
				<panel-row :height="40">
					<panel-col :span="7">
						<div class="col col_1">测试col1</div>
					</panel-col>
					<panel-col :span="8">
						<div class="col col_2">测试col2</div>
					</panel-col>
					<panel-col :span="9">
						<div class="col col_3">测试col3</div>
					</panel-col>
				</panel-row>
				<panel-row :height="60">
					<panel-col :span="10">
						<div class="col col_4">测试col4</div>
					</panel-col>
					<panel-col :span="14">
						<div class="col col_5">测试col5</div>
					</panel-col>
				</panel-row>
			</panel-content>
		</div>
		<button @click="showAside = !showAside">按钮</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showAside: false,
		}
	},
}
</script>
<style scoped>
.body {
	display: flex;
	width: 100%;
	height: 500px;
	/* background: red; */
}
.aside {
	width: 300px;
	height: 100%;
	background: blue;
}

.col {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
  overflow: hidden;
}
.col_1 {
	background: #f44336;
}
.col_2 {
	background: #009688;
}
.col_3 {
	background: #795548;
}
.col_4 {
	background: #3f51b5;
}
.col_5 {
	background: #ff9800;
}
</style>

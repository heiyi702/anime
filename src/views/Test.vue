<template>
	<div>
		<div style="font-size: 66px" v-html="h2"></div>
		<Button @click="getApi('11.docx')">get api 1.docx</Button>
		<Button @click="downFn('11.docx')">down api 1.docx</Button>
		<hr>
		<Button @click="testVueWord('11.docx')">vue 11.doc</Button>


		<div ref="word" class="docWrap"></div>
	</div>
</template>

<script>
import testApi from "@/api/test";
var docxx = require("docx-preview");
import { defaultOptions, renderAsync } from "docx-preview";

export default {
	filters: {},
	data() {
		return {
			h2: "<h2>aaaaaaa</h2>",
			txt: "",
			f: "",
		};
	},
	mounted() {},
	methods: {
		back() {
			this.$router.go(-1);
		},
		async downFn(name) {
			let res = await testApi.downFile({
				name,
			});
			const blob = new Blob([res.data]); // 把得到的结果用流对象转一下
			var a = document.createElement("a"); //创建一个<a></a>标签
			a.href = URL.createObjectURL(blob); // 将流文件写入a标签的href属性值
			a.download = "出师表.docx"; //设置文件名
			a.style.display = "none"; // 障眼法藏起来a标签
			document.body.appendChild(a); // 将a标签追加到文档对象中
			a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
			a.remove(); // 一次性的，用完就删除a标签
		},
		async getApi(name) {
			let res = await testApi.downFile({
				name,
			});
			// renderAsync(Blob | ArrayBuffer | Uint8Array, this.$refs.word, null, {
			renderAsync(new Blob([res.data]), this.$refs.word);
		},
		// async getApi(name){
		// 	// let res = await testApi.downFile({
		// 	// 	name
		// 	// })
		// 	// console.log(res.data.data);
		// 	// docxx.renderAsync(res, this.$refs.word);
		// 	testApi.downFile({name}).then(res=>{
		// 		docxx.renderAsync(res.data.data, this.$refs.word);
		// 	})
		// },
		// createpsbgDoc() {
		//   createpsbgDoc()//调接口
		//     .then((res) => {
		//       docxx.renderAsync(res.data.data, this.$refs.word);
		//     })
		//     .catch((error) => {
		//       this.$message({
		//         type: "error",
		//         message: error,
		//       });
		//     });
		// },
	},
};
</script>

<style lang="less" scoped>
.docWrap {
	margin: 10px auto;
	width: 80%;
	height: 500px;
	border: 2px solid #333;
	overflow: auto;
}
</style>
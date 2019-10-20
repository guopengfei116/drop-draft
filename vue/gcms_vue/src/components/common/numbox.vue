<template>
	
	<!-- 数字输入框 => Mui中的数字输入框 -->
	<div class="mui-numbox">
		<button class="mui-btn mui-btn-numbox-minus" type="button" @click="subtract">-</button>
		<input  class="mui-input-numbox" type="number" v-model="fixedNumbers" ref="numInput">
		<button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
	</div>
	
</template>

<script>
	export default {
		
		data() {
			return {
				numbers: 0
			};
		},
		
		props: ['initNum'],
		
		created() {
			this.numbers = this.initNum || 0;
		},
		
		methods: {
			
			// 减值操作，完成后发出消息通知
			subtract() {
				if(this.numbers > 0) {
					this.numbers--;
					this.$emit('change', this.numbers);
				}
			},
			
			// 增值操作，完成后发出消息通知
			add() {
				this.numbers++;
				this.$emit('change', this.numbers);
			},
		},
		
		computed: {
			
			// 用于代理numbers属性的输出与赋值
			fixedNumbers: {
				
				// 获取number的值
				get() {
					return this.numbers;
				},
				
				// 用于限制numbers的赋值，成功后发出消息通知
				set(newValue) {
					var num = parseInt(newValue);
					
					/**
					 * 结果不是NaN即转换成功,
					 * 正常情况下转换成功即可重新给numbers属性赋值,
					 * 但是vue目前有个bug，即键盘输入字母e时，这里收到的值为''，
					 * 会造成赋值0的问题，所以多个newValue值的判断。
					 * */
					if(!isNaN(num) && newValue) {
						this.numbers = num;
						this.$emit('change', this.numbers);
					}
					
					// 刷新表单中的值
					this.$refs.numInput.value = this.numbers;
				}
				
			}
		}
		
	};
</script>

<style>
	
	.mui-numbox {
		width: 120px;
	}
	
</style>
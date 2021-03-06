<template>
	<div>
		<el-row :gutter="15" class="system_state">
			<el-col :span="12">
				<el-card v-if="state.os" class="card_item">
					<div slot="header">Runtime</div>
					<div>
						<el-row :gutter="10">
							<el-col :span="12">os:</el-col>
							<el-col :span="12" v-text="state.os.goos"/>
						</el-row>
						<el-row :gutter="10">
							<el-col :span="12">cpu nums:</el-col>
							<el-col :span="12" v-text="state.os.numCpu"/>
						</el-row>
						<el-row :gutter="10">
							<el-col :span="12">compiler:</el-col>
							<el-col :span="12" v-text="state.os.compiler"/>
						</el-row>
						<el-row :gutter="10">
							<el-col :span="12">go version:</el-col>
							<el-col :span="12" v-text="state.os.goVersion"/>
						</el-row>
						<el-row :gutter="10">
							<el-col :span="12">goroutine nums:</el-col>
							<el-col :span="12" v-text="state.os.numGoroutine"/>
						</el-row>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card v-if="state.disk" class="card_item">
					<div slot="header">Disk</div>
					<div>
						<el-row :gutter="10">
							<el-col :span="12">
								<el-row :gutter="10">
									<el-col :span="12">total (MB)</el-col>
									<el-col :span="12" v-text="state.disk.totalMb"/>
								</el-row>
								<el-row :gutter="10">
									<el-col :span="12">used (MB)</el-col>
									<el-col :span="12" v-text="state.disk.usedMb"/>
								</el-row>
								<el-row :gutter="10">
									<el-col :span="12">total (GB)</el-col>
									<el-col :span="12" v-text="state.disk.totalGb"/>
								</el-row>
								<el-row :gutter="10">
									<el-col :span="12">used (GB)</el-col>
									<el-col :span="12" v-text="state.disk.usedGb"/>
								</el-row>
							</el-col>
							<el-col :span="12">
								<el-progress
									type="dashboard"
									:percentage="state.disk.usedPercent"
									:color="colors"
								/>
							</el-col>
						</el-row>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="15" class="system_state">
			<el-col :span="12">
				<el-card
					v-if="state.cpu"
					class="card_item"
					:body-style="{ height: '180px', 'overflow-y': 'scroll' }"
				>
					<div slot="header">CPU</div>
					<div>
						<el-row :gutter="10">
							<el-col :span="12">physical number of cores:</el-col>
							<el-col :span="12" v-text="state.cpu.cores"/>
						</el-row>
							<el-row v-for="(item, index) in state.cpu.cpus" :key="index" :gutter="10">
								<el-col :span="12">core {{ index }}:</el-col>
								<el-col
									:span="12"
								>
									<el-progress
										type="line"
										:percentage="+item.toFixed(0)"
										:color="colors"
									/>
								</el-col>
							</el-row>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card v-if="state.ram" class="card_item">
					<div slot="header">Ram</div>
					<div>
						<el-row :gutter="10">
							<el-col :span="12">
								<el-row :gutter="10">
									<el-col :span="12">total (MB)</el-col>
									<el-col :span="12" v-text="state.ram.totalMb"/>
								</el-row>
								<el-row :gutter="10">
									<el-col :span="12">used (MB)</el-col>
									<el-col :span="12" v-text="state.ram.usedMb"/>
								</el-row>
								<el-row :gutter="10">
									<el-col :span="12">total (GB)</el-col>
									<el-col :span="12" v-text="state.ram.totalMb / 1024"/>
								</el-row>
								<el-row :gutter="10">
									<el-col :span="12">used (GB)</el-col>
									<el-col
										:span="12"
										v-text="(state.ram.usedMb / 1024).toFixed(2)"
									/>
								</el-row>
							</el-col>
							<el-col :span="12">
								<el-progress
									type="dashboard"
									:percentage="state.ram.usedPercent"
									:color="colors"
								/>
							</el-col>
						</el-row>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import {defineComponent, inject, ref, onBeforeUnmount } from "vue";

export default defineComponent({
	name: "sys-stat",

	setup() {
		const service = inject<any>("service");
		let timer: NodeJS.Timeout;
		let state = ref({})
		let colors = [
			{color: '#5cb87a', percentage: 20},
			{color: '#e6a23c', percentage: 40},
			{color: '#f56c6c', percentage: 80}
		];

		function reload() {
			service.system.stat.data().then((data: any) => {
				state.value = data
			})
		}
		reload()
		timer = setInterval(() => {
			reload()
		}, 1000 * 10)

		onBeforeUnmount(() => {
			clearInterval(timer)
		})

		return {
			timer,
			state,
			colors,
		};
	}
});
</script>
<style scoped>
.system_state {
	padding: 10px;
}
.card_item {
	height: 250px;
}
.card_item .el-row {
	padding: 3px 0 3px 0;
}
</style>

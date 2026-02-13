<script lang="ts">
	import { rooms, calculateRoles, validateAge, type CalculationResult } from '$lib/calculator';

	let selectedRoom = $state<number | null>(null);
	let currentAge = $state<number | null>(null);
	let result = $state<CalculationResult | null>(null);
	let error = $state<string | null>(null);

	function handleCalculate() {
		error = null;
		result = null;

		// 部屋番号の検証
		if (!selectedRoom) {
			error = '部屋番号を選択してください';
			return;
		}

		// 年齢の検証
		if (!currentAge) {
			error = '年齢を入力してください';
			return;
		}

		const ageValidation = validateAge(currentAge);
		if (!ageValidation.valid) {
			error = ageValidation.error || '年齢が不正です';
			return;
		}

		// 計算実行
		try {
			result = calculateRoles(selectedRoom, currentAge);
		} catch (e) {
			error = e instanceof Error ? e.message : '計算中にエラーが発生しました';
		}
	}

	function handleReset() {
		selectedRoom = null;
		currentAge = null;
		result = null;
		error = null;
	}
</script>

<svelte:head>
	<title>マンション管理組合 役職計算アプリ</title>
	<meta name="description" content="理事長・会計の役職がいつ回ってくるかを計算します" />
</svelte:head>

<div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
	<div class="max-w-2xl mx-auto">
		<!-- ヘッダー -->
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-2">
				マンション管理組合<br class="sm:hidden" />役職計算アプリ
			</h1>
			<p class="text-gray-600">
				理事長・会計の役職がいつ回ってくるかを計算します
			</p>
		</div>

		<!-- 現在の役職情報 -->
		<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
			<h2 class="text-lg font-semibold text-blue-900 mb-2">現在の役職</h2>
			<div class="grid grid-cols-2 gap-4 text-sm">
				<div>
					<span class="text-blue-700 font-medium">理事長:</span>
					<span class="text-blue-900 ml-2">201号室</span>
				</div>
				<div>
					<span class="text-blue-700 font-medium">会計:</span>
					<span class="text-blue-900 ml-2">303号室</span>
				</div>
			</div>
		</div>

		<!-- 入力フォーム -->
		<div class="bg-white shadow-md rounded-lg p-6 mb-6">
			<div class="space-y-6">
				<!-- 部屋番号選択 -->
				<div>
					<label for="room-select" class="block text-sm font-medium text-gray-700 mb-2">
						あなたの部屋番号
					</label>
					<select
						id="room-select"
						bind:value={selectedRoom}
						class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
					>
						<option value={null}>選択してください</option>
						{#each rooms as room}
							<option value={room}>{room}号室</option>
						{/each}
					</select>
				</div>

				<!-- 年齢入力 -->
				<div>
					<label for="age-input" class="block text-sm font-medium text-gray-700 mb-2">
						現在の年齢
					</label>
					<input
						id="age-input"
						type="number"
						bind:value={currentAge}
						min="1"
						max="150"
						placeholder="例: 45"
						class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
					/>
				</div>

				<!-- ボタン -->
				<div class="flex gap-3">
					<button
						onclick={handleCalculate}
						class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
					>
						計算する
					</button>
					<button
						onclick={handleReset}
						class="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
					>
						リセット
					</button>
				</div>
			</div>
		</div>

		<!-- エラーメッセージ -->
		{#if error}
			<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
				<div class="flex items-start">
					<svg
						class="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						/>
					</svg>
					<p class="text-sm text-red-800">{error}</p>
				</div>
			</div>
		{/if}

		<!-- 計算結果 -->
		{#if result}
			<div class="bg-white shadow-md rounded-lg p-6">
				<h2 class="text-xl font-bold text-gray-900 mb-6">計算結果</h2>

				<!-- 理事長 -->
				<div class="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
					<h3 class="text-lg font-semibold text-blue-900 mb-3 flex items-center">
						<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
							/>
						</svg>
						理事長
					</h3>
					<div class="space-y-2">
						{#if result.yearsUntilChairperson === 0}
							<p class="text-blue-900 text-lg font-medium">
								<span class="text-2xl font-bold">今年</span>が理事長の年です
							</p>
						{:else}
							<p class="text-blue-900">
								理事長になるまで:
								<span class="text-2xl font-bold ml-2">{result.yearsUntilChairperson}年後</span>
							</p>
							<p class="text-blue-900">
								その時の年齢:
								<span class="text-2xl font-bold ml-2">{result.ageAsChairperson}歳</span>
							</p>
						{/if}
					</div>
				</div>

				<!-- 会計 -->
				<div class="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
					<h3 class="text-lg font-semibold text-green-900 mb-3 flex items-center">
						<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
							/>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
								clip-rule="evenodd"
							/>
						</svg>
						会計
					</h3>
					<div class="space-y-2">
						{#if result.yearsUntilAccountant === 0}
							<p class="text-green-900 text-lg font-medium">
								<span class="text-2xl font-bold">今年</span>が会計の年です
							</p>
						{:else}
							<p class="text-green-900">
								会計になるまで:
								<span class="text-2xl font-bold ml-2">{result.yearsUntilAccountant}年後</span>
							</p>
							<p class="text-green-900">
								その時の年齢:
								<span class="text-2xl font-bold ml-2">{result.ageAsAccountant}歳</span>
							</p>
						{/if}
					</div>
				</div>
			</div>
		{/if}

		<!-- フッター -->
		<div class="mt-8 text-center text-sm text-gray-500">
			<p>役職は毎年、部屋番号順に交代します</p>
		</div>
	</div>
</div>

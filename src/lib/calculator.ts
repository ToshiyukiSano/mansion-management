/**
 * マンション管理組合の部屋リスト（部屋番号順）
 */
export const rooms = [
	101, 102, 103, 104, 105, 106, // 1階
	201, 202, 203, 204, 205, 206, // 2階
	301, 302, 303, 304, 305, 306, // 3階
	401, 402, 403, 405, 407,      // 4階（404, 406は欠番）
	501, 502                      // 5階
];

/**
 * 現在の役職保持者
 */
export const currentChairperson = 201; // 理事長
export const currentAccountant = 303;  // 会計

/**
 * 計算結果の型定義
 */
export interface CalculationResult {
	roomNumber: number;
	currentAge: number;
	yearsUntilChairperson: number;
	ageAsChairperson: number;
	yearsUntilAccountant: number;
	ageAsAccountant: number;
	currentChairpersonRoom: number;
	currentAccountantRoom: number;
}

/**
 * 理事長・会計になる年数と年齢を計算する
 *
 * @param roomNumber - 対象の部屋番号
 * @param currentAge - 現在の年齢
 * @returns 計算結果
 */
export function calculateRoles(roomNumber: number, currentAge: number): CalculationResult {
	// 部屋番号のインデックスを取得
	const userRoomIndex = rooms.indexOf(roomNumber);
	const chairpersonIndex = rooms.indexOf(currentChairperson);
	const accountantIndex = rooms.indexOf(currentAccountant);

	if (userRoomIndex === -1) {
		throw new Error('無効な部屋番号です');
	}

	// 理事長までの年数を計算（循環を考慮）
	const yearsUntilChairperson = (userRoomIndex - chairpersonIndex + rooms.length) % rooms.length;

	// 会計までの年数を計算（逆順・理事長との兼務回避シミュレーション）
	let yearsUntilAccountant = -1;
	let acctPointer = accountantIndex;
	for (let year = 0; year < rooms.length * 4; year++) {
		const chairIdx = (chairpersonIndex + year) % rooms.length;
		if (acctPointer === chairIdx) {
			// 理事長と衝突 → 会計をスキップ
			acctPointer = (acctPointer - 1 + rooms.length) % rooms.length;
		}
		if (acctPointer === userRoomIndex) {
			yearsUntilAccountant = year;
			break;
		}
		acctPointer = (acctPointer - 1 + rooms.length) % rooms.length;
	}

	return {
		roomNumber,
		currentAge,
		yearsUntilChairperson,
		ageAsChairperson: currentAge + yearsUntilChairperson,
		yearsUntilAccountant,
		ageAsAccountant: currentAge + yearsUntilAccountant,
		currentChairpersonRoom: currentChairperson,
		currentAccountantRoom: currentAccountant
	};
}

/**
 * 年齢の入力値を検証する
 *
 * @param age - 検証する年齢
 * @returns 検証結果
 */
export function validateAge(age: number): { valid: boolean; error?: string } {
	if (!age || isNaN(age)) {
		return { valid: false, error: '年齢を入力してください' };
	}

	if (age < 1 || age > 150) {
		return { valid: false, error: '年齢は1〜150の範囲で入力してください' };
	}

	if (!Number.isInteger(age)) {
		return { valid: false, error: '年齢は整数で入力してください' };
	}

	return { valid: true };
}

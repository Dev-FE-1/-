const workTypeLabels: { [key: string]: string } = {
	cover: '대타근무',
	special: '특별근무',
	vacation: '휴가',
	early: '조퇴',
};

export const getWorkTypeLabel = (type: string) => {
	return workTypeLabels[type] || type;
};

const approvedStatusLabels: { [key: string]: string } = {
	pending: '대기',
	approved: '승인',
	rejected: '반려',
};

export const getApprovedStatusLabel = (type: string) => {
	return approvedStatusLabels[type] || type;
};

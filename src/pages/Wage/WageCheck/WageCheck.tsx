import ControlMonth from '@/components/Wage/ControlMonth';
import SalaryCard from '@/components/Wage/SalaryCard';
import WorkHistory from '@/components/Wage/WorkHistory';

const WageCheck = () => {
	return (
		<>
			<ControlMonth />
			<SalaryCard
				title="개인근무 일정표에 따른 예상 급여액"
				wagecount={925440}
				workinghours={96}
			/>
			<SalaryCard
				title="공식 근무 스케줄에 따른 예상 급여액"
				wagecount={1025440}
				workinghours={104}
			/>
			<WorkHistory />
		</>
	);
};

export default WageCheck;

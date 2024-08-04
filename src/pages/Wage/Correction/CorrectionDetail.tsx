import { useParams } from 'react-router-dom';

const CorrectionDetail = () => {
	const { id: correctionId } = useParams<{ id: string }>();

	return <>Correction Detail Page for ID: {correctionId}</>;
};

export default CorrectionDetail;

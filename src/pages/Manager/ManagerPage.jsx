import { useNavigate } from 'react-router-dom';

const ManagerPage = () => {
    const navigate = useNavigate();

    const handleSeePostedJob = () => {
        // Logic for seeing posted jobs can be added here
        console.log('See Posted Job');
        navigate('/see-posted-job'); // Example navigation to a see posted job page
    };

    const handleSeeHistory = () => {
        // Logic for seeing history can be added here
        console.log('See History');
        navigate('/see-history'); // Example navigation to a history page
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-6">Welcome Manager</h1>
                <button
                    onClick={handleSeePostedJob}
                    className="w-full bg-blue-500 text-white p-2 rounded mb-4"
                >
                    See Posted Job
                </button>
                <button
                    onClick={handleSeeHistory}
                    className="w-full bg-green-500 text-white p-2 rounded"
                >
                    See History
                </button>
            </div>
        </div>
    );
};

export default ManagerPage;

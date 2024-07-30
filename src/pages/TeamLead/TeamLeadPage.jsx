import { useNavigate } from 'react-router-dom';

const TeamLeadPage = () => {
    const navigate = useNavigate();

    const handlePostJob = () => {
        // Logic for posting a job can be added here
        console.log('Post a Job');
        navigate('/post-job'); // Example navigation to a post job page
    };

    const handlePostedStatus = () => {
        // Logic for seeing status can be added here
        console.log('See Status');
        navigate('/posted-status'); // Example navigation to a status page
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-6">Welcome Team Lead</h1>
                <button
                    onClick={handlePostJob}
                    className="w-full bg-blue-500 text-white p-2 rounded mb-4"
                >
                    Post a Job
                </button>
                <button
                    onClick={handlePostedStatus}
                    className="w-full bg-green-500 text-white p-2 rounded"
                >
                    See Status
                </button>
            </div>
        </div>
    );
};

export default TeamLeadPage;

import { useNavigate } from 'react-router-dom';

const TeamLeadPage = () => {
    const navigate = useNavigate();

    const handlePostJob = () => {
        console.log('Post a Job');
        navigate('/post-job');
    };

    const handlePostedStatus = () => {
        console.log('See Status');
        navigate('/posted-status');
    };

    return (
        <section className="bg-white">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl">Welcome, Team Lead.</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">How are you doing? You can post a job or see the status of the job you posted previously.</p>
                    <button
                        onClick={handlePostJob}
                        className="mr-10 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-palette-700 hover:bg-cyan-800 focus:ring-4 focus:ring-primary-300"
                    >
                        Post a Job
                    </button>
                    <button
                        onClick={handlePostedStatus}
                        className="mr-10 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border bg-palette-700 hover:bg-cyan-800 border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-100"
                    >
                        See Status
                    </button>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img src="src/assets/TeamLeadpage.png" alt="TeamLead illustration" className="max-w-sm max-h-sm" />
                </div>
            </div>
        </section>
    );
};

export default TeamLeadPage;

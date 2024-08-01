import { useNavigate } from 'react-router-dom';

const ManagerPage = () => {
    const navigate = useNavigate();

    const handleSeePostedJob = () => {
        console.log('See Posted Job');
        navigate('/see-posted-job'); // Example navigation to a see posted job page
    };

    const handleSeeHistory = () => {
        console.log('See History');
        navigate('/see-history'); // Example navigation to a history page
    };

    return (
        <section className="bg-white">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl">Welcome, Manager.</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">You can see posted jobs or view your history from here.</p>
                    <button
                        onClick={handleSeePostedJob}
                        className="mr-10 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-cyan-800 focus:ring-4 focus:ring-primary-300"
                    >
                        See Posted Job
                    </button>
                    <button
                        onClick={handleSeeHistory}
                        className="mr-10 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border bg-primary-700 hover:bg-cyan-800 border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-100"
                    >
                        See History
                    </button>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img src="src/assets/Managerpage.png" alt="Manager illustration" className="max-w-sm max-h-sm" />
                </div>
            </div>
        </section>
    );
};

export default ManagerPage;

// Table.jsx
const Table = ({ data, handleAccept, handleReject }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">#</th>
                        <th scope="col" className="px-6 py-3">Job Title</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">Location</th>
                        <th scope="col" className="px-6 py-3">Deadline</th>
                        <th scope="col" className="px-6 py-3">Requirements</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((job, index) => (
                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {index + 1}
                            </th>
                            <td className="px-6 py-4">{job.title}</td>
                            <td className="px-6 py-4 break-words max-w-xs">{job.description}</td>
                            <td className="px-6 py-4">{job.location}</td>
                            <td className="px-6 py-4">{job.deadline}</td>
                            <td className="px-6 py-4 break-words max-w-xs">{job.requirements}</td>
                            <td className="px-6 py-4">
                                <div className="flex mt-4">
                                    <button
                                        onClick={() => handleAccept(index)}
                                        className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-3 py-1 mr-4"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(index)}
                                        className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-3 py-1"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

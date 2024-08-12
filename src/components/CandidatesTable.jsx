import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const CandidatesTable = ({ searchTerm, filterStatus = 'Accepted' }) => {
  const [data, setData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [stage, setStage] = useState('UnderReview');
  const [testRating, setTestRating] = useState('');
  const [interviewRating, setInterviewRating] = useState('');
  const [isTestRatingSaved, setIsTestRatingSaved] = useState(false);

  useEffect(() => {
    fetchData();
  }, [filterStatus]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/applicants');
      // Add totalScore field to each candidate
      const updatedData = response.data.map(candidate => ({
        ...candidate,
        totalScore: (candidate.testRating || 0) + (candidate.interviewRating || 0),
      }));
      setData(updatedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStageChange = (e) => {
    const newStage = e.target.value;
    setStage(newStage);
    if (newStage === 'Interview' && !isTestRatingSaved) {
      alert('Please enter and save a Test rating before selecting Interview stage.');
      return;
    }
  };

  const handleSave = async () => {
    if (stage === 'Interview' && !isTestRatingSaved) {
      alert('Test rating is required before saving Interview rating.');
      return;
    }

    // Calculate totalScore based on ratings
    const calculatedTotalScore = Number(testRating) + Number(interviewRating);

    // Update candidate data with the new stage and scores
    const updatedCandidate = { 
      ...selectedCandidate, 
      stage, 
      testRating: Number(testRating), 
      interviewRating: Number(interviewRating), 
      totalScore: calculatedTotalScore 
    };
    try {
      await axios.put(`http://localhost:5000/applicants/${selectedCandidate.id}`, updatedCandidate);
      // Update the local data state with the new candidate data
      setData(data.map(item => item.id === selectedCandidate.id ? updatedCandidate : item));
      closeModal();
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  const handlePass = async (candidateId) => {
    try {
      const updatedCandidate = { ...data.find(cand => cand.id === candidateId), candidateStatus: 'Passed' };
      await axios.put(`http://localhost:5000/applicants/${candidateId}`, updatedCandidate);
      setData(data.map(item => item.id === candidateId ? updatedCandidate : item));
    } catch (error) {
      console.error('Error updating candidate status to Passed:', error);
    }
  };

  const handleFail = async (candidateId) => {
    try {
      const updatedCandidate = { ...data.find(cand => cand.id === candidateId), candidateStatus: 'Failed' };
      await axios.put(`http://localhost:5000/applicants/${candidateId}`, updatedCandidate);
      setData(data.map(item => item.id === candidateId ? updatedCandidate : item));
    } catch (error) {
      console.error('Error updating candidate status to Failed:', error);
    }
  };

  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
    setStage(candidate.stage || 'UnderReview');
    setTestRating(candidate.testRating || '');
    setInterviewRating(candidate.interviewRating || '');
    setIsTestRatingSaved(!!candidate.testRating);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCandidate(null);
    setStage('UnderReview');
    setTestRating('');
    setInterviewRating('');
    setIsTestRatingSaved(false);
  };

  const handleRatingChange = (setter) => (e) => {
    const value = e.target.value;
    // Ensure value is a number between 0 and 50
    if (value === '' || (Number(value) >= 0 && Number(value) <= 50)) {
      setter(value);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, sortable: false },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'jobPosition', headerName: 'Job Position', width: 200 },
    { field: 'dateApplied', headerName: 'Date Applied', width: 150 },
    {
      field: 'stage',
      headerName: 'Stage',
      width: 150,
      renderCell: (params) => (
        <span>{params.row.stage || 'Not Yet Assigned'}</span>
      ),
    },
    {
      field: 'testRating',
      headerName: 'Test Rating',
      width: 150,
      renderCell: (params) => (
        <span>{params.row.testRating || 'N/A'}</span>
      ),
    },
    {
      field: 'interviewRating',
      headerName: 'Interview Rating',
      width: 150,
      renderCell: (params) => (
        <span>{params.row.interviewRating || 'N/A'}</span>
      ),
    },
    {
      field: 'totalScore',
      headerName: 'Total Score',
      width: 150,
      renderCell: (params) => (
        <span>{params.row.totalScore || 'N/A'}</span>
      ),
    },
    {
      field: 'candidateStatus',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <span>{params.row.candidateStatus || 'Pending'}</span>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 350,
      renderCell: (params) => {
        const candidate = params.row;
        const showRejectButton =
          (candidate.stage === 'Test' && candidate.testRating < 25) ||
          (candidate.stage === 'Interview' && candidate.interviewRating < 25);

        return (
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
              onClick={() => openModal(candidate)}
            >
              View
            </button>
            <button
              className="px-3 py-1 text-sm font-semibold text-green-600 border border-green-600 rounded hover:bg-green-600 hover:text-white"
              onClick={() => handlePass(candidate.id)}
            >
              Pass
            </button>
            <button
              className="px-3 py-1 text-sm font-semibold text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
              onClick={() => handleFail(candidate.id)}
            >
              Fail
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="relative w-full h-[500px] bg-white border border-gray-200 rounded-lg shadow overflow-y-auto">
      <DataGrid
        rows={data.filter(item => item.status === filterStatus).filter(item =>
          `${item.firstName} ${item.lastName} ${item.jobPosition}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        pagination
        disableSelectionOnClick
        autoHeight={false}
      />

      {modalOpen && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-3xl relative">
            <h2 className="text-2xl font-bold mb-4">Candidate Details</h2>
            <div className="space-y-4">
              <p>
                <strong>First Name:</strong> {selectedCandidate.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedCandidate.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedCandidate.email}
              </p>
              <p>
                <strong>Job Position:</strong> {selectedCandidate.jobPosition}
              </p>
              <p>
                <strong>Date Applied:</strong>{' '}
                {new Date(selectedCandidate.dateApplied).toLocaleDateString()}
              </p>

              <div>
                <label><strong>Stage:</strong></label>
                <div className="flex flex-col">
                  <label>
                    <input
                      type="radio"
                      value="UnderReview"
                      checked={stage === 'UnderReview'}
                      onChange={handleStageChange}
                    />{' '}
                    UnderReview
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Test"
                      checked={stage === 'Test'}
                      onChange={handleStageChange}
                    />{' '}
                    Test
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Interview"
                      checked={stage === 'Interview'}
                      onChange={handleStageChange}
                    />{' '}
                    Interview
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label><strong>Test Rating:</strong></label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={testRating}
                    onChange={handleRatingChange(setTestRating)}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label><strong>Interview Rating:</strong></label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={interviewRating}
                    onChange={handleRatingChange(setInterviewRating)}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotesSection = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async () => {
    try {
      const response = await axios.post('http://localhost:5000/notes', { text: newNote });
      setNotes([...notes, response.data]);
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const updateNote = async (id, updatedText) => {
    try {
      await axios.put(`http://localhost:5000/notes/${id}`, { text: updatedText });
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="notes-section p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Notes</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note"
          className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addNote}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Note
        </button>
      </div>
      <ul>
        {notes.map(note => (
          <li
            key={note.id}
            className="flex justify-between items-center p-3 mb-2 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <input
              type="text"
              value={note.text}
              onChange={(e) => updateNote(note.id, e.target.value)}
              className="w-full border-none p-1 bg-transparent text-gray-700 focus:outline-none"
            />
            <button
              onClick={() => deleteNote(note.id)}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesSection;
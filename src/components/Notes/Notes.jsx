import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NotesList from '../NotesList/NotesList.jsx';
import NoteForm from '../NoteForm/NoteForm.jsx';
import IconButton from '../IconButton/IconButton.jsx';
import './Notes.css';
import updateIcon from '../../assets/update-icon.png';

const initialItem = { content: '' };
const initialState = {
  notes: [],
  currentItem: initialItem,
};

function Notes() {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    requestList();
  }, []);

  const handleChange = (change) => {
    setState((prev) => ({
      ...prev,
      currentItem: { ...prev.currentItem, ...change }
    }));
  }

  const requestList = async () => {
    const response = await fetch(process.env.REACT_APP_NOTES_URL);
    const items = await response.json();

    setState((prev) => ({
      ...prev,
      notes: items,
    }));
  }

  const handleSubmit = async () => {
    if (!state.currentItem.content.length) {
      return;
    }

    const submitNote = { id: 0, ...state.currentItem };

    setState((prev) => ({ ...prev, currentItem: initialItem }));

    const response = await fetch(process.env.REACT_APP_NOTES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(submitNote),
    });

    if (response.ok && (response.status >= 200 && response.status < 300)) {
      requestList();
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_NOTES_URL}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok && (response.status >= 200 && response.status < 300)) {
      requestList();
    }
  }

  return (
    <div className="notes">
      <h1 className="notes__header">Notes <IconButton icon={updateIcon} onClick={requestList} /></h1>
      <NotesList items={state.notes} onDelete={handleDelete} />
      <NoteForm item={state.currentItem} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  )
}

Notes.propTypes = {

};

export default Notes;

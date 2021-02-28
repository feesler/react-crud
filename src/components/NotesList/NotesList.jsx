import React from 'react';
import PropTypes from 'prop-types';
import './NotesList.css';
import Note from '../Note/Note.jsx';

function NotesList(props) {
  const { items, onDelete } = props;

  const handleDelete = (id) => {
    onDelete(id);
  }

  return (
    <div className="notes-list">
      {items.map((item) =>
        <Note key={item.id} {...item} onDelete={handleDelete} />
      )}
    </div>
  )
}

NotesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(Note.propTypes)).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NotesList;

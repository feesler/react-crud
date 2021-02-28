import React from 'react';
import PropTypes from 'prop-types';
import './Note.css';
import IconButton from '../IconButton/IconButton.jsx';
import deleteIcon from '../../assets/delete-icon.png';

function Note(props) {
  const { id, content, onDelete } = props;

  const handleClick = () => {
    onDelete(id);
  }

  return (
    <div className="note">
      <div className="note__content">{content}</div>
      <IconButton className="note__delete-btn" icon={deleteIcon} onClick={handleClick} />
    </div>
  )
}

Note.propTypes = {
  id: PropTypes.any.isRequired,
  content: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Note;

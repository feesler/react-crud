import React from 'react';
import PropTypes from 'prop-types';
import './NoteForm.css';
import IconButton from '../IconButton/IconButton.jsx';
import submitIcon from '../../assets/submit-icon.png';

function NoteForm(props) {
  const { item, onChange, onSubmit } = props;

  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="note-form__content-field">
        <label className="note-form__label" htmlFor="content-text">New Note</label>
        <textarea
          id="content-text"
          className="note-form__content-input"
          name="content"
          value={item.content}
          onChange={handleChange}
        />
        <IconButton className="note-form__submit-btn" icon={submitIcon} type="submit" />
      </div>
    </form>
  )
}

NoteForm.propTypes = {
  item: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NoteForm;

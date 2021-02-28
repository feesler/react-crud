import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.css';
import classNames from 'classnames';

function IconButton(props) {
  const { icon, className, ...remainProps } = props;

  const buttonStyle = {
    backgroundImage: `url(${icon})`,
  };

  return (
    <button className={classNames(['icon-btn', className])} style={buttonStyle} {...remainProps}>
      {props.children}
    </button>
  )
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default IconButton;

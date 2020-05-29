import React from 'react';
import PropTypes from 'prop-types';

const Favicon = ({ url }) => <img src={`chrome://favicon/${url}`} alt="favicon" />;

Favicon.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Favicon;

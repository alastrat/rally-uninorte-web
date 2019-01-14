import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://uninorte.edu.co" target="_blank" rel="noopener noreferrer">Uninorte</a> &copy; Bienestar Universitario.</span>
        <span className="ml-auto">Sponsored by <a href="http://pluriza.com" target="_blank" rel="noopener noreferrer">Pluriza</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;

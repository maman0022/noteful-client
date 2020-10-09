import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2 className='error-boundary'>An Error Occured during Rendering.</h2>
      )
    }
    return this.props.children;
  }
}
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import Question from './Question';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Articles: [],
    };
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     Articles: nextProps.articles,
  //   });
  // }
  render() {
    // console.log(this.props.articles);
    return (
      <div className='H-content'>
        <Question articles={ this.props.articles } />
      </div>
    );
  }
}

export default MyComponent;

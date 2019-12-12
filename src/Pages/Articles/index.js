import React, { useEffect } from 'react';
import {  withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { getArticles } from 'modules/articles/action';


import Question from 'component/Article/Question';

const  Articles  =  ({  articles, getDate }) => {
  useEffect(() => {
    getDate();
  }, []);

  return (
    <Question  articles={ articles } />
  );
};

Articles.propTypes = {
  articles: PropTypes.array,
  getDate: PropTypes.func,
  history: PropTypes.object,
  isLoading: PropTypes.bool,
};


const NewArticles = connect(
  state => ({
    isLoading: state.articles.loading,
    articles: state.articles.articles,
  }),
  dispatch => ({
    getDate: (payload, cb) => dispatch(getArticles.start(payload, cb)),
  }),
)(Articles);


export default withRouter(NewArticles);

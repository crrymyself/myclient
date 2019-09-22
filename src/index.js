import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import createBrowserHistory from 'history/createBrowserHistory';

import Routes from './routes';
import Reducers from './reducer';
import Sagas from './sagas';
import './index.css';

import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();

let middleware;
if (process.env.NODE_ENV === 'development') {
  middleware = compose(composeWithDevTools(applyMiddleware(sagaMiddleware)))
} else {
  middleware = applyMiddleware(sagaMiddleware);
}

const browserHistory = createBrowserHistory();
const store = createStore(Reducers, middleware);

sagaMiddleware.run(Sagas);

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Routes history={ browserHistory } />
      </Provider>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

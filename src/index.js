import React from 'react';
import ReactDOM from 'react-dom';
import {ReactRouter, Router} from 'react-router';
import history from './history';
import routes from './routes';

ReactDOM.render(<Router history={history} routes={routes}></Router>, document.getElementById('qingcheng'));

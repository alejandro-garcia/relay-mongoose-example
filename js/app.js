//import User from './components/User.js';
import Ranks from './components/RankList.js';
import AppHomeRoute from './routes/AppHomeRoute';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import React from 'react';

let userId = getQueryParams(document.location.search).user || "5874ac252827ff2f6b309f90";

ReactDOM.render(
  <Relay.RootContainer
    Component={Ranks}
    //TODO Update userId
    //route={new AppHomeRoute({userId: userId})}
    route={new AppHomeRoute()}
  />,
  document.getElementById('root')
);

function getQueryParams(qs) {
  qs = qs.split('+').join(' ');

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}
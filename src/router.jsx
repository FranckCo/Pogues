import React from 'react';
import { Router, hashHistory, Route, IndexRoute, Redirect } from 'react-router';

import App from 'layout/app';
import PageHome from 'home/page-home';
import PageHelp from 'help/page-help';
import PageQuestionnaire from 'questionnaire/page-questionnaire';

function RouterContainer() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PageHome} />
        <Route exact path="/help" component={PageHelp} />
        <Route exact path="/questionnaire/:id" component={PageQuestionnaire} />
        <Redirect from="*" to="/" />
      </Route>
    </Router>
  );
}

export default RouterContainer;

import React from 'react';
import {
  HashRouter, Route, Switch,
} from 'react-router-dom';
import Reviews from './Reviews';
import NewReview from './NewReview';

import '../style.css';

const App = () => {
  const [newReview, addNewReview] = React.useState(false);
  return (
    <HashRouter>
      <Switch>
        <Route path="/product/:prodId">
          <NewReview change={addNewReview} />
          <Reviews addedReview={newReview} />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default App;

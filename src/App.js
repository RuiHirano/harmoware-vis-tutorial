import React from 'react';
import Harmoware from './HarmowareVis'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { getCombinedReducer } from 'harmoware-vis';
import 'harmoware-vis/scss/harmoware.scss';
import './scss/visualize-sample.scss';

const store = createStore(getCombinedReducer());

function App() {
  return (
    <Provider store={store}>
      <Harmoware />
    </Provider>
  );
}

export default App;

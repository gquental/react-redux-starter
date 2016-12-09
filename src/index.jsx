import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './reducers/index'
import App from './components/app'

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)

// Are we in development mode?
if (module.hot) {
  // Whenever a new version of App.js is available
  module.hot.accept('./components/app', function () {
    // Require the new version and render it instead
    var NextApp = require('./components/app')
    ReactDOM.render(<NextApp />, rootEl)
  })
}

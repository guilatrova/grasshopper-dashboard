import '@babel/polyfill';
import React from 'react'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history';
import { CssBaseline } from '@material-ui/core'
import configureStore from './configureStore';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import App from './app'
import rootSaga from './app/rootSaga';

export const history = createBrowserHistory();

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const store = configureStore({}, history);

store.runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.dispose(function () {
    window.location.reload()
  })
}

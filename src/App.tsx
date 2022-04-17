import { Component } from 'react'
import './App.css'
import { ThemeProvider } from 'styled-components';
import { constants, ApolloContextProvider } from './_shared'
import Navigator from './Navigator'
import { Provider } from 'react-redux';
import { store } from './_shared/redux';

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <ApolloContextProvider>
            <ThemeProvider theme={constants.theme}>
              <Navigator />
            </ThemeProvider>
          </ApolloContextProvider>
        </Provider>
    )
  }
}

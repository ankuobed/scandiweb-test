import { Component } from 'react'
import './App.css'
import { ThemeProvider } from 'styled-components';
import { constants, StateProvider } from './_shared'
import Navigator from './Navigator'

export default class App extends Component {
  render() {
    return (
        <StateProvider>
          <ThemeProvider theme={constants.theme}>
            <Navigator />
          </ThemeProvider>
        </StateProvider>
    )
  }
}

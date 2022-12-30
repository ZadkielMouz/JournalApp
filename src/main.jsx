import React from 'react'
import ReactDOM from 'react-dom/client'

import { JournalApp } from './JournalApp'
import { Provider } from 'react-redux'
import { store } from './store'
import './styles.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <JournalApp />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)

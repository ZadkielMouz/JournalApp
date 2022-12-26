import React from 'react'
import ReactDOM from 'react-dom/client'

import { JournalApp } from './JournalApp'
import { Provider } from 'react-redux'
import { store } from './store'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import Header from './components/Header'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <Header/> */}
  </React.StrictMode>,
)
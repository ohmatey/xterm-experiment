import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'
import XtermPage from './components/XtermPage'

const Index = () => {

  return (
    <div>
      <h1>Try your luck</h1>

      <button onClick={() => {
        const url = 'http://localhost:3000/xterm'
        const iframe = `<html><head><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src='${url}' style='height:calc(100% - 4px);width:calc(100% - 4px)'></iframe></html></body>`;
        const windowConfig = 'menubar=no,location=no,resizable=no,scrollbars=no,status=yes,width=400,height=350'

        const win = window.open('', '', windowConfig)
        win.document.write(iframe)
      }}>
        Open
      </button>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div>
        <Route path='/' exact component={Index} />
        <Route path='/xterm' exact component={XtermPage} />
      </div>
    </Router>
  )
}

export default App

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Offline, Online } from 'react-detect-offline'

import App from './components/app/app'

const el = <App />

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <>
    <Online>{el}</Online>
    <Offline>
      <p>Check your internet connection...</p>
    </Offline>
  </>
)

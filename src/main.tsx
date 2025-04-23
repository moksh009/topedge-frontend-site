import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

// Initialize theme
const initializeTheme = () => {
  // Check if theme is stored in localStorage
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    document.documentElement.classList.add(storedTheme)
    return
  }

  // If no stored theme, check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.add('light')
  }
}

// Initialize theme before rendering
initializeTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-center" />
    <App />
  </React.StrictMode>,
)

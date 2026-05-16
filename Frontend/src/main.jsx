import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./Pages/Context/AuthProvider.jsx";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={clerkKey}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ClerkProvider>
  </BrowserRouter>
)

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { AuthProvider } from "./Pages/Context/AuthProvider.jsx";

createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <AuthProvider>
                <App />
        </AuthProvider>
    </ClerkProvider>
)

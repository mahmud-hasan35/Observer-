import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  
  <>

    <App />

  <StrictMode>
    
    <QueryClientProvider client={queryClient}>
      

    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
  </StrictMode>,
  
  </>
)

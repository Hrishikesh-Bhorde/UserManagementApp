
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {AuthProvider} from "./components/context/authProvider.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
<AuthProvider>
<div>
      <App />
    </div>
</AuthProvider>
</BrowserRouter>
)

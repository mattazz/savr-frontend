import './App.css'
import {CustomNav, HomeMatt, ShopMatt} from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <Router>
      <CustomNav />
      <Routes>
        <Route path='/' element={<HomeMatt />} />
        <Route path='/shop' element={<ShopMatt />} />
    </Routes>
    </Router>
  )
}

export default App

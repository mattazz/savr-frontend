import './App.css'
import CustomNav from './components/CustomNav'
import HomeMatt from './components/HomeMatt'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <CustomNav />
      <Router>
        <Routes>
          <Route path='/' element={<HomeMatt />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

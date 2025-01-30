import './App.css'
import Navbar from './components/navbar'

function App() {

  const handleClick = () =>{
    alert("Hello!")
  }

  return (
    <>
      <Navbar />
      <div className='bg-yellow-400 '>
        <h1 className='text-5xl'>SAVR</h1>
        <p>All the prices you need blabalbla.</p>

        <form action="">
          <input type="text" placeholder='What are you looking for 😉' />
          <button onClick={handleClick}>SEARCH</button>
        </form>
      </div>
    </>
  )
}

export default App

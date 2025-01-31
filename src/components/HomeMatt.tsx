import '../App.css'

function HomeMatt() {

  const handleClick = () => {
    alert("Hello!")
  }

  return (
    <>
      <div className='h-screen flex justify-center items-center'>
        <div className='flex flex-col text-center w-1/2'>
          <h1 className='text-8xl font-bold'>SAVR</h1>
          <p className='font-bold'>All the prices you need blabalbla.</p>
          <div className='border-red-500 p-4 m-4'>
            <form action="" className='space-y-4 flex flex-col'>
              <input type="text" placeholder='What are you looking for 😉' className='p-2 border rounded' />
              <button onClick={handleClick} className='p-2 bg-black text-white rounded w-1/2 m-auto hover:bg-white hover:text-black transition duration-300'>SEARCH</button>
            </form>
          </div>        </div>
      </div>
    </>
  )
}

export default HomeMatt

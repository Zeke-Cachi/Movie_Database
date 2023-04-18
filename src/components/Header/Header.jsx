import { FaSearch } from "react-icons/fa";
import 'tailwindcss/tailwind.css';
import { useState, useEffect } from "react";


const Header = ({setMovies, API_KEY, setMessage, inputRef, handleHeaderClick}) => {

  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const screenSize = window.innerWidth >= 768;

  useEffect(() => {
    setIsLargeScreen(screenSize);
}, [screenSize]);
    const noMoviesFound = () => {
      setMessage(<div className="text-4xl mt-10">No movies were found!</div>)
      setMovies([])
    }


  let searchMovie = async (query) => {
    const movieQueryURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query};`
    const res = await fetch(movieQueryURL);
    const data = await res.json();

    data.results.length === 0 ? noMoviesFound() : setMovies(data.results)
    inputRef.current.value = ''
  }



  const handleLargeScreenInput = (e) => {
    e.preventDefault();
    searchMovie(inputRef.current.value)
    let visibleInput = document.getElementById('form');
    visibleInput.classList.add('opacity-0')
  }

  const handleSmallScreenInput = () => {
    let visibleInput = document.getElementById('form');
    visibleInput.classList.remove('opacity-0')
    inputRef.current.focus()

  }






  
    return (
    <div className="h-[5rem] bg-cardbg absolute top-0 left-0 w-full flex items-center justify-between shadow-shadow shadow-md px-10">
      <h1 className="text-xl md:text-3xl lg:text-5xl font-medium text-movieBlue pb-1 cursor-pointer" onClick={handleHeaderClick}>Movie Database</h1>
      <div className="flex items-center">
      <FaSearch className="w-6 h-6 me-3 cursor-pointer" onClick={isLargeScreen ? handleLargeScreenInput : handleSmallScreenInput}/>
      
      <form id="form" className="fixed top-[5.5rem] end-[-2rem] opacity-0 md:opacity-100 md:static transition-opacity delay-150" onSubmit={handleLargeScreenInput} >
        <input className="text-movieBlue ms-3 me-10 p-1 border-2 border-movieBlue rounded-md" type="text" placeholder="Look for movie" ref={inputRef} />
      </form>
      </div>
    </div>
  )
}

export default Header
import './App.css';
import { useState, useEffect, useRef } from "react";
import  Header from "./components/Header/Header";
import { MovieCard } from "./components/MovieCard/MovieCard";
import 'tailwindcss/tailwind.css';
import { FaArrowUp } from "react-icons/fa";



const API_KEY = "8560050cfbb13a9b0ab7c0edd190aab8"
const movieApi = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;


const App = () => {

  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);


  useEffect(() => {
    const fetchMovies = async () => {
      let res = await fetch(movieApi);
      let data = await res.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  let renderMovies = () => {
    return movies.length === 0 ? <h2>{message}</h2> : movies.map( (movie) => <MovieCard key={movie.id} movie={movie} />) 
  }

  const handleHeaderClick = () => {
    setMovies([]);
    setMessage("");
    inputRef.current.value = "";
    fetch(movieApi)
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(error => console.error(error));
  };

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <main className='w-full'>
      <Header 
        setMovies={setMovies} 
        API_KEY={API_KEY} 
        setMessage={setMessage}
        inputRef={inputRef}
        handleHeaderClick={handleHeaderClick}
      />
      <div className="w-full place-items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-[5rem]">
        {renderMovies()}
      </div>
      <FaArrowUp className={`${movies.length === 0 ? "fixed bottom-[5rem] h-20 w-full mx-auto text-movieBlue mt-10 cursor-pointer" : 
      "h-20 w-full mx-auto text-movieBlue mt-10 cursor-pointer"}`} onClick={backToTop}/>
      <h3 className={`${movies.length === 0 ? "fixed bottom-[2rem] w-screen mx-auto text-xl pb-4 italic font-bold text-center" :
      "text-xl pb-4 italic font-bold text-center"}`}>Go Back</h3>
    </main>
  )
}

export default App





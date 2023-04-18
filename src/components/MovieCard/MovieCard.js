import KnowMore from "../KnowMore/KnowMore";
import { useState } from "react";
import 'tailwindcss/tailwind.css';
import { BiErrorAlt } from "react-icons/bi";
import { Transition } from '@headlessui/react';

export const MovieCard = ({movie}) => {
    
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleImageLoad = () => {
        setImageError(false);
    };

    const [display, setDisplay] = useState(false);

    const handleClick = () => {
        setDisplay(true);
    }

    const handleClose = () => {
        setDisplay(false);
    }

    let image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;



    return (
        <div className= "flex flex-col font-Poppins w-[18rem] h-[38rem] md:w-[24rem] md:h-[45rem] border-2 border-movieBlue rounded-xl m-4 text-center hover:shadow-movieBlue hover:shadow-lg transition-shadow delay-50 ease-in-out overflow-hidden bg-cardbg">
            {imageError ? 
            <div className="h-3/4 w-full flex flex-col justify-start">
                <BiErrorAlt className="h-[90%] w-full"/>
                <h4 className="text-xl pb-4 italic">Image not Found</h4>
            </div> :
            <img 
                className="h-3/4" 
                src={image} 
                alt="movie poster"
                onError={handleImageError}
                onLoad={handleImageLoad}>
            </img>}

            <div className="h-1/4">
                <h3 className="h-10 pt-2" style={{ fontSize: movie.title.length > 25 ? "1rem" : "1.5rem" }}>{movie.title}</h3>
                <div className="flex justify-around items-center mt-4 pt-4">
                    <button className="bg-movieBlue h-10 w-32 rounded-xl text-[color:white] hover:bg-movieBlueHover" onClick={handleClick}>Know More</button>
                    <div className="flex flex-col justify-center items-center">
                        <h4>Rating</h4>
                        <div className={`rounded-full h-9 w-9 text-white text-[color:white] bg-movieBlue text-center pt-1.5 
                        ${movie.vote_average < 4 ? 'text-red-rating' : 
                        movie.vote_average >= 4 && movie.vote_average < 7 ? 'text-yellow-rating' : 
                        'text-green-rating'}`}>{movie.vote_average.toFixed(1)}</div>
                    </div>
                </div>
                
                <div>
                <Transition
                    show={display}
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <KnowMore movie={movie} image={image} handleClose={handleClose} imageError={imageError} />
                    <div className="fixed w-full h-full bg-black z-40"></div>
                </Transition>
                {display && (
                    <div
                        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-50"
                        onClick={handleClose}
                    ></div>
                )}
                </div>
            </div>
        </div>
    )
}

//FIX THE BACKDROP ISSUE

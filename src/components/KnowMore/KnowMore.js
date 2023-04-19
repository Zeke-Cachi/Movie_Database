import 'tailwindcss/tailwind.css';
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { BiErrorAlt } from "react-icons/bi";




const KnowMore = ({movie, handleClose, image, imageError}) => {
  
  let {title, release_date, overview, vote_average} = movie;

  const formatDate =(dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('es-AR', options);
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    // Cleanup function that removes event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


    return (
    <>

      <div>
        <div className={`${screenHeight <= 692 ? 'max-h-[20rem] w-[90%]' : 'min-h-[30rem] w-[20rem] md:w-[40rem] lg:w-[50rem]'} bg-movieBlue fixed ${overview.length >= 494 ? "top-[2rem]" : "top-[6rem]"} 
        left-1/2 translate-x-[-50%] text-[color:white] rounded-xl pb-5`}>
          <FaTimes className="absolute top-4 right-4 text-white z-50 cursor-pointer" onClick={handleClose}/>
          <div className='mt-[3rem]'>
            <h2 className={`${title.length > 26 && title.length <= 40 ? 'text-xl md:text-3xl mb-2' : 
            title.length > 40 ? 'text-xs md:text-sm' : 'text-2xl md:text-4xl mb-5'}`}>{title}</h2>
            <div className='flex justify-between px-5 mb-5 md:px-[2rem] md:mb-[2rem]'>
              {imageError ? 
                <div className="h-3/4 w-full flex flex-col justify-start items-start">
                    <BiErrorAlt className="h-[90%] w-[8rem] md:w-[12rem] lg:w-[15rem]"/>
                    <h4 className="ps-[0.3rem] md:ps-[2rem] lg:ps-[3.5rem] xl:ps-[3.5rem] text-sm italic">Image not Found</h4>
                </div> : 
                <img className={`${screenHeight <= 692 ? 'w-[5rem] md:w-[8rem]' : 'w-[8rem] md:w-[12rem] lg:w-[15rem]'}`} src={image} alt="Movie poster" />}
              <div className='flex flex-col justify-center md:justify-around md:pe-[3rem]'>
                <div className={`${screenHeight <= 692 ? 'my-2' : 'my-5'} flex flex-col`}>
                  <h6 className='md:text-2xl'>Release Date</h6>
                  <h6 className='md:text-2xl'>{formatDate(release_date)}</h6>
                </div>
                  <div className='flex flex-col'>
                  <h6 className='md:text-2xl'>Average Vote</h6>
                  <h6 className={`md:text-2xl lg:text-3xl lg:mt-[1rem]
                  ${vote_average < 4 ? 'text-red-rating' : 
                  vote_average >= 4 && vote_average < 7 ? 'text-yellow-rating' :
                  'text-green-rating'}`}>{vote_average.toFixed(1)}</h6>
                </div>
              </div>
            </div>
            <p className={`${screenHeight <= 692 ? 'absolute top-[9rem] px-[22rem]' : 'px-2'} ${overview.length >= 494 ? "text-sm" : "text-md"} px-2`}>{overview === "" ? "No description found" : overview}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default KnowMore



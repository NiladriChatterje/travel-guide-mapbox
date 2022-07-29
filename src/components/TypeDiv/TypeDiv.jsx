import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import Close from '../Map/close.png';
import './TypeDiv.css';

function TypeDiv({setType,setFilteredPlaces,setRating}) {
  const [typeList,setTypeList] = useState(()=>([
        {type: 'hospitals',image:'https://digitalhospital.com.sg/wp-content/uploads/2020/05/cropped-Digital-Hospital-Logo-FavIcon-2.png'},
        {type: 'universities',image:'https://i.pinimg.com/736x/d9/85/a1/d985a1d35992337b49591fc0be98e16d.jpg'},
        {type: 'restaurants',image:'https://www.designfreelogoonline.com/wp-content/uploads/2019/09/00230-Restaurant-02.png'},
        {type: 'attractions',image: 'https://images-platform.99static.com//nSvTWft5Q1YkC1EUsniVhS9B0ug=/74x291:970x1187/fit-in/590x590/99designs-contests-attachments/102/102366/attachment_102366930'},
        {type: 'hotels',image:'https://img.freepik.com/premium-vector/beach-house-logo-design-template-beach-resort-villa-beach-hotel-logo_98702-711.jpg?w=2000'},   
  ]));
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const lastIndex = typeList.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, typeList]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div className='Wrapper'>
    <section className="section">
    <div
        style={{position:'absolute',right:'10px',top:'10px',width:'40px',height:'40px'}}
        onClick={() => {const x=document.getElementsByClassName('section');
                      let category=Array.from(x);
                      category[0].style.transform="translate(0,-500px)";
                category[0].style.visibility='hidden';}}>
          <img src={Close} alt="CLOSE" />
        </div>
      <div className="title">
        <h2>
          <span>Select</span> Types
        </h2>
      </div>
      <div className="section-center">
        {typeList.map((person, personIndex) => {
          

          let position = 'nextSlide';
          if (personIndex === index) {
            position = 'activeSlide';
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === typeList.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article className={position} key={personIndex} onClick={()=>{setType(person.type);
                
                let category=Array.from(document.getElementsByClassName('section'));
                category[0].style.transform="translate(0,-500px)";
                category[0].style.visibility='hidden';
                setRating(0);setFilteredPlaces([]);
                }}>
              <img src={person.image} alt={person.type} className="person-img" /> 
              <h1>{person.type}</h1>
                         
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
    </div>
  );
}

export default TypeDiv;
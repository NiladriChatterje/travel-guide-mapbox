import React from 'react';
import './List.css';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import Loader2 from '../Loader2/Loader2';
import InputField from '../InputField/InputField';

export default function List({places,setIsLoading,isLoading,setViewState,setIsInputfieldActive,setDivActive}){
   

    return (
        <div className="List-container">
            <div className="sub-List-container">
            <InputField setViewState={setViewState} setIsInputfieldActive={setIsInputfieldActive}/>
            <button onClick={e => {
                let category=Array.from(document.getElementsByClassName('section'));
                category[0].style.transform="translate(0,100px)";
                category[0].style.visibility='visible'
            }}>CATEGORIES</button>
            </div>
            <span>Hospital,Attractions,Restaurants,Hotels, <br />Universities You want</span>
            <br /><br /><br />
            <span
            style={{height:'06px',width:'18vw',backgroundColor:'orange',marginLeft:'auto',marginRight:'auto',borderRadius:'10px',marginTop:'-60px'}}></span>
            <div className="list-overflow">
               {isLoading?<Loader2 />:
               places?.map(
                (place,i) => <PlaceDetails place={place} key={i} />
               )}
            </div>
        </div>
    )
}
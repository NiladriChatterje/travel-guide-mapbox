import React, { useCallback } from 'react';
import './App.css';
import MapBox from './components/Map/Map';
import List from './components/List/List';
import TypeDiv from './components/TypeDiv/TypeDiv';
import getPlacesData from './axios/getPlacesData';
import OfferList from './components/OfferList/OfferList'

let HospitalData;
let Universities;
let filteredPlaces;


function App() {
  const [viewState, setViewState] = React.useState({latitude: 22.6246939, longitude: 88.4888099});
  const [timer,setTimer] = React.useState(() => {return 2000;})
  const [isLoading,setIsLoading] = React.useState(() => {return true});
  const [type,setType] = React.useState(() => {return 'hospitals'});
  const [places,setPlaces] = React.useState(() => ([]));
  const [newData,setNewData] =React.useState(() => ([]));
  const [isViewport,setisViewPort]=React.useState(()=>false);
  const [isInputfieldActive,setIsInputfieldActive] = React.useState(()=>false);
  const [zoom,setZoom] = React.useState(()=>11);
  const [typeDivActive,setTypeDivActive] = React.useState(()=> true);
  const [search_name,setSearchName] =React.useState(()=>'kolkata');
  const [rating,setRating] = React.useState(() => {return 0});
  
  


 React.useEffect(() =>{
        HospitalData = require('./hospitalData');
        Universities = require('./universities');
        let temp_univ = require('./final_univ.json');
        
        Universities.push(...temp_univ);
        
        
},[]);




React.useEffect(() => {
  // get the users current location on intial login
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      console.log({ latitude, longitude });
      setViewState({ latitude: latitude, longitude: longitude })
    }
  );
}, []);

 
  


React.useEffect(() => {
  setIsLoading(true)
  if(isViewport){
  if(zoom>=12){
  if (type === 'hospitals')
  {
    setTimeout(() => {
      const data = HospitalData.filter((data)=>{
        if(zoom>= 12 && zoom<= 12.25){
        if(data.latitude>=viewState.latitude-0.0510 && data.latitude<=viewState.latitude+0.050135975)
        {
          if(data.longitude<=viewState.longitude+0.090 && data.longitude>=viewState.longitude-0.088200811)
          {
            return data;
          }
        }}
        if(zoom> 12.25 && zoom<= 12.5){
          if(data.latitude>=viewState.latitude-0.0410 && data.latitude<=viewState.latitude+0.035135975)
          {
            if(data.longitude<=viewState.longitude+0.055 && data.longitude>=viewState.longitude-0.066200811)
            {
              return data;
            }
          }}
        if(zoom> 12.5 && zoom<= 13){
          if(data.latitude>=viewState.latitude-0.0220 && data.latitude<=viewState.latitude+0.029135975)
          {
            if(data.longitude<=viewState.longitude+0.053 && data.longitude>=viewState.longitude-0.055200811)
            {
              return data;
            }
          }}
        if(zoom> 13 && zoom <=13.5){
          if(data.latitude>=viewState.latitude-0.0196 && data.latitude<=viewState.latitude+0.018835975)
          {
            if(data.longitude<=viewState.longitude+0.0277 && data.longitude>=viewState.longitude-0.040200811)
            {
              return data;
            }
          }
        }
      })
      
  
      if(data.length === 0)
      {
        setPlaces([]);
        setIsLoading(true);
      }
      else if(data.length <= 20)
      {  setPlaces(data);
        setIsLoading(false);
        console.log(places)
      }
      else{
        for(let i = 0; i<=20; i++)
        {
         setNewData(...newData,data[i]);
          setPlaces(newData);
          setIsLoading(false);
        }
      }
    },2000);

  }
  else if(type === 'universities')
  { 
    setTimeout(()=>{ 
    const data=Universities.filter((data) =>{
      if(zoom>= 12 && zoom<= 12.25){
        if(data.latitude>=viewState.latitude-0.0510 && data.latitude<=viewState.latitude+0.050135975)
        {
          if(data.longitude<=viewState.longitude+0.090 && data.longitude>=viewState.longitude-0.090200811)
          {
            return data;
          }
        }}
        if(zoom> 12.25 && zoom<= 12.5){
          if(data.latitude>=viewState.latitude-0.0410 && data.latitude<=viewState.latitude+0.035135975)
          {
            if(data.longitude<=viewState.longitude+0.055 && data.longitude>=viewState.longitude-0.066200811)
            {
              return data;
            }
          }}
        if(zoom> 12.5 && zoom<= 12.75){
          if(data.latitude>=viewState.latitude-0.0250 && data.latitude<=viewState.latitude+0.029135975)
          {
            if(data.longitude<=viewState.longitude+0.053 && data.longitude>=viewState.longitude-0.055200811)
            {
              return data;
            }
          }}
          if(zoom> 12.75 && zoom<= 13){
            if(data.latitude>=viewState.latitude-0.0220 && data.latitude<=viewState.latitude+0.024135975)
            {
              if(data.longitude<=viewState.longitude+0.048 && data.longitude>=viewState.longitude-0.051400811)
              {
                return data;
              }
            }}
        if(zoom> 13 && zoom <=13.5){
          if(data.latitude>=viewState.latitude-0.0196 && data.latitude<=viewState.latitude+0.018835975)
          {
            if(data.longitude<=viewState.longitude+0.0397 && data.longitude>=viewState.longitude-0.040200811)
            {
              return data;
            }
          }
        }
    });

 

    if(data.length === 0)
    {  setPlaces([]);
      setIsLoading(true);
    }
    if(data.length <= 20)
    {  setPlaces(data);
      setIsLoading(false);
    }
    else{
      for(let i = 0; i<=20; i++)
      {
       setNewData(...newData,data[i]);
        setPlaces(newData);
        setIsLoading(false);
      }
    }
  },5000);
  }    
  else{
    
   let data=[{name:"Random", latitude:22.22 , longitude: 88.22, location_id:1, rating:3,photo:0},{name:"Hello", latitude: 45,longitude: 90,location_id:2,photo:0}]
    if(zoom>=12 && zoom<12.25)
    {
      let viewState1 = {latitude: viewState.latitude-0.0510,longitude: viewState.longitude - 0.090200811}
      let viewState2 = {latitude: viewState.latitude+0.050135975, longitude: viewState.longitude+0.090}

      getPlacesData(type, viewState1, viewState2).then(data => {
        console.log(data);
        setIsLoading(false);
        setPlaces(data)});
  
  }
  else if(zoom>=12.25 && zoom<12.5)
  {
    let viewState1 = {latitude: viewState.latitude-0.0410,longitude: viewState.longitude-0.066200811}
      let viewState2 = {latitude: viewState.latitude+0.035135975, longitude: viewState.longitude+0.055}

       getPlacesData(type, viewState1, viewState2).then((res) =>(res)).then(data => {console.log(data);
        setIsLoading(false);
        setPlaces(data)});
   
  }

  else if(zoom>=12.5 && zoom<12.75)
  {
    let viewState1 = {latitude: viewState.latitude-0.0250,longitude: viewState.longitude-0.055200811}
      let viewState2 = {latitude: viewState.latitude+0.029135975, longitude: viewState.longitude+0.053}

       getPlacesData(type, viewState1, viewState2).then((res) =>(res)).then(data => {console.log(data);
        setIsLoading(false);
        setPlaces(data)});
   
  }
  else if(zoom>=12.75 && zoom<13)
  {
    let viewState1 = {latitude: viewState.latitude-0.0220,longitude: viewState.longitude-0.051400811}
      let viewState2 = {latitude: viewState.latitude+0.024135975, longitude: viewState.longitude+0.0485}

       getPlacesData(type, viewState1, viewState2).then((res) =>(res)).then(data => {console.log(data);
        setIsLoading(false);
        setPlaces(data)});
   
  }
  else if(zoom>=13 && zoom<13.5)
  {
    let viewState1 = {latitude: viewState.latitude-0.0196,longitude: viewState.longitude-0.040200811}
      let viewState2 = {latitude: viewState.latitude+0.018835975, longitude: viewState.longitude+0.0397}

       getPlacesData(type, viewState1, viewState2).then((res) =>(res)).then(data => {console.log(data);
        setIsLoading(false);
        setPlaces(data)});
   
  }
  
  }

  
 

}
}
return () => (setNewData([]));}, [type, viewState]);


React.useEffect(()=>{
  window.onload = function(){
    document.querySelector('#on-load').style.display = ' none';
  }
},[])


  return (
    <div >
    <TypeDiv setType={setType} />
    <OfferList places={places} type={type}/>
    <div className="App" onScroll={e => console.log(e)}>
      
    <MapBox
    setZoom={setZoom}
    zoom={zoom}
    places={zoom>=12?places:[]} 
    viewState={viewState} 
    setViewState={setViewState}
    timer={timer}
    setTimer={setTimer}
    isInputfieldActive={isInputfieldActive}
    setIsInputfieldActive={setIsInputfieldActive}
    setisViewPort={setisViewPort} />

   
    <List 
      places = {zoom>=12?(places):[]}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
      viewState={viewState}
      setViewState={setViewState}
      setTypeDivActive={setTypeDivActive}
      setIsInputfieldActive={setIsInputfieldActive} />
    </div>

    </div>
  );
}

export default App;
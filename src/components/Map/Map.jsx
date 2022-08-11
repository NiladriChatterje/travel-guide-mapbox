import React, { useCallback } from 'react';
import Map, {Marker,GeolocateControl, NavigationControl,FullscreenControl} from 'react-map-gl';
import './Map.css'
import Loader from '../Loader/Loader';
import Close from './close.png';


const API_KEY='pk.eyJ1IjoibmlsYWRyaTIwMDAiLCJhIjoiY2wxNjF1OTNuMGJueTNjczF5MG12cmZ3OSJ9.-VogjFOddybGUgC8JuBVOw'
const API_key_weather1 = '87e0714b96ca2e55e775907fa4d6972f';
const API_key_weather2 = '39a874f4992883caf93f33961b899c1b';


export default function MapBox({places, viewState,setViewState,timer,setTimer,setisViewPort,isInputfieldActive,setIsInputfieldActive,zoom,setZoom,setRating}){
    
    const [data,setData] = React.useState(()=>([]));
    const [isLoading,setIsLoading] = React.useState(() => {return true});
    const [isLocked,setIsLocked] =React.useState(() => false);
    const [theme,setTheme] =React.useState(()=>'mapbox://styles/niladri2000/cl64r4dhz001015n53ts9lmp4');
    const [weather,setWeather] =React.useState(() => {})

    function handleEvent(viewstate){
      setViewState(viewstate);
      
    }

    React.useEffect(()=>{
      WeatherCall();
    },[])
    async function WeatherCall(){
      try{
       await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${viewState.latitude}&lon=${viewState.longitude}&appid=${API_key_weather1}`)
       .then((response) => (response.json()))
       .then((data) => {if(data.cod === 429 || data.cod === 401){}
                        else{setWeather(data);console.log(data)}})}
                        
        catch(err){console.log(err)};
    }

    const debounce = (func) =>{
      let timer;
      return function(...args){
        const context = this;
        if(timer) clearTimeout(timer);
        timer =setTimeout(()=>{
          timer = null;
          func.apply(context,args);
        },800);
      }
     }

     const optimisedHandleEvent = useCallback(debounce(handleEvent),[]);

    return (
        <div className="map-container">
         <div class='styleback'></div>
         <div class='styleback1'></div>
         <div class='styleback2'></div>
    <Map
      interactive={true}
      maxZoom={isLocked?12:13.5}
      mapboxAccessToken={API_KEY}
      initialViewState={{...viewState}}
      viewState={isInputfieldActive?({...viewState}):undefined}
      onZoom={e => {isLocked?setZoom(12):setZoom(e.viewState.zoom)}}
      style={{width: '65vw',borderRadius:'18px',boxShadow:'0 6px 18px -1px', height: '88vh',display:'flex',alignItems:'center',justifyContent:'center'}}
      mapStyle={theme}
      onClick={e => {console.log(e);setIsInputfieldActive(false);}}
      onMoveEnd={(e) =>{console.log(e);
        optimisedHandleEvent({latitude:e.viewState.latitude,longitude:e.viewState.longitude});
        setisViewPort(true);  }}
        onMove={() =>{
              setisViewPort(false)}}
      minZoom={isLocked?12:5}
      
    >
      
      <FullscreenControl />
      <GeolocateControl />
      <NavigationControl position='bottom-right'/>

      <div className='event' id='i1' onClick={e => setTheme('mapbox://styles/mapbox/streets-v9')}></div>
      <div className='event' id='i2' onClick={e=> setTheme('mapbox://styles/niladri2000/cl5tb1xq7000514qs7aqj3rnt')}></div>
      <div className='event' id='i3' onClick={e => setTheme('mapbox://styles/niladri2000/cl5wdgzqo002a14pbhtv1gfgi')}></div>
      <div className='event' id='i4' onClick={e => setTheme('mapbox://styles/niladri2000/cl60fwv20002k14liwwbag8b3')}></div>
      <div className='event' id='i5' onClick={e => setTheme('mapbox://styles/niladri2000/cl64r4dhz001015n53ts9lmp4')}></div>
      
      {zoom<12?<div className="hide-restriction">
      Please Have a minimum Zoom of 12
      <br /> zooming out too much will have a cluster effect <br/>
      making it hard for pointing out exact cards
      </div>
      :<>
      <div className='show-restriction'></div>
      <div className='weather-show' onMouseEnter={WeatherCall} >
        {weather?<>
        <span style={{fontWeight:'800',fontSize:'25px'}}>{weather.name}</span>
        <span style={{width:'280px',height:'2px',borderRadius:'5px',backgroundColor:'orange'}}></span>
        <div style={{display:'flex',justifyContent:'space-evenly'}}>
            <span style={{fontWeight:'800'}}>Temperature</span><span>------</span><span>{String(weather.main.temp - 273).slice(0,6)}°C</span>
        </div>

        <div style={{display:'flex',justifyContent:'space-evenly'}}>
            <span style={{fontWeight:'800'}}>Feels Like</span><span>------</span><span>{String(weather.main.feels_like - 273).slice(0,6)}°C</span>
        </div>

        <div style={{display:'flex',justifyContent:'space-evenly'}}>
            <span style={{fontWeight:'600',color:'darkorange',fontSize:'15px'}}>Max Temp.</span><span>------</span><span style={{fontSize:'15px',fontWeight:'700'}}>{String(weather.main.temp_max - 273).slice(0,6)}°C</span>
        </div>

        <div style={{display:'flex',justifyContent:'space-evenly'}}>
            <span style={{fontWeight:'600',color:'orange',fontSize:'15px'}}>Min Temp</span><span>------</span><span style={{fontSize:'15px',fontWeight:'700'}}>{String(weather.main.temp_min - 273).slice(0,6)}°C</span>
        </div>
        <span style={{width:'280px',height:'2px',borderRadius:'5px',backgroundColor:'orange'}}></span>

        <div style={{display:'flex',justifyContent:'space-between',marginRight:'15px',marginTop:'4px'}}>
            <span style={{fontWeight:'500', fontSize:'12px'}}>Pressure:</span><span style={{fontWeight:'800',fontSize:'10px'}}>{String(weather.main.pressure)}milibar(mb)</span>
        </div>
        
        <div style={{display:'flex',justifyContent:'space-between',marginRight:'15px',marginTop:'4px'}}>
            <span style={{fontWeight:'500', fontSize:'12px'}}>Humidity:</span><span style={{fontWeight:'800',fontSize:'10px'}}>{String(weather.main.humidity)}%</span>
        </div>
        
        <div style={{display:'flex',justifyContent:'space-between',marginRight:'15px',marginTop:'4px'}}>
            <span style={{fontWeight:'500', fontSize:'12px'}}>Wind Speed:</span><span style={{fontWeight:'800',fontSize:'10px'}}>{String(weather.wind.speed)}km/hr</span>
        </div>
        <span style={{width:'280px',height:'2px',borderRadius:'5px',backgroundColor:'orange'}}></span>
        <div style={{display:'flex',justifyContent:'space-between',marginRight:'15px',marginTop:'4px'}}>
            <span style={{fontWeight:'900', fontSize:'26px'}}>{weather?.weather[0]?.description}</span>
        </div></>:null}
        </div></>}
      <div className='lock' >
          <div>
              Locking is performed for better display<br />
              of cards!
          </div>
          <button onClick={() =>{setIsLocked((prev) => !prev)}}>
            {isLocked?'Unlock':'Lock'}</button>
      </div>

      <div className="hidden-details"
      >
        <div
        style={{position:'sticky',left:'0',top:'10px',width:'40px',height:'40px'}}
        onClick={() => {const x=document.getElementsByClassName('hidden-details');
                      Array.from(x);
                      x[0].style.transform="scale(0,0)";
                      x[0].style.visibility="hidden";}}>
          <img src={Close} alt="CLOSE" />
        </div>

      {isLoading?<Loader 
                    setIsLoading={setIsLoading} 
                    timer={timer}/>:

        
        <div className="hidden-details-card">
          <div className="hidden-details-card-top">
            {(data.photo ||data.photo?.images?.large?.url || 'https://static.vecteezy.com/system/resources/thumbnails/003/413/275/small/traveling-with-friends-free-vector.jpg') &&<div
              style={{overflow:'hidden',cursor:'pointer',margin:'20px',display:'flex',justify:'center',height:'25vh'}}>
                <img src={data.photo?.images?.large?.url || data.photo} alt="IMAGE__"  />
            </div>}
            <span style={{height:'3px',width:'30vw',backgroundColor:'black'}}></span>
            <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-around'}}>
                <span style={{fontWeight:600,fontSize:25,marginTop:'3px'}}>{data.name}</span>
                </div>
              </div>
              {data.rating?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600}}>Ratings: </span>
                <span
                style={{fontWeight:600}}>{data.rating}</span>
              </div>): null}

              {data.no_of_beds?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600}}>BEDS: </span>
                <span
                style={{fontWeight:200}}>{data.no_of_beds}</span>
              </div>): null}
            

              {data.WEBSITE || data.website?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span
                style={{fontWeight:600}}>Website: </span>
                <span
                style={{fontWeight:200,color:'white',backgroundColor:'orange',borderRadius:'25px',padding:'1px 6px'}}>
                  <a href={data.WEBSITE || data.website} target="_blank" rel="noreferrer"><button>Official WEBSITE</button></a></span>
              </div>): null}

              {data.type?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600}}>Type: </span>
                <span
                style={{fontWeight:900,color:'blue'}}>{data.type}</span>
              </div>): null}


              {data.opening_hours?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600}}>Available: </span>
                <span
                style={{fontWeight:200}}>{data.opening_hours}</span>
              </div>): null}


              {data.founded?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600}}>Founded In: </span>
                <span
                style={{fontWeight:900}}>{data.founded}</span>
              </div>): null}

              {data.offer_group?.lowest_price?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:400}}>lowest Price: </span>
                <span
                style={{fontWeight:900}}>
                  ₹ {Number(data.offer_group.lowest_price.slice(1,data.offer_group.lowest_price.slice.length))*75.6}</span>
              </div>): null}

              {data.contact || data.phone?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600}}>Contact: </span>
                <span
                style={{fontWeight:900}}>{data.contact ||data.phone}</span>
              </div>): null}

              {data.price_level?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600}}>Price_level: </span>
                <span
                style={{fontWeight:900}}>{data.price_level.replaceAll('$','₹')}</span>
              </div>): null}

              {data.offer_group?.lowest_price?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:900,fontSize:18}}>Offer Price: </span>
                <span
                style={{fontWeight:900,fontSize:18}}>
                  ₹ {Number(data.offer_group.lowest_price.slice(1,data.offer_group.lowest_price.slice.length))*75.6}</span>
              </div>): null}
                
                  {data.awards?<div style={{display:'flex',flexDirection:'column',justifyContent:'center'
                }}>
                    <span style={{height:'3px',width:'42vw',backgroundColor:'orange',margin:'auto'}}></span>
              {data.awards?.map((item,i) =>
              <div key={i}
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <img src={item.images.small} alt={'image'} />
                <span
                style={{fontWeight:800}}>{item.display_name}</span>
              </div>)}</div>:null}

                <div style={{margin:'2px 5px',display:'flex',width:'100%',flexWrap:'wrap'}}>
              {data.cuisine?.map((item,i) =>
              <div key={i}
              style={{margin:'2px 5px'}}>
                <span
                style={{fontWeight:300,padding:'0 12px',backgroundColor:'darkorange',color:'white'
                ,borderRadius:'10px'}}>{item.name}</span>
              </div>)}</div>


              {(data.booking?.url)? <div style={{display:'flex',justifyContent:'space-between',marginTop:'16px'}}>
                                <span style={{fontWeight:'800',fontSize:'14px'}}>Booking: </span>
                                <span style={{fontWeight:'800',fontSize:'14px'}}>
                                    <button onClick={()=>{window.open(data.booking.url,'_blank')}}
                                    style={{outline:'none',width:'100px',height:'50px',borderRadius:'10px', backgroundColor:'orange'
                                    ,color:'white'}}>BOOK</button></span>
              </div>:null}
  

              {( data.address || data.location_string)?(
              <div 
              style={{margin:'0 5px',display:'flex',alignItem:'flex-start',flexDirection:'column',flexWrap:'wrap'}}>
                <span 
                style={{fontWeight:600}}>Address --------------- </span>
                <span
                style={{fontWeight:500,color:'darkorange',fontSize:18}} >{data.address || data.location_string}</span>
              </div>): null}
        
            </div>}
                
      </div>
      
      {places?.map((place,i) => {
        let latitude=Number(place.latitude);
        let longitude = Number(place.longitude);
        if(!isNaN(latitude) && !isNaN(longitude))
        {return <Marker
        key={i*Math.ceil(Math.random()*10000) || place.locationId || place.location_id}
        latitude={Number(place.latitude) || viewState.latitude+Math.random()*0.050}
        longitude={Number(place.longitude) || viewState.longitude-Math.random()*0.0902}
        >
          <div className="map-card"
            onClick={(e)=>{setData(place);
                  const x =document.getElementsByClassName('hidden-details');
                  Array.from(x);
                  setTimer(2000);
                  setIsLoading(true);
                  x[0].style.visibility="visible";
                  x[0].style.transform="scale(1,1)";}}>
            <div className="img-container">
              <img src={ place.photo?.images?.medium?.url || place.photo || 'https://www.hotelieracademy.org/wp-content/uploads/2017/03/54e33d4ba8d7a.resized1000x1000.jpg'} alt="IMAGES_" />
              
            </div>
            <span
            style={{height:'02px',width:'20vw',backgroundColor:'orange',marginLeft:'auto',marginRight:'auto',borderRadius:'10px',marginTop:'0px'}}></span>
            <span>{place.name}</span>
            <span
            style={{height:'02px',width:'20vw',backgroundColor:'orange',marginLeft:'auto',marginRight:'auto',borderRadius:'10px',marginTop:'0px'}}></span>
            {place.opening_hours?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600,fontSize:10}}>Available: </span>
                <span
                style={{fontWeight:500,fontSize:10}}>{place.opening_hours}</span>
              </div>): null}

              {(place.contact || place.phone)?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600,fontSize:8}}>Contact: </span>
                <span
                style={{fontWeight:900,fontSize:8}}>{place.contact || place.phone}</span>
              </div>): null}

              {(place.founded)?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600,fontSize:10}}>Founded In: </span>
                <span
                style={{fontWeight:900,fontSize:8}}>{place.founded}</span>
              </div>): null}

              {place.no_of_beds?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600}}>BEDS: </span>
                <span
                style={{fontWeight:800}}>{place.no_of_beds}</span>
              </div>): null}               



          </div>
        </Marker>}
})}
      
    </Map>
    <div className="button-group">
    <div className='Rating-menu'
    onClick={(e)=>{e.stopPropagation();
      Array.from(document.getElementsByClassName('rating-submenu'))[0].style.visibility='visible';
      Array.from(document.getElementsByClassName('rating-submenu'))[0].style.transform='scale(1,1)';
    }}
    > <span style={{color:'white', fontWeight:'900',zIndex:-1}}>Ratings</span>
        <div className="rating-submenu">
          <div className="rating-items" onClick={(e)=>{e.stopPropagation();
        Array.from(document.getElementsByClassName('rating-submenu'))[0].style.visibility='hidden';
        Array.from(document.getElementsByClassName('rating-submenu'))[0].style.transform='scale(0,0)';
        setRating(0);

      }
        }>All</div>
          <div className="rating-items"onClick={(e)=>{e.stopPropagation();
          Array.from(document.getElementsByClassName('rating-submenu'))[0].style.visibility='hidden';
          Array.from(document.getElementsByClassName('rating-submenu'))[0].style.transform='scale(0,0)';
          setRating(2);
          }}>2.0 and above</div>
          <div className="rating-items"onClick={(e)=>{e.stopPropagation();
          Array.from(document.getElementsByClassName('rating-submenu'))[0].style.visibility='hidden';
          Array.from(document.getElementsByClassName('rating-submenu'))[0].style.transform='scale(0,0)';
          setRating(3);
          }}>3.0 and above</div>
          <div className="rating-items"onClick={(e)=>{e.stopPropagation();
          Array.from(document.getElementsByClassName('rating-submenu'))[0].style.visibility='hidden';
          Array.from(document.getElementsByClassName('rating-submenu'))[0].style.transform='scale(0,0)';
          setRating(4);
          }}>4.0 and above</div>
          <div className="rating-items"onClick={(e)=>{e.stopPropagation();
          Array.from(document.getElementsByClassName('rating-submenu'))[0].style.visibility='hidden';
          Array.from(document.getElementsByClassName('rating-submenu'))[0].style.transform='scale(0,0)';
          setRating(4.5);
          }}>4.5 and above</div>
        </div>
    </div>
    <button 
    onClick={()=>{
      Array.from(document.getElementsByClassName('cont'))[0].style.visibility='visible';
      Array.from(document.getElementsByClassName('cont'))[0].style.transform='translate(100px,0)'
    }}
    style={{color:'white',backgroundColor:'orange',padding:'3px 6px',
  borderRadius:'10px' ,fontWeight:600,width:'100px',marginTop:'6px'}}>Offers</button>
    </div>
    </div>
    );
}
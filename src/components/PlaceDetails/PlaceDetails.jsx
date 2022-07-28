import React from 'react'
import './PlaceDetails.css';

export default function PlaceDetails({place}){
    return (
        <div className='card-container'>
            <div className="img-container-list">
                <img src={(place.photo?.images?.medium?.url)?place.photo.images.medium.url:(place.photo || '')} alt="IMAGE__"/>
            </div>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',margin:'85px 0'}}>
            <span
            style={{height:'05px',width:'22vw',backgroundColor:'orange',marginLeft:'auto',marginRight:'auto',borderRadius:'10px',marginTop:'-60px'}}></span>
            <span>{place.name}</span>
            <span
            style={{height:'02px',width:'20vw',backgroundColor:'orange',marginLeft:'auto',marginRight:'auto',borderRadius:'10px',marginTop:'0px'}}></span>
            </div>
            


            {(place.rating||place.Rating) && <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{fontWeight:'400',fontSize:'20px'}}>Ratings: </span>
                                <span style={{fontWeight:'800',fontSize:'20px'}}>{place.rating}</span>
                            </div>}


            {place.no_of_beds && <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{fontWeight:'800',fontSize:'16px'}}>BEDS: </span>
                                <span style={{fontWeight:'800',fontSize:'16px'}}>{place.no_of_beds}</span>
                            </div>}

            
            {place.type && <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{fontWeight:'800',fontSize:'16px'}}>Type: </span>
                                <span style={{fontWeight:'800',fontSize:'16px'}}>{place.type}</span>
                            </div>}

            {place.opening_hours && <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{fontWeight:'800',fontSize:'14px'}}>Available: </span>
                                <span style={{fontWeight:'800',fontSize:'14px'}}>{place.opening_hours}</span>
                            </div>}

            {(place.contact || place.phone) && <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{fontWeight:'800',fontSize:'14px'}}>CONTACT: </span>
                                <span style={{fontWeight:'800',fontSize:'14px'}}>{place.contact || place.phone}</span>
                            </div>}
                    
            {(place.founded) && <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{fontWeight:'800',fontSize:'14px'}}>Founded In: </span>
                                <span style={{fontWeight:'800',fontSize:'14px'}}>{place.founded}</span>
                            </div>}
            

                            {place.price?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600,fontSize:'14px'}}>Price: </span>
                <span
                style={{fontWeight:800,fontSize:'18px'}}>{place.price.replaceAll('$','₹')}</span>
              </div>): null}

            {place.price_level?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:600,fontSize:'14px'}}>Price Level: </span>
                <span
                style={{fontWeight:800,fontSize:'18px'}}>{place.price_level.replaceAll('$','₹')}</span>
              </div>): null}

              {place.offer_group?.lowest_price?(
              <div 
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <span 
                style={{fontWeight:900,fontSize:18}}>Offer Price: </span>
                <span
                style={{fontWeight:900,fontSize:18}}>
                  ₹ {Number(place.offer_group.lowest_price.slice(1,place.offer_group.lowest_price.slice.length))*75.6}</span>
              </div>): null}
              

              {place.awards?.map((item,i) =>
              <div key={i}
              style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                <img src={item.images.small} alt={'image'} />
                <span
                style={{fontWeight:800,fontSize:'14px'}}>{item.display_name}</span>
              </div>)}

              <div 
              style={{margin:'0 5px',display:'flex',flexWrap:'wrap'}}>
              {place.cuisine?.map((item,i) =>
              
                <span key={i}
                style={{fontWeight:300,margin:'5px 0',backgroundColor:'darkorange',color:'white',fontSize:'1em',padding:'0 8px'
                ,borderRadius:'10px'}}>{item.name}</span>
              )}</div>


              {place.ranking?(
                
                <div 
                style={{margin:'0 5px',display:'flex',justifyContent:'space-between'}}>
                  <span 
                  style={{fontWeight:600,fontSize:'14px'}}>Ranking: </span>
                  <span
                  style={{fontWeight:800,fontSize:'14px'}}>{place.ranking}</span>
                </div>): null}


              {(place.WEBSITE || place.website)? <div style={{display:'flex',justifyContent:'space-between',marginTop:'16px'}}>
                                <span style={{fontWeight:'800',fontSize:'14px'}}>Website: </span>
                                <span style={{fontWeight:'800',fontSize:'14px'}}>
                                    <a href={place.WEBSITE || place.website} target='_blank' rel='noreferrer'><button
                                    style={{outline:'none',width:'100px',height:'50px',borderRadius:'10px', backgroundColor:'orange'
                                    ,color:'white'}}>Click HERE</button></a></span>
                            </div>:null}

              {(place.booking?.url)? <div style={{display:'flex',justifyContent:'space-between',marginTop:'16px'}}>
                                <span style={{fontWeight:'800',fontSize:'14px'}}>Booking: </span>
                                <span style={{fontWeight:'800',fontSize:'14px'}}>
                                    <button onClick={()=>{window.open(place.booking.url,'_blank')}}
                                    style={{outline:'none',width:'100px',height:'50px',borderRadius:'10px', backgroundColor:'orange'
                                    ,color:'white'}}>BOOK</button></span>
              </div>:null}
                
                


              {( place.address || place.location_string)?(
              <div 
              style={{margin:'0 5px',display:'flex',alignItem:'flex-start',flexDirection:'column',flexWrap:'wrap'}}>
                <span 
                style={{fontWeight:600}}>Address --------------- </span>
                <span
                style={{fontWeight:500,color:'darkorange',fontSize:18}} >{place.address || place.location_string}</span>
              </div>): null}
            
        </div>
    );
}
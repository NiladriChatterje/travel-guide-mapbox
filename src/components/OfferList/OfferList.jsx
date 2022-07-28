import './OfferList.css';
import No from './No.webp';

export default function OfferList({places,type}){

    return <div  className='cont'>
        <div className="Heading">
               <div className='subHeading'>
              <span>Offers:</span>

              <div className='Closeimage' onClick={()=>{
                Array.from(document.getElementsByClassName('cont'))[0].style.transform='translate(-1400px,0)'
                Array.from(document.getElementsByClassName('cont'))[0].style.visibility='hidden';
                
            }}>
            </div>

            </div>
                
                    <span className='underline' style={{position:'relative',left:'8%',backgroundColor:'darkorange',height:'4.11px',width:'20vw',borderRadius:'15px'}}></span>
                
            
            </div>
            
            {(type === 'hospitals' || type === 'universities' || type === 'hotels' || type === 'restaurants')?
              <div class='no-offer'>
                <img src={No} alt={'no Offers'} />
                <span>No Offers</span></div>
            :
                places?.map((place,i) => {
                    return (
                  <div className='subContainer' style={{display:'flex',flexWrap:'wrap',maxWidth:'1200px'}}>
                {(place.offer_group?.offer_list)?.map((item,i) =>
                <div key={i} className="Offer-list">
                  <div style={{height:'100px',display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}} 
                  ><img src={item.image_url || 'https://www.flyingcalls.com/wp-content/uploads/2018/03/Special-offer.jpg'} alt={'Image'} /></div>
                  <div>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'0 15px',backgroundColor:'white',borderTopLeftRadius:'15px',borderTopRightRadius:'15px'}}>
                  <span style={{fontWeight:600,fontSize:'14px'}}>{item.title}</span>
                  </div>
                  <span style={{width:'5vw',height:'2px',backgroundColor:'darkorange'}}></span>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'0 15px',backgroundColor:'white'}}>
                  <span style={{fontWeight:600,fontSize:'14px'}}>Price: </span>
                  <span style={{fontWeight:600,fontSize:'14px'}}>₹{Number(item.price?.slice(1,item.price.length))*75.9}</span>
                  </div></div>
                </div>)}</div>)
                })
            }
    </div>
}
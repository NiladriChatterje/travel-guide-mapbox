import './Introduction.css';
import travel_01 from "./assets/travel-01.jpg";
import travel_02 from "./assets/travel-02.jpg";
import travel_03 from "./assets/travel-03.webp";
import travel_04 from "./assets/travel-04.webp";
import travel_05 from './assets/travel-05.webp';
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
function Introduction() {

  return (
    <div className="App-intro">
      <Navbar />
      <Hero imageSrc={travel_01} />
      <Slider
        imageSrc={travel_02}
        title={"Be an explorer."}
        subtitle={
          "Our platform offers a wide variety of unique travel locations!"
        }
      />
      <Slider
        imageSrc={travel_03}
        title={"  Top level Restaurants."}
        subtitle={"We care about your dream tastes."}
        flipped={true}
      />
      <Slider
        imageSrc={travel_05}
        title={"hotels that feels like home"}
        subtitle={"A clean environment everywhere."}
        flipped={true}
      />
       <Slider
        imageSrc={travel_04}
        title={"Memories for a lifetime."}
        subtitle={"Your dream vacation is only a few clicks away."}
        flipped={false}
      />
       
      <button className='Button-intro' onClick={()=>{
        Array.from(document.getElementsByClassName('App-intro'))[0].style.transform='translate(0,800px)';
        setTimeout(()=>(Array.from(document.getElementsByClassName('App-intro'))[0].style.display='none' ), 300);
      }}>SKIP &rarr;</button>
    </div>

  );
}

export default Introduction;

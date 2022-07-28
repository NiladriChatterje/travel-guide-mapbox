import React from 'react';
import './Loader.css';

export default function Loader({setIsLoading,timer=6000}){
    React.useEffect(() => {
        setTimeout(() => setIsLoading(false),timer);
    },[timer,setIsLoading]);
    return (
        <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
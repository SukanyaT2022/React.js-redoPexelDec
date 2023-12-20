import React, { useState,useEffect } from 'react'
import './App.css'

const Home = () => {

//1 Api call
//2 Make state and Store data in state
//3 Do map on state

//step 2
const [storeData, setStoreData] = useState()
//step 1 call api
let keyAPI = 'c19t5LBUeXItCyO5nb5bpds50rtTKwmX7xOeFa4PnEBN8jabAxpjQW6U';
let apiUrl = `https://api.pexels.com/v1/search?query=people&per_page=20&orientation=landscape`;

// url (required)
//we use effect so api not run infinity loop
useEffect(()=>{
  
fetch(apiUrl,{
  headers: {
    Authorization: keyAPI
  }
}).then(response=>response.json())
// .then(data=>console.log(data))//for test purpose
//step2 below store data inside state for map later
//photos come from object when inspect
.then(data=>{
  console.log(data.photos);
  setStoreData(data.photos)})

},[])

//  step3 map
return (
    <>
    <div className='main'>
{
  //  storeData && is if else statement if get data then run api storeData.map
 storeData && storeData.map((val)=>(
  
  <img src={val.src.original}/>
    
   ))
}

    </div>
    </>
  )
}

export default Home
import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './Component/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/fontawesome-free-solid'

const Home = () => {
  //1 Api call
  //2 Make state and Store data in state
  //3 Do map on state

  //step 2
  const [storeData, setStoreData] = useState();
  const [image, setImage] = useState();
  const [search,setSearch] = useState('child');//default category in '' first before search it show child pic
  const [page,setPage] = useState(1);

  //step 1 call api
  let keyAPI = 'c19t5LBUeXItCyO5nb5bpds50rtTKwmX7xOeFa4PnEBN8jabAxpjQW6U';

  let apiUrl = `https://api.pexels.com/v1/search?query=${search}&per_page=20&orientation=landscape&page=${page}`;
  // url (required)
  //we use effect so api not run infinity loop
//line 20 use effect and function can not use together since we use searchHandler function
// so we delete use effect -- the purpose of useefect and function to prevent infinity loop.

  const searchHandler = ()=>{    
      fetch(apiUrl, {
        headers: {
          Authorization: keyAPI,
        },
      })
        .then((response) => response.json())
      
        .then((data) => {
          console.log(data);
          setStoreData(data.photos);
        });
    }
    //line 37 to 38 use for show image before search so it not empty
    // Callback
    useEffect(()=>{
        searchHandler()
    },[page])

    const prevPageHandler = ()=>{
        setPage(page - 1)
    }

    const nextPageHandler = ()=>{
      setPage(page + 1)
    }
    const imageUrlHandler = (src)=>{
      setImage(src.medium)
    }

  //  step3 map
  return (
    <div className='main'>
      <NavBar/>
{/* modal */}
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">X</button>
              </div>
              <div class="modal-body">
                {image &&  <img src={image} className="modal_image"/>}
              </div>
            </div>
          </div>
        </div>

{/* Map */}
        <div className='search_wrapper'>
          <input type="text" placeholder="Search.." onChange={(e)=>setSearch(e.target.value)} />
          <button onClick={searchHandler}>Search</button>
        </div>
        <div className='image_wrapper'>
          {
            //  storeData && is if else statement if get data then run api storeData.map
            storeData && storeData.map((val) => <img src={val.src.small} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>imageUrlHandler(val.src)}/>)
          }
        </div>
        <div>
          <button onClick={prevPageHandler}>Prev</button>
          <button onClick={nextPageHandler}>Next</button>
        </div>
    </div>
  );
};

export default Home;

//9a0c4daa90a75d7767f8d2adfe536559
import './App.css';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
function App() {
  const searchData = useRef(null);
  const [searchText,setSearchText] = useState('mountains');
  const [imagedata,setImagedata]=useState([]);
   useEffect(()=>{
    //method key cat/mounain /neach sort as per page:40 format XML/JSON
    const params={
      method:'flickr.photos.search',
      api_key:'9a0c4daa90a75d7767f8d2adfe536559',
      text:searchText,
      sort:"",
      per_page:45,
      license:'4',
      extras:'owner_name, license',
      format:"json",
      nojsoncallback:1
    }
    //farm id secret server.
    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`;
    axios.get(url).then((resp)=>{
       console.log(resp.data);
      const arr= resp.data.photos.photo.map((imgData)=>{
          return fetchFlickrImageUrl(imgData,'q');
       });
       setImagedata(arr);
    }).catch((err)=>{
        console.log(err);

    }).finally(()=>{

    })
   },[searchText])
   const fetchFlickrImageUrl = (photo,size)=>{
    //farm66.staticflickr.com/server/id_
     let url =`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
     if(size){
       url += `_${size}`
     }
     url += '.jpg'
     return url;
   }
  return (
    <div className='container'>
      <div className='header'>
        <h1 id="title">SnapShot</h1>
      <input type='text' id="search-box"onChange={(e)=>{searchData.current=e.target.value}}/>
      <button id="button" onClick={()=>{setSearchText(searchData.current)}}>Search</button>
      </div>
      <section className='buttons'>
         <button onClick={()=>{setSearchText('mountains')}} id='mountains'>Moutains</button>
         <button onClick={()=>{setSearchText('beaches')}} id='beaches'>Beaches</button>
         <button onClick={()=>{setSearchText('birds')}} id='birds'>Birds</button>
         <button onClick={()=>{setSearchText('food')}} id='food'>Food</button>
      </section>

      <section className='image-container'>
         {imagedata.map((imageurl,key)=>{
             return (
                <article className='image-flicker'>
                    <img src={imageurl} key={key} alt="images"/>
                </article>
             )
         })}
      </section>
      </div>

  );
}

export default App;


import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


function Photos() {

    const { state } = useLocation();
    const photo: any = state;
    const [data, setData] = useState([]);
 
    useEffect(() => {
        getPhotos();
    }, []);


    const getPhotos = async () => {
        const allPho = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${photo.id}`);
        const allPhotos = await allPho.json()
        let temp:any = [];
        for (let i = 0; i < allPhotos.length; ++i) {
            temp.push({ "image": allPhotos[i].thumbnailUrl, "caption": allPhotos[i].title });
        }
        setData(temp); 
    }

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }

    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }

    return (
        <div className="center">
            <h2 className="h2">{photo.title}</h2>
            {/* {photos.map((pho, index) => <div key={index}class="card">
               <div class="card-body"> <p class="card-title">title: {pho.title}</p>
                <p class="card-subtitle mb-2 text-muted">url: {pho.url}</p>
                <p class="card-text">thumbnailUrl: {pho.thumbnailUrl}</p>
                </div>
            </div>)} */}
            {  data.length && 
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
            {data.map((img:any)=>{
                <div className="carousel-item active">
                <img className="d-block w-100" src={img.image} alt={img.caption}/>
              </div>
            })}  
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>}</div>
        //   &&  <Carousel
        //         data={data}
        //         time={2000}
        //         width="850px"
        //         height="500px"
        //         captionStyle={captionStyle}
        //         radius="10px"
        //         slideNumber={true}
        //         slideNumberStyle={slideNumberStyle}
        //         captionPosition="bottom"
        //         automatic={true}
        //         dots={true}
        //         pauseIconColor="white"
        //         pauseIconSize="40px"
        //         slideBackgroundColor="darkgrey"
        //         slideImageFit="cover"
        //         thumbnails={true}
        //         thumbnailWidth="100px"
        //         style={{
        //             textAlign: "center",
        //             maxWidth: "850px",
        //             maxHeight: "500px",
        //             margin: "40px auto",
        //         }}
        //     />}
        // </div>
    )
}

export default Photos;
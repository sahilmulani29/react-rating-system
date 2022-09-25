import { Fragment, startTransition, useState } from 'react';
import {data} from '../db';
import logo from '../planet.jpg';
export const ProductList = () => {

    const [onHoverPlanet , setOnHoverPlanet] = useState({'product_id' : 0 , 'index' : -1});
    const [ratedPlanet , setRatedPlanet] = useState([]);
    const stars = new Array(5).fill(''); 

    const onStarHoverStart = (planet , starIndex) => {
        setOnHoverPlanet({...onHoverPlanet , product_id : planet.product_id , index : starIndex})
    }

    const onStarHoverLeave = () => {
        setOnHoverPlanet({...onHoverPlanet , product_id : 0 , index : -1})
    }

    const onStarClick = (planet , index) => {
        let isPresent = ratedPlanet.indexOf((p)=> p.product_id === planet.product_id);
        if((ratedPlanet && ratedPlanet.length === 0) || isPresent === -1){
            ratedPlanet.push({product_id : planet.product_id , rating : index})
        }else{
            ratedPlanet.forEach(function(data){
                if(data.product_id === planet.product_id){
                    data.rating =  index;
                }
            })
        }
        setRatedPlanet(...[ratedPlanet]);
    }

    const checkRatings = (planet, index) => {
        let rating = -1;
        if(onHoverPlanet && onHoverPlanet.product_id === planet.product_id){
            return onHoverPlanet.index;
        }
        ratedPlanet && ratedPlanet.map((p) => {
            if(p.product_id === planet.product_id){
                rating = p.rating;
            }
        });
        return rating;
    }

    return (
        <Fragment>
            <div className="main-container">
                {
                    data.ratings && data.ratings.length > 0 ?
                        data.ratings.map((planet , planetIndex) => (
                            <div key={planet.product_id} className="planet-containr">
                                <div className="row">{planet.name}</div>
                                <div className="body-img">
                                    <img className="img" src={logo} height="70" width="100"></img>
                                </div>
                                <div className="rating">
                                    {
                                        stars.map((star , starIndex)=>(
                                            <button key={starIndex} className={"rating-button " + (checkRatings(planet , starIndex) >= starIndex ? 'on' : 'off')}
                                                onMouseEnter={()=>onStarHoverStart(planet , starIndex)}
                                                onMouseLeave={()=>onStarHoverLeave()}
                                                onClick={()=>onStarClick(planet , starIndex)}
                                            >
                                                <span>&#9733;</span>
                                            </button>
                                        ))
                                    }
                                </div>
                                <div className="total-rating">
                                    <span>{ planet.ratings > 0 ? 
                                                (planet.ratings / planet.total_ratings).toFixed(2)
                                            : 
                                                0 
                                        }
                                    </span>
                                </div>
                            </div>
                        ))
                    :
                        <div>
                            <h1>
                                {'No Data Found...!!!'}
                            </h1>
                        </div>
                }
            </div>
        </Fragment>
    )
}
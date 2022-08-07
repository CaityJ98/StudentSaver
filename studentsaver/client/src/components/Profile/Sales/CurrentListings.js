import { useEffect, useState } from "react";
import ListingCard from '../../ListingCards/ListingCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserCurrentListings } from '../../../functions/userData'
import { useParams, useNavigate } from 'react-router-dom'

function CurrentListings({navigate}) {
    const [listings, setListing] = useState([]);
    let [loading, setLoading] = useState(false);
    const params = useParams();
    // const navigate = useNavigate();
    useEffect(() => {
        //Takes page/user to specific coordinates
        window.scrollTo(0, 0);
        if (params._id) {
            getUserCurrentListings(params._id)
            console.log(params._id)
            .then(res => {
                setListing(res.sales);
                setLoading(false)
            })
            .catch(err => console.log(err))
        }
    }, [params._id])

    return(
        <>
        {!loading ?
        (<>
            <h1 className="heading">Current Listings</h1>
                {listings ? (
                    <Row>
                        {listings 
                        .filter(x => x.active === true)
                            .map(x => 
                                    <Col xs={12} md={6} lg={4} key={x.id.toString()}>
                                        <ListingCard params={x} navigate={navigate} />
                                    </Col>
                                )
                        }
                    </Row>
                ) : (
                        <p className="nothing-here">Nothing to show here. You have no current Listings.</p>
                    )
                }
       </> ) : 
        <Spinner animation="border" />
        
    }
        </>
    )
}

export default CurrentListings;
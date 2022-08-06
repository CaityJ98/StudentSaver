import React from "react";
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import Header from "../components/header/Header";
import Breadcrumb from "../components/Details/Breadcrumb";
import ListingDetails from "../components/Details/ListingDetails/ListingDetails";
import Aside from "../components/Details/Aside/Aside";
import { getSpecific, removeListing } from "../functions/listingdata";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ListingDetails.scss";
import "../styles/Aside.scss";
import StripeCheckout from "../components/stripePayment";


function Details({ match, navigate }) {
  let params = useParams();
  // console.log(params);
  let listingId = params.id;
  let category = params.category;
  let [listing, setListing] = useState([]);
  console.log(listing)
  let [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    getSpecific(listingId)
      .then((res) => { setListing(res); setLoading(false); })
      .catch((err) => console.log(err));
  }, [listingId, setListing, setLoading]);

  


  const handleSubmitRemove = (e) => {
      e.preventDefault();
      getSpecific(listingId)
          .then((res) => {
              removeListing(res);
              navigate.push(`/marketplace`)
              setShow(false);
          })
          .catch((err) => console.log(err));
  };
  return (
    <>
      <Header />
      <div className="container">
        {!loading ? (
          <>
            <Breadcrumb params={listingId} />
            <Row>
              <Col lg={8} id="detailsListing">
                <ListingDetails params={listing} />
              </Col>
              <Col lg={4}>
                <Aside params={listing} navigate={navigate} />
              </Col>
              <StripeCheckout onSubmit={handleSubmitRemove} /> 
            </Row>
          </>
        ) : (
          <Spinner animation="border" />
        )}
      </div>
    </>
  );
}

export default Details;

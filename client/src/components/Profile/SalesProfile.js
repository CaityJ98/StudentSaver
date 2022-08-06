import { useEffect, useState } from 'react';
import CurrentListings from './Sales/CurrentListings';
import { Col, Row, Button, Form, Modal } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaSellsy } from 'react-icons/fa'
import EditProfile from './../../pages/EditProfile'
import { useNavigate, useParams } from "react-router-dom";

function SalesProfile() {
    let params = useParams();
    // let = user.params; 
    return(
        <>
        <EditProfile /> 
            <div id="Profile-head">
                <div className="container">
                    <Row className="profile-row">
                        <Col lg={2} md={5} sm={12}>
                            {/* <img id="avatar" alt="avatar" src={params.avatar} />  */}
                        </Col>
                        <Col lg={2} md={3} sm={12}>
                            <p><BsFillPersonFill /> {params.name}</p>
                            <p><FaSellsy />{params.totalSells} Total Sales Made </p>
                            <CurrentListings />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
        
    )
}

export default SalesProfile;
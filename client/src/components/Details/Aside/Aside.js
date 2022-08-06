import {useState } from 'react';
import { Button, Modal, Form, OverlayTrigger, Tooltip, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { MdArchive } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { FaSellsy } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom';

import { archiveSell } from '../../../functions/listingdata';

import '../../../styles/Aside.scss';


function Aside({params}) {
//   const params = useParams();

  const navigate = useNavigate();
    const [showArchive, setShowArchive] = useState(false);
    // const handleClose = () => setShowMdg(false);
    // const handleShow = () => setShowMdg(true);

    const handleCloseArchive = () => setShowArchive(false);
    const handleShowArchive = () => setShowArchive(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        archiveSell(params._id)
        console.log(params)
            .then(res => {
                setShowArchive(false);
                navigate(`/profile/${params.seller}`);
            })
            .catch(err => console.log(err))
    }

 


    return (
      
        <aside>
            <div className="listing-details-seller">
                <div id="priceLabel" className="col-lg-12">
                    <h4 id="listing-price-heading">Listing Price </h4>
                    {params.isSeller &&
                        <>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Edit the selling</Tooltip>}>
                                <span id="edit-icon">
                                    <Link to={`/categories/${params.category}/${params._id}/edit`}><GrEdit /></Link>
                                </span>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Archive</Tooltip>}>
                                <span id="archive-icon" onClick={handleShowArchive}>
                                    <MdArchive />
                                </span>
                            </OverlayTrigger>

                        </>
                    }
                    {params.price && <h1 id="price-heading">${(params.price).toFixed(2)}</h1>}
                </div>
                
             
            </div>
        
           

            <Modal show={showArchive} onHide={handleCloseArchive}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to archive this item?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        By clicking <strong>Archive</strong>, this sell will change
                    it's status to <strong>Archived</strong>,
                    which means that no one but you will be able see it.
                    You may want to change the status to <strong>Actived</strong> if you have
                    sold the item or you don't want to sell it anymore.
                    </p>

                    Don't worry, you can unarchive it at any time from Profile - Sells!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseArchive}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Archive
                    </Button>
                </Modal.Footer>
            </Modal>
        </aside>
       
    )
  
}

export default Aside;

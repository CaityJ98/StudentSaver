
import { Tabs, Tab, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function ListingDetails({ params }) {
    

   

    return (
        <>
            <Image className="col-lg-12" src={params.image} rounded />
         
            <div id="detailsCardText" className="col-lg-12">
                <Tabs defaultActiveKey="details" transition={false}>
                    <Tab eventKey="details" title="Details" id="tab-details">
                        {params.description}
                        <hr />
                        <p id="details-footer" className="text-muted">Listing added at {params.addedAt}</p>
                    </Tab>
                    <Tab eventKey="aboutSeller" title="About seller">
                        <p>Name: {params.name || "Not specified"}</p>
                        <p>Email: {params.email}</p>
                       
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default ListingDetails;
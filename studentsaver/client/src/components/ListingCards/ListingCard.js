import { Card } from "react-bootstrap";
// import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Moment from "react-moment";
import '../../styles/ListingCard.scss'

function ListingCard({ params }) {
  return (
    <Card>
      <Link to={`/marketplace/${params.category}/${params._id}/details`}>
        <Card.Img variant="top" src={params.image} />
        <Card.Body className="title">
          <Card.Title>{params.title}</Card.Title>
          <Card.Text className="info">${params.price.toFixed(2)}</Card.Text>
        </Card.Body>
      </Link>
      <Card.Footer>
        <small className="text-muted">
          <Moment format="d MMM YYYY (dddd) HH:mm">{params.addedAt}</Moment>-{" "}
          <strong>{params.city}</strong>
          {/* <Link to="" id="heartIcon"><BsHeart /></Link> */}
        </small>
      </Card.Footer>
    </Card>
  );
}

export default ListingCard;

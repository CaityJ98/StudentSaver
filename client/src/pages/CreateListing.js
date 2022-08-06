import { Component, useState } from "react";
import { Form, Button, Col, Spinner, Alert, Card } from "react-bootstrap";
import { createListing } from "../functions/listingdata";
import SearchBar from "../components/header/Header";
import "../components/CreateListing/CreateListing.scss";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const onSelectFile = (e) => {
    const reader = new FileReader();

    // console.log(e);

    reader.readAsDataURL(e.target.files[0]);

    setImage(e.target.files[0]);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let listing = { title, price, description, category, condition, image };
    console.log(listing);
    console.log(JSON.stringify(listing));
    setLoading(true);

    getBase64(image).then((data) => {
      listing["image"] = data;
      createListing(listing)
        .then((res) => {
            // console.log(res)
          if (res.listingId) {
            setLoading(false);
            navigate(`/marketplace/${category}/${res.listingId}/details`);
          } else {
            setLoading(false);
            setErrors(true);
            setAlertShow(true);
          }
        })
        .catch((err) => {
          console.error("Creating listing err: ", err);
          setLoading(false);
        });
    });
  };

  return (
    <>
      <SearchBar />
      <div className="formy">
        <Card>
          <Card.Body>
            <h1 className="heading">Add a Listing</h1>
            <Form onSubmit={(e) => onSubmitHandler(e)}>
              {alertShow && (
                <Alert
                  variant="danger"
                  onClose={() => setAlertShow(false)}
                  dismissible
                >
                  <p>{errors}</p>
                </Alert>
              )}

              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  name="price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formGridDescription.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  name="category"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Choose...</option>
                  <option>Art</option>
                  <option>Business</option>
                  <option>Coding</option>
                  <option>Education</option>
                  <option>English</option>
                  <option>Law</option>
                  <option>Maths</option>
                  <option>Nursing</option>
                  <option>Psychology</option>
                  <option>Science</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCondition">
                <Form.Label>Condition</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  name="condition"
                  required
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option>Choose...</option>
                  <option>Like New</option>
                  <option>Some wear and tear</option>
                  <option>Has highlighted sections and/or notes</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  required
                  onChange={onSelectFile}
                />
              </Form.Group>

              {loading ? (
                <Button className="col-lg-12" variant="dark" disabled>
                  Please wait... <Spinner animation="border" />
                </Button>
              ) : (
                <Button className="col-lg-12" variant="dark" type="submit">
                  Add Listing
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default CreateListing;

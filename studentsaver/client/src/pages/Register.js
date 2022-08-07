import { useState } from 'react';
import { Form, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registerUser } from '../functions/userData';
import '../styles/register.scss';
import React from 'react';




function Register() {
  const [loading, setLoading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [error, setError] = useState(null);
  const[userData, setUserData] = useState({
    name: null,
    email: "",
    university: "",
    password: "",
    repeatPassword: ""
  });

  const handleChanges = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value});
  }

  const handleSubmitRegistration= (e) => {
    e.preventDefault();
    setLoading(true);
    registerUser(userData)

    .then(res => {
        if (!res.error) {
            window.location.replace('/auth/login')
        } else {
            setLoading(false);
            setError(res.error);
            setAlertShow(true);
        }
    }).catch(err => console.error('error from register: ', err))
}

return (
  <>
  <div className="register">
  <Card class="cardy" style={{height: "40rem"}}>
                <Card.Body>
    <h1 className="auth-heading">Sign Up!</h1>
    <Form className="col-lg-8" onSubmit={handleSubmitRegistration}>
    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                  
                        <Form.Group controlId="forName" className="col-lg-8">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Student123 or Stud Student" onChange={handleChanges} required />
                            <Form.Text muted>
                                The name can be your real one or a username.
                            </Form.Text>
                        </Form.Group>
                      
                        <Form.Group controlId="formBasicEmail" className="col-lg-12">
                            <Form.Label>Email address *</Form.Label>
                            <Form.Control type="email" name="email" placeholder="student@gmail.com" onChange={handleChanges} required />
                        </Form.Group>
                        <Form.Group controlId="forUniversity" className="col-lg-12">
                            <Form.Label>University/Institution *</Form.Label>
                            <Form.Control type="text" name="university" placeholder="Monash University" onChange={handleChanges} required />
                        </Form.Group>
                    
                        <Form.Group controlId="formBasicPassword" className="col-lg-6">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChanges} required />
                            <Form.Text muted>
                                Your password must be 8-20 characters long
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>Repeat Password *</Form.Label>
                            <Form.Control type="password" name="repeatPassword" placeholder="Repeat password" onChange={handleChanges} required />
                        </Form.Group>
                    
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" value="Add to DB" type="submit">Sign Up</Button>
                    }

                    <p className="bottom-msg-paragraph">Already have an account? <Link to="/auth/login">Sign In</Link>!</p>
      </Form>
 </Card.Body>
 </Card>
  </div>
  
  
  </>
)

}
export default Register;
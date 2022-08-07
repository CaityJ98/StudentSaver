import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import mentalhealth from "../assets/images/mentalhealth.png"
import mindfulness from "../assets/images/mindfulness.png"
import fitness from "../assets/images/fitness.png"
import "../styles/Resources.scss"

function HealthAndWellbeing() {

    return (
    <div>
        <h1 className="main-heading">Health and Wellbeing</h1>
        <Container>
            <Row>
                <Col className="col-12 col-md-6 col-lg-4">
                <Card className="mb-3 shadow">
                <img 
                    src={mentalhealth} 
                    className="card-img-top"
                    alt="mental health graphic"
                />
                <Card.Body>
                    <Card.Title>Mental Health</Card.Title>
                    <Card.Text>
                        <p>The pressures of studying can often take a toll on your mental health. Find out what support services are available to you to, so that you can put yourself in the best possible mental state in order to make the most of your student experience.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://beyondblue.org.au/">Beyond Blue</a>
                        <p>Beyond Blue is a mental health and wellbeing support organisation. Beyond Blue provides support programs to address issues related to depression, anxiety and other related mental illnesses.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://headspace.org.au/">Headspace</a>
                        <p>Headspace is the National Youth Mental Health Foundation, which provides support via online and phone counselling services, and through their headspace centres situated across Australia.</p>
                    </Card.Text>
                </Card.Body>
                </Card>
                </Col>

                <Col className="col-12 col-md-6 col-lg-4">
                <Card className="mb-3 shadow">
                <img 
                    src={mindfulness} 
                    className="card-img-top"
                    alt="mindfulness graphic"
                />
                <Card.Body>
                    <Card.Title>Mindfulness</Card.Title>
                    <Card.Text>
                        <p>Mindfulness practices can benefit students in a range of way, including helping you to regulate your emotions, and to decrease stress and anxiety. Explore how mindfulness can improve your mindset and put you in an improved mental state.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://www.smilingmind.com.au/smiling-mind-app">Smiling Mind</a>
                        <p>Smiling Mind is a mindfulness meditation app that is designed to assist people in dealing with the pressure, stress, and challenges of daily life. It does this by providing users with daily meditation and mindfulness exercises.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://insighttimer.com/en-au">Insight Timer</a>
                        <p>Insight Timers is an app that provides guided meditations and talks led by meditation and mindfulness experts, neuroscientists, psychologists and more. </p>
                    </Card.Text>
                </Card.Body>
                </Card>
                </Col>

                <Col className="col-12 col-md-6 col-lg-4">
                <Card className="mb-3 shadow">
                <img
                    src={fitness} 
                    className="card-img-top"
                    alt="fitness graphic"
                />
                <Card.Body>
                    <Card.Title>Fitness</Card.Title>
                    <Card.Text>
                        <p>Maintaining your physical health while you study is important. Find easy ways to include physical exercise in your routine as a student with the following fitness platforms. </p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://www.mybib.com/">FitOn</a>
                        <p>FitOn is a digital fitness platforms that enables you to achieve your health and fitness goals with unlimited access to the fitness classes, including cardio, strength training, HIIT, Pilates, and much more.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://www.grammarly.com/">Nike Training Club</a>
                        <p>Nike Training Club is an app that is designed to help you take your home workouts to the next level. With access to 200+ free programs, the App provides a wide range of workouts for all fitness levels.</p>
                    </Card.Text>
                </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        <div class="col text-center mt-3 mb-3">
             <Button href="/studentresources" variant="custom">Back to main resources page</Button>
        </div>
    </div>
    )
}

export default HealthAndWellbeing;
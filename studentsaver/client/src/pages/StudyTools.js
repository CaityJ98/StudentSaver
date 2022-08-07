import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import productivity from "../assets/images/productivity.png"
import studyaids from "../assets/images/studyaids.png"
import assignments from "../assets/images/assignments.png"
import "../styles/Resources.scss"

function StudyTools() {

    return (
    <div>
        <h1 className="main-heading">Study Tools</h1>
        <Container>
            <Row>
                <Col className="col-12 col-md-6 col-lg-4">
                <Card className="mb-3 shadow">
                <img 
                    src={productivity} 
                    className="card-img-top"
                    alt="productivity graphic"
                />
                <Card.Body>
                    <Card.Title>Productivity</Card.Title>
                    <Card.Text>
                        <p>Get organised and make the most of your study time. Use the following tools to boost your productivity when studying.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://pomofocus.io/">Pomofocus</a>
                        <p>A customizable timer that works on desktop & mobile browser. The aim of this app is to help you focus on a task by using a time management method known as the Pomodoro Technique.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://todoist.com/">Todoist</a>
                        <p>A productivity tool that allows you to get work and life organized. Collect tasks, organize projects, and plan your day.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://examcountdownapp.com/">Exam Countdown</a>
                        <p>An app that allows students to keep track of their study commitments by providing a countdown to important dates, exams, tests, and homework deadlines.</p>
                    </Card.Text>
                </Card.Body>
                </Card>
                </Col>

                <Col className="col-12 col-md-6 col-lg-4">
                <Card className="mb-3 shadow">
                <img 
                    src={studyaids} 
                    className="card-img-top"
                    alt="study aid graphic"
                />
                <Card.Body>
                    <Card.Title>Learning Aids</Card.Title>
                    <Card.Text>
                    <p>Enhance your learning and find the best study method for you with the following learning and note-taking tools.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://quizlet.com/en-gb/">Quizlet</a>
                        <p>A web tool and a mobile app that aims to boost students' learning through a number of study tools, which include flashcards and game-based quizzes.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://www.goconqr.com/">Goconqr</a>
                        <p>An online learning tool that allows you to create, discover and share learning materials, which can include mindmaps, flashcards, quizzes, notes, slides & flowcharts.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://www.notion.so/">Notion</a>
                        <p>A project management and note-taking software. It is an all-in-one workspace which allows you to take notes, organise tasks, manage projects and much more. </p>
                    </Card.Text>
                </Card.Body>
                </Card>
                </Col>

                <Col className="col-12 col-md-6 col-lg-4">
                <Card className="mb-3 shadow">
                <img
                    src={assignments} 
                    className="card-img-top"
                    alt="assignment graphic"
                />
                <Card.Body>
                    <Card.Title>Assignment Tools</Card.Title>
                    <Card.Text>
                    <p>Make your life easier with these assignment tools. From proofreading to citation helpers, these tools will save you time when writing assignments. .</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://www.mybib.com/">MyBib</a>
                        <p>A bibliography and citation generator that makes accurate citations for you to use in your academic assignments and papers.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://www.grammarly.com/">Grammarly</a>
                        <p>A writing assistant that enables students to proofread and edit their documents. Grammarly checks for various types of spelling, grammar, and punctuation errors, and enhances vocabulary usage.</p>
                        <a className="weblink" target="_blank" rel="noopener noreferrer" href="https://www.outwrite.com/">Outwrite</a>
                        <p>A writing assistant that enables students to paraphrase sentences, strengthen vocabulary, check for plagiarism, and increase or decrease word count.</p>
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

export default StudyTools;
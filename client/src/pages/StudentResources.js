import React from "react";
import { ResourceInfo } from "../components/ResourceInfo"
import ResourceCard from "../components/ResourceCard";
import { Container, Row, Col } from 'react-bootstrap';

function StudentResources() {
  return (
    <Container>
        <h1 className="main-heading">Student Resources</h1>
        <Row>
            {ResourceInfo.map((resourceCard) => {
                return (
                    <Col className="col-12 col-md-6 col-lg-4">
                        <ResourceCard
                            cardimage={resourceCard.cardimage}
                            title={resourceCard.title}
                            description={resourceCard.description}
                            link={resourceCard.link}
                            buttontext={resourceCard.buttontext}
                        />
                    </Col>
                );
            })}
        </Row>
    </Container>
  );
}

export default StudentResources;
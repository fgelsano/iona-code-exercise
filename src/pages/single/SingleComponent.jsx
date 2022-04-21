import React, { useEffect, useState } from "react";
import { Button, Card, Container, Figure, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleComponent = () => {
  const params = useParams();
  const [kittyData, setKittyData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchKitty(params.id);
  }, []);
  const fetchKitty = (id) => {
    axios.get(`https://api.thecatapi.com/v1/images/${id}`).then((response) => {
      setKittyData(response.data);
    });
  };
  const backHandleClick = () => {
    navigate(`/?breed=${kittyData.breeds[0].id}`);
  };
  return (
    <Container>
      <Row>
        <Card className="mt-3">
          <Card.Header as="h5">Kitty Profile Page</Card.Header>
          <Card.Body>
            <Figure>
              <Figure.Image
                width={kittyData.width}
                height={kittyData.height}
                src={kittyData.url}
              />
            </Figure>
            <Card.Title>
              {kittyData.breeds && kittyData.breeds[0].name} from{" "}
              {kittyData.breeds && kittyData.breeds[0].origin} [
              {kittyData.breeds && kittyData.breeds[0].temperament}]
            </Card.Title>
            <Card.Text>
              {kittyData.breeds && kittyData.breeds[0].description}
            </Card.Text>
            <Button variant="primary" onClick={backHandleClick}>
              Go back to list
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

SingleComponent.propTypes = {
  match: PropTypes.object,
};

export default SingleComponent;

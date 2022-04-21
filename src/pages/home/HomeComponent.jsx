import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BreedContext } from "../../context/BreedContext";

const HomeComponent = () => {
  const breed = window.location.search.split("=");
  const breedContext = useContext(BreedContext);
  const [selectedBreed, setSelectedBreed] = useState((breed && breed[1]) || "");
  const [selectedBreedData, setSelectedBreedData] = useState([]);
  const [page, setPage] = useState(1);
  const [addMore, setAddMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (breed.length > 1) {
      fetchBreeds({ breed_id: breed[1] });
    }
  }, [breed]);

  const handleSelectBreed = async (e) => {
    await setSelectedBreedData([]);
    setSelectedBreed(e.target.value);
    fetchBreeds({ breed_id: e.target.value });
  };

  const getSelectedBreed = () => {
    const item = breedContext.breeds.filter(
      (item) => item.id === selectedBreed
    );

    return (item[0] && item[0].name) || "";
  };

  const handleClickMore = () => {
    setPage(page + 1);
    fetchBreeds({ page: page + 1, breed_id: selectedBreed });
  };
  const fetchBreeds = (values = {}) => {
    setAddMore(false);
    axios
      .get("https://api.thecatapi.com/v1/images/search", {
        params: { page: page, ...values, limit: 10 },
      })
      .then((response) => {
        const oldData = selectedBreedData.map((breed) => breed.id);
        let hasMore = false;
        let newBreed = [];

        response.data.map((breed) => {
          if (!oldData.includes(breed.id)) {
            console.log(breed.id);
            hasMore = true;

            newBreed = [...newBreed, breed];
          }
        });

        setSelectedBreedData((prev) => [...prev, ...newBreed]);
        setAddMore(hasMore);
        if (hasMore) {
          setPage(page + 1);
        }
      });
  };

  //   console.log("Selected Breed Data", selectedBreedData);
  const viewKittyHandleClick = (id) => {
    navigate(`/kitty/${id}`);
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="m-0">Kitty Gallery</h1>
          <small>Pick from the breed from the dropdown menu below.</small>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3 mt-3">
            <Row>
              <Col xs={3}>
                <Form.Select
                  id="breedSelector"
                  onChange={handleSelectBreed}
                  defaultValue={selectedBreed}
                  //   value={selectedBreed}
                >
                  <option value="" disabled>
                    Select a Breed
                  </option>
                  {breedContext.breeds.map((breed, key) => {
                    return (
                      <option value={breed.id} key={key}>
                        {breed.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col xs={6}>
                <Form.Label htmlFor="breedSelector" className="px-3">
                  You selected
                  <span>
                    <strong>
                      {" "}
                      {getSelectedBreed() || "Nothing at the moment..."}
                    </strong>
                  </span>
                </Form.Label>
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-3">
        <Row>
          {selectedBreedData.map((breedData, key) => {
            return (
              <Col xs={3} key={key}>
                <Card>
                  <Card.Img variant="top" src={breedData.url} />
                  <Card.Body>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        onClick={() => viewKittyHandleClick(breedData.id)}
                      >
                        Get to know this kitty
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        {selectedBreedData.length >= 10 && addMore && (
          <Row>
            <div className="d-grid gap-2 my-5">
              <Button variant="success" onClick={handleClickMore}>
                More of them please...
              </Button>
            </div>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default HomeComponent;

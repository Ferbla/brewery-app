import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import DisplayAddress from "../Components/Address/AddressDetail";
import DisplayMap from "../Components/Map/MapDetail";
import "./BreweryPage.sass";

export default function BreweryPage() {
  const { id } = useParams();

  const [brewery, setBreweries] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.openbrewerydb.org/breweries/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setBreweries(data);
      })
      .catch((error) => {
        console.error("Error loading data", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Container className="brewery-container">
        <Row>
          <Col sm={{ span: 12 }} md={{ span: 4} }>
            <div className="brewery-details">
              <h2>{brewery.name} details</h2>
              <hr />
              <DisplayAddress
                street={brewery.street}
                city={brewery.city}
                state={brewery.state}
                zip={brewery.postal_code}
              />

              <br />
              <Link to="/">
                <Button className="btns">Back to list</Button>
              </Link>
            </div>
          </Col>
          <Col>
            <DisplayMap
              lat={brewery.latitude}
              long={brewery.longitude}
              name={brewery.name}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

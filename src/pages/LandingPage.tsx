import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DisplayAddress from "../Components/Address/AddressDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import './LandingPage.sass';

function LandingPage() {
    
    const [breweries, setBreweries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch("https://api.openbrewerydb.org/breweries/search?query=duluth")
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
    }, []);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <header className="App-header">
        <div>{loading}</div>
      </header>

      <Container fluid>
          <Row>
        {breweries.map((brewery, index) => (
            <Col md={{ span: 8, offset: 2 }} lg={{ span: 4, offset: 0 }}>
              <div className="brewery" key={index}>
                <h2 className="text-center">{brewery.name}</h2>
                <hr />

                <DisplayAddress
                  street={brewery.street}
                  city={brewery.city}
                  state={brewery.state}
                  zip={brewery.postal_code}
                />

                <br />

                <h4>Brewery Type:</h4>
                <div>{brewery.brewery_type}</div>

                <br />
                <Row>
                  <Col sm={{ span: 12 }} md={{ span: 6 }}>
                    <a
                      href={brewery.website_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {brewery.website_url}
                    </a>
                  </Col>

                  <Col sm={{ span: 12 }} md={{span: 4, offset: 1}} >
                    <Link to={`/brewery/${brewery.id}`} >
                      <Button className="btns">More Details</Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Col>
        ))}
        </Row>
      </Container>
        </>
    )
  }
  
  export default LandingPage;
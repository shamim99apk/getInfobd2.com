import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import Icon from "@ant-design/icons";
import "./VolunteerLanding.scss";
const { Meta } = Card;

function VolunteerLandingPage() {
  const [Volunteers, setVolunteers] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getVolunteers(variables);
  }, []);

  const getVolunteers = (variables) => {
    Axios.post("/api/volunteerRoute/getVolunteer", variables).then(
      (response) => {
        if (response.data.success) {
          if (variables.loadMore) {
            setVolunteers([...Volunteers, ...response.data.volunteers]);
          } else {
            setVolunteers(response.data.volunteers);
          }
          setPostSize(response.data.postSize);
        } else {
          alert("Failed to fectch volunteers datas");
        }
      }
    );
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getVolunteers(variables);
    setSkip(skip);
  };

  const renderCards = Volunteers.map((volunteer, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/volunteerRoute/${volunteer._id}`}>
              {" "}
              <ImageSlider images={volunteer.images} />
            </a>
          }>
          <Meta title={volunteer.firstName}></Meta>
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <div className='hero-wrapper3'>
        <div className='wrapper3'>
          <div className='hero-content3'>
            <div>
              <button className='button3'>
                <a href='/volunteer/volunteerUpload'>Want To Be a Volunteer?</a>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            {" "}
            Volunteer list <Icon type='rocket' />{" "}
          </h2>
          <div>
            <button>
              <a href='/volunteer/volunteerUpload'>upload</a>
            </button>
          </div>
        </div>
        {Volunteers.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <h2>No post yet...</h2>
          </div>
        ) : (
          <div>
            <Row gutter={[16, 16]}>{renderCards}</Row>
          </div>
        )}

        {PostSize >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={onLoadMore}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VolunteerLandingPage;

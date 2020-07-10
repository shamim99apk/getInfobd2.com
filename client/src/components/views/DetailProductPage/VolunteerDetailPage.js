import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import ProductImageVolunteer from "./Sections/ProductImageVolunteer";
import ProductInfoVolunteer from "./Sections/ProductInfoVolunteer";

function VolunteerDetailProductPage(props) {
  const volunteerId = props.match.params.volunteerId;
  const [Volunteer, setVolunteer] = useState([]);

  useEffect(() => {
    Axios.get(
      `/api/volunteerRoute/volunteers_by_id?id=${volunteerId}&type=single`
    ).then((response) => {
      setVolunteer(response.data[0]);
    });
  }, []);

  return (
    <div className='postPage' style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Volunteer.firstName}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImageVolunteer detail={Volunteer} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfoVolunteer detail={Volunteer} />
        </Col>
      </Row>
    </div>
  );
}

export default VolunteerDetailProductPage;

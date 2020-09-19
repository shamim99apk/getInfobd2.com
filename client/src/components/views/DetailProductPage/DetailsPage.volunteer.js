import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import VolunteerImages from "./Sections/Image.volunteer";
import VolunteerInfo from "./Sections/Info.volunteer";
import VolunteerGoogleMap from "../../GoogleMap/GoogleMap.volunteer";

function VolunteerDetailsPage(props) {
  const volunteerId = props.match.params.volunteerId;
  const [Volunteer, setVolunteer] = useState([]);

  useEffect(() => {
    Axios.get(
      `/api/volunteer/volunteerProducts_by_id?id=${volunteerId}&type=single`
    ).then((response) => {
      setVolunteer(response.data[0]);
    });
  }, []);

  return (
    <div className='postPage' style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Volunteer.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <VolunteerImages detail={Volunteer} />
        </Col>
        <Col lg={12} xs={24}>
          <VolunteerInfo detail={Volunteer} />
        </Col>
      </Row>
      <VolunteerGoogleMap />
    </div>
  );
}

export default VolunteerDetailsPage;

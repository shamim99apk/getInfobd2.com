import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import BloodImages from "./Sections/Image.blood";
import BloodInfo from "./Sections/Info.blood";
// import BloodGoogleMap from "../../GoogleMap/GoogleMap.blood";

function BloodDetailsPage(props) {
  const bloodId = props.match.params.bloodId;
  const [Blood, setBlood] = useState([]);

  useEffect(() => {
    Axios.get(`/api/blood/bloodProducts_by_id?id=${bloodId}&type=single`).then(
      (response) => {
        setBlood(response.data[0]);
      }
    );
  }, []);

  return (
    <div className='postPage' style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Blood.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <BloodImages detail={Blood} />
        </Col>
        <Col lg={12} xs={24}>
          <BloodInfo detail={Blood} />
        </Col>
      </Row>
      {/* <BloodGoogleMap /> */}
    </div>
  );
}

export default BloodDetailsPage;

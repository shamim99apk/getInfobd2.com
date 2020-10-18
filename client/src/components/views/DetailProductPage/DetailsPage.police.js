import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import PoliceImages from "./Sections/Image.police";
import PoliceInfo from "./Sections/Info.police";
// import PoliceGoogleMap from "../../GoogleMap/GoogleMap.police";

function PoliceDetailsPage(props) {
  const policeId = props.match.params.policeId;
  const [Police, setPolice] = useState([]);

  useEffect(() => {
    Axios.get(
      `/api/police/policeProducts_by_id?id=${policeId}&type=single`
    ).then((response) => {
      setPolice(response.data[0]);
    });
  }, []);

  return (
    <div className='postPage' style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Police.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <PoliceImages detail={Police} />
        </Col>
        <Col lg={12} xs={24}>
          <PoliceInfo detail={Police} />
        </Col>
      </Row>

      {/* <PoliceGoogleMap /> */}
    </div>
  );
}

export default PoliceDetailsPage;

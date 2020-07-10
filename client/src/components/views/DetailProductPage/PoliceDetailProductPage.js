import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import ProductImagePolice from "./Sections/ProductImagePolice";
import ProductInfoPolice from "./Sections/ProductInfoPolice";

function PoliceDetailProductPage(props) {
  const policeId = props.match.params.policeId;
  const [Police, setPolice] = useState([]);

  useEffect(() => {
    Axios.get(`/api/policeRoute/polices_by_id?id=${policeId}&type=single`).then(
      (response) => {
        setPolice(response.data[0]);
      }
    );
  }, []);

  return (
    <div className='postPage' style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Police.firstName}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImagePolice detail={Police} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfoPolice detail={Police} />
        </Col>
      </Row>
    </div>
  );
}

export default PoliceDetailProductPage;

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import PharmacyImages from "./Sections/Image.pharmacy";
import PharmacyInfo from "./Sections/Info.pharmacy";
import HotelGoogleMap from "../../GoogleMap/GoogleMap.hotel";

function PharmacyDetailsPage(props) {
  const pharmacyId = props.match.params.pharmacyId;
  const [Pharmacy, setPharmacy] = useState([]);

  useEffect(() => {
    Axios.get(
      `/api/pharmacy/pharmacyProducts_by_id?id=${pharmacyId}&type=single`
    ).then((response) => {
      setPharmacy(response.data[0]);
    });
  }, []);

  return (
    <div className='postPage' style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Pharmacy.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <PharmacyImages detail={Pharmacy} />
        </Col>
        <Col lg={12} xs={24}>
          <PharmacyInfo detail={Pharmacy} />
        </Col>
      </Row>
      <HotelGoogleMap />
    </div>
  );
}

export default PharmacyDetailsPage;

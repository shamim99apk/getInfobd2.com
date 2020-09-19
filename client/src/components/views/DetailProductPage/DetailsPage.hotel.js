import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import HotelImages from "./Sections/Image.hotel";
import HotelInfo from "./Sections/Info.hotel";
import HotelGoogleMap from "../../GoogleMap/GoogleMap.hotel";

function HotelDetailsPage(props) {
  const hotelId = props.match.params.hotelId;
  const [Hotel, setHotel] = useState([]);

  useEffect(() => {
    Axios.get(`/api/hotel/hotelProducts_by_id?id=${hotelId}&type=single`).then(
      (response) => {
        setHotel(response.data[0]);
      }
    );
  }, []);

  return (
    <div className='postPage' style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Hotel.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <HotelImages detail={Hotel} />
        </Col>
        <Col lg={12} xs={24}>
          <HotelInfo detail={Hotel} />
        </Col>
      </Row>
      <HotelGoogleMap />
    </div>
  );
}

export default HotelDetailsPage;

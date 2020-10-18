import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import GroceryImages from "./Sections/Image.grocery";
import GroceryInfo from "./Sections/Info.grocery";
// import GroceryGoogleMap from "../../GoogleMap/GoogleMap.grocery";

function GroceryDetailsPage(props) {
  const groceryId = props.match.params.groceryId;
  const [Grocery, setGrocery] = useState([]);

  useEffect(() => {
    Axios.get(
      `/api/grocery/groceryProducts_by_id?id=${groceryId}&type=single`
    ).then((response) => {
      setGrocery(response.data[0]);
    });
  }, []);

  return (
    <div className='postPage' style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Grocery.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <GroceryImages detail={Grocery} />
        </Col>
        <Col lg={12} xs={24}>
          <GroceryInfo detail={Grocery} />
        </Col>
      </Row>

      {/* <GroceryGoogleMap /> */}
    </div>
  );
}

export default GroceryDetailsPage;

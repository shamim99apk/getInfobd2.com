import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import ProductImageGrocery from "./Sections/ProductImageGrocery";
import ProductInfoGrocery from "./Sections/ProductInfoGrocery";

function GroceryDetailProductPage(props) {
  const groceryId = props.match.params.groceryId;
  const [Grocery, setGrocery] = useState([]);

  useEffect(() => {
    Axios.get(
      `/api/groceryRoute/grocerys_by_id?id=${groceryId}&type=single`
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
          <ProductImageGrocery detail={Grocery} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfoGrocery detail={Grocery} />
        </Col>
      </Row>
    </div>
  );
}

export default GroceryDetailProductPage;

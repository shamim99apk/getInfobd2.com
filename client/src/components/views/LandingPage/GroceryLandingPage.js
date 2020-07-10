import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import Icon from "@ant-design/icons";
import "./GroceryLanding.scss";
const { Meta } = Card;

function GroceryLandingPage() {
  const [Grocerys, setGrocerys] = useState([]);

  useEffect(() => {
    Axios.post("/api/groceryRoute/getGrocery").then((response) => {
      if (response.data.success) {
        setGrocerys(response.data.grocerys);
      } else {
        alert("Failed to fectch product datas");
      }
    });
  }, []);

  const renderCards = Grocerys.map((grocery, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/groceryRoute/${grocery._id}`}>
              {" "}
              <ImageSlider images={grocery.images} />
            </a>
          }>
          <Meta title={grocery.title} description={grocery.price} />
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <div className='hero-wrapper9'>
        <div className='wrapper9'>
          <div className='hero-content9'>
            <div>
              <button className='button9'>
                <a href='/grocery/groceryUpload'>Add grocery?</a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            {" "}
            Grocery List <Icon type='rocket' />{" "}
          </h2>
          <div>
            <button>
              <a href='/grocery/upload'>upload</a>
            </button>
          </div>
        </div>
        {Grocerys.length === 0 ? (
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
        <br />
      </div>
    </div>
  );
}

export default GroceryLandingPage;

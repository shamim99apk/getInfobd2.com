import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import Icon from "@ant-design/icons";
import "./BloodLanding.scss";
const { Meta } = Card;

function BloodLandingPage() {
  const [Bloods, setBloods] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getBloods(variables);
  }, []);

  const getBloods = (variables) => {
    Axios.post("/api/bloodRoute/getBlood", variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setBloods([...Bloods, ...response.data.bloods]);
        } else {
          setBloods(response.data.bloods);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to fectch blood datas");
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getBloods(variables);
    setSkip(skip);
  };

  const renderCards = Bloods.map((blood, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/bloodRoute/${blood._id}`}>
              {" "}
              <ImageSlider images={blood.images} />
            </a>
          }>
          <Meta title={blood.firstName}></Meta>
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <div className='hero-wrapper2'>
        <div className='wrapper2'>
          <div className='hero-content2'>
            <div>
              <button className='button1'>
                <a href='/blood/bloodUpload'>Become a Blood Doner?</a>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            {" "}
            Blood doner list <Icon type='rocket' />{" "}
          </h2>
        </div>
        {Bloods.length === 0 ? (
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
        <br />

        {PostSize >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={onLoadMore}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BloodLandingPage;

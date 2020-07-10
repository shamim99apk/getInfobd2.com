import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import Icon from "@ant-design/icons";
import "./PoliceLanding.scss";
const { Meta } = Card;

function PoliceLandingPage() {
  const [Polices, setPolices] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getPolices(variables);
  }, []);

  const getPolices = (variables) => {
    Axios.post("/api/policeRoute/getPolice", variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setPolices([...Polices, ...response.data.polices]);
        } else {
          setPolices(response.data.polices);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to fectch police datas");
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
    getPolices(variables);
    setSkip(skip);
  };

  const renderCards = Polices.map((police, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/policeRoute/${police._id}`}>
              {" "}
              <ImageSlider images={police.images} />
            </a>
          }>
          <Meta title={police.firstName}></Meta>
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <div className='hero-wrapper4'>
        <div className='wrapper4'>
          <div className='hero-content4'>
            <div>
              <button className='button4'>
                <a href='/police/policeUpload'>Set Police information</a>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            {" "}
            Police info list <Icon type='rocket' />{" "}
          </h2>
        </div>
        {Polices.length === 0 ? (
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

export default PoliceLandingPage;

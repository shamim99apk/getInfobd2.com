import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
// import CheckBox from "./Sections/CheckBox";
import "./LandingPage.volunteer.scss";
import "./LandingPage.volunteertwo.scss";

import Icon from "@ant-design/icons";
// import { continents } from "./Sections/Datas.blood";
import SearchFeature from "./Sections/SearchFeature";

const { Meta } = Card;

function VolunteerLandingPage() {
  const [Volunteers, setVolunteers] = useState([]);
  const [Skip, setSkip] = useState(0);

  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [SearchTerms, setSearchTerms] = useState("");

  const [Filters, setFilters] = useState({
    continents: [],
  });

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getVolunteers(variables);
  }, []);

  const getVolunteers = (variables) => {
    Axios.post("/api/volunteer/volunteerGetProducts", variables).then(
      (response) => {
        if (response.data.success) {
          if (variables.loadMore) {
            setVolunteers([...Volunteers, ...response.data.volunteers]);
          } else {
            setVolunteers(response.data.volunteers);
          }
          setPostSize(response.data.postSize);
        } else {
          alert("Failed to fectch volunteer datas");
        }
      }
    );
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
      searchTerm: SearchTerms,
    };
    getVolunteers(variables);
    setSkip(skip);
  };

  const renderCards = Volunteers.map((volunteer, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/volunteer/${volunteer._id}`}>
              {" "}
              <ImageSlider images={volunteer.images} />
            </a>
          }>
          <Meta title={volunteer.title} description={volunteer.fullName} />
        </Card>
      </Col>
    );
  });
  // const showFilteredResults = (filters) => {
  //   const variables = {
  //     skip: 0,
  //     limit: Limit,
  //     filters: filters,
  //   };
  //   getBloods(variables);
  //   setSkip(0);
  // };

  //   const handlePrice = (value) => {
  //     const data = price;
  //     let array = [];

  //     for (let key in data) {
  //       if (data[key]._id === parseInt(value, 10)) {
  //         array = data[key].array;
  //       }
  //     }
  //     console.log("array", array);
  //     return array;
  //   };

  // const handleFilters = (filters, category) => {
  //   const newFilters = { ...Filters };

  //   newFilters[category] = filters;

  //   if (category === "price") {
  //     //   let priceValues = handlePrice(filters);
  //     //   newFilters[category] = priceValues;
  //   }

  //   console.log(newFilters);

  //   showFilteredResults(newFilters);
  //   setFilters(newFilters);
  // };

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerms(newSearchTerm);

    getVolunteers(variables);
  };

  return (
    <div>
      <div className='hero-wrapper15'>
        <div className='wrapper3'>
          <div className='hero-content3'>
            <div>
              <button className='button3'>
                <a href='/volunteer/Upload'>Want To Be a Volunteer?</a>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            {" "}
            Volunteer list <Icon type='rocket' />{" "}
          </h2>
        </div>

        {/* Filter  */}

        {/* <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={continents}
            handleFilters={(filters) => handleFilters(filters, "continents")}
          />
        </Col>
      </Row> */}

        {/* Search  */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1rem auto",
          }}>
          <SearchFeature refreshFunction={updateSearchTerms} />
        </div>

        {Volunteers.length === 0 ? (
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

export default VolunteerLandingPage;

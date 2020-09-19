import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
// import CheckBox from "./Sections/CheckBox";
import "./LandingPage.blood.scss";
import Icon from "@ant-design/icons";
// import { continents } from "./Sections/Datas.blood";
import SearchFeature from "./Sections/SearchFeature";

const { Meta } = Card;

function GroceryLandingPage() {
  const [Groceries, setGroceries] = useState([]);
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

    getGroceries(variables);
  }, []);

  const getGroceries = (variables) => {
    Axios.post("/api/grocery/groceryGetProducts", variables).then(
      (response) => {
        if (response.data.success) {
          if (variables.loadMore) {
            setGroceries([...Groceries, ...response.data.groceries]);
          } else {
            setGroceries(response.data.groceries);
          }
          setPostSize(response.data.postSize);
        } else {
          alert("Failed to fectch grocery datas");
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
    getGroceries(variables);
    setSkip(skip);
  };

  const renderCards = Groceries.map((grocery, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/grocery/${grocery._id}`}>
              {" "}
              <ImageSlider images={grocery.images} />
            </a>
          }>
          <Meta title={grocery.title} description={`BDT: ${grocery.price}Tk`} />
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

    getGroceries(variables);
  };

  return (
    <div>
      <div className='hero-wrapper2'>
        <div className='wrapper2'>
          <div className='hero-content2'>
            <div>
              <button className='button1'>
                <a href='/grocery/Upload'>Upload Your Grocery?</a>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            {" "}
            Grocery list <Icon type='rocket' />{" "}
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

        {Groceries.length === 0 ? (
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

export default GroceryLandingPage;

import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";

function ProductInfoGrocery(props) {
  const [Grocery, setGrocery] = useState({});

  useEffect(() => {
    setGrocery(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title='Product info'>
        <Descriptions.Item label='Title'> {Grocery.title}</Descriptions.Item>
        <Descriptions.Item label='description'>
          {Grocery.description}
        </Descriptions.Item>

        <Descriptions.Item label='price'> {Grocery.price}</Descriptions.Item>
        <Descriptions.Item label='Address'>
          {" "}
          {Grocery.address}
        </Descriptions.Item>
        <Descriptions.Item label='Phone number'>
          {" "}
          {Grocery.phoneNumber}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
    </div>
  );
}

export default ProductInfoGrocery;

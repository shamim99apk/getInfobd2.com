import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";

function GroceryInfo(props) {
  const [Grocery, setGrocery] = useState({});

  useEffect(() => {
    setGrocery(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title='Product Info'>
        <Descriptions.Item label='Product Name'>
          {" "}
          {Grocery.title}
        </Descriptions.Item>

        <Descriptions.Item label='Price'>{Grocery.price}</Descriptions.Item>

        <Descriptions.Item label='Address'>
          {" "}
          {Grocery.address}
        </Descriptions.Item>

        <Descriptions.Item label='Product Info'>
          {Grocery.description}
        </Descriptions.Item>

        <Descriptions.Item label='Phone number'>
          {`0${Grocery.phoneNumber}`}
        </Descriptions.Item>
      </Descriptions>

      <br />
    </div>
  );
}

export default GroceryInfo;

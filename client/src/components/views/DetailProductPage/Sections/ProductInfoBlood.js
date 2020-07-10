import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";

function ProductInfoBlood(props) {
  const [Blood, setBlood] = useState({});

  useEffect(() => {
    setBlood(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title='Blood doner info'>
        <Descriptions.Item label='Full name'>
          {" "}
          {Blood.firstName + "" + Blood.lastName}
        </Descriptions.Item>
        <Descriptions.Item label='Email'>{Blood.email}</Descriptions.Item>
        <Descriptions.Item label='Blood group'>
          {" "}
          {Blood.bloodGroup}
        </Descriptions.Item>
        <Descriptions.Item label='Phone number'>
          {" "}
          {Blood.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label='Address'> {Blood.address}</Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
    </div>
  );
}

export default ProductInfoBlood;

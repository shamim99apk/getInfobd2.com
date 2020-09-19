import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";

function BloodInfo(props) {
  const [Blood, setBlood] = useState({});

  useEffect(() => {
    setBlood(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title='Blood doner info'>
        <Descriptions.Item label='Full name'>
          {" "}
          {Blood.description}
        </Descriptions.Item>
        <Descriptions.Item label='Email'>{Blood.email}</Descriptions.Item>
        <Descriptions.Item label='Blood group'>{Blood.title}</Descriptions.Item>
        <Descriptions.Item label='Phone number'>
          {`0${Blood.phoneNumber}`}
        </Descriptions.Item>
        <Descriptions.Item label='Address'> {Blood.address}</Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
    </div>
  );
}

export default BloodInfo;

import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";

function HotelInfo(props) {
  const [Hotel, setHotel] = useState({});

  useEffect(() => {
    setHotel(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title='Hotel'>
        <Descriptions.Item label='Hotel Name'> {Hotel.title}</Descriptions.Item>

        <Descriptions.Item label='Address'> {Hotel.address}</Descriptions.Item>
        <Descriptions.Item label='Phone number'>
          {`0${Hotel.phoneNumber}`}
        </Descriptions.Item>
        <Descriptions.Item label='Email'>{Hotel.email}</Descriptions.Item>
        <Descriptions.Item label=' Hotel Details'>
          {Hotel.description}
        </Descriptions.Item>
        <br />
        <Descriptions.Item label='Link'>
          {Hotel.link ? <a href={Hotel.link}>{Hotel.link}</a> : ""}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
    </div>
  );
}

export default HotelInfo;

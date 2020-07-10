import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";

function ProductInfoVolunteer(props) {
  const [Volunteer, setVolunteer] = useState({});

  useEffect(() => {
    setVolunteer(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title='Volunteer info'>
        <Descriptions.Item label='Full name'>
          {" "}
          {Volunteer.firstName + Volunteer.lastName}
        </Descriptions.Item>
        <Descriptions.Item label='Email'>{Volunteer.email}</Descriptions.Item>

        <Descriptions.Item label='Phone number'>
          {" "}
          {Volunteer.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label='Address'>
          {" "}
          {Volunteer.address}
        </Descriptions.Item>
        <Descriptions.Item label='Interested activies'>
          {" "}
          {Volunteer.interestVolunteer}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
    </div>
  );
}

export default ProductInfoVolunteer;

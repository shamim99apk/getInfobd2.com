import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";

function VolunteerInfo(props) {
  const [Volunteer, setVolunteer] = useState({});

  useEffect(() => {
    setVolunteer(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title='Volunteer Info'>
        <Descriptions.Item label='Full Name'>
          {Volunteer.fullName}
        </Descriptions.Item>
        <Descriptions.Item label='Interested In'>
          {Volunteer.title}
        </Descriptions.Item>

        <Descriptions.Item label='Address'>
          {" "}
          {Volunteer.address}
        </Descriptions.Item>
        <Descriptions.Item label='Phone number'>
          {`0${Volunteer.phoneNumber}`}
        </Descriptions.Item>
        <Descriptions.Item label='Email'>{Volunteer.email}</Descriptions.Item>
      </Descriptions>

      <br />
      <br />
    </div>
  );
}

export default VolunteerInfo;

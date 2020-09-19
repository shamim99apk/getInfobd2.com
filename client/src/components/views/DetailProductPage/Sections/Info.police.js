import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";

function PoliceInfo(props) {
  const [Police, setPolice] = useState({});

  useEffect(() => {
    setPolice(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title='Police Station'>
        <Descriptions.Item label='Branch'> {Police.title}</Descriptions.Item>

        <Descriptions.Item label='Address'> {Police.address}</Descriptions.Item>
        <Descriptions.Item label='Phone number'>
          {`0${Police.phoneNumber}`}
        </Descriptions.Item>
        <Descriptions.Item label='Email'>{Police.email}</Descriptions.Item>
      </Descriptions>

      <br />
      <br />
    </div>
  );
}

export default PoliceInfo;

import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";

function PharmacyInfo(props) {
  const [Pharmacy, setPharmacy] = useState({});

  useEffect(() => {
    setPharmacy(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title='Pharmacy Details'>
        <Descriptions.Item label='Pharmacy Name'>
          {" "}
          {Pharmacy.title}
        </Descriptions.Item>

        <Descriptions.Item label='Address'>
          {" "}
          {Pharmacy.address}
        </Descriptions.Item>
        <Descriptions.Item label='Phone number'>
          {`0${Pharmacy.phoneNumber}`}
        </Descriptions.Item>
        <Descriptions.Item label='Email'>{Pharmacy.email}</Descriptions.Item>

        <br />
        <Descriptions.Item label='Link'>
          {Pharmacy.link ? <a href={Pharmacy.link}>{Pharmacy.link}</a> : ""}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
    </div>
  );
}

export default PharmacyInfo;

import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";

import EmergencyFileUpload from "../../utils/FileUpload.emergency";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

function EmergencyUploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");

  const [Address, setAddress] = useState("");

  const [PhoneNumber, setPhoneNumber] = useState();

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onAddress = (event) => {
    setAddress(event.currentTarget.value);
  };

  const onPhoneNumber = (event) => {
    setPhoneNumber(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    if (!TitleValue || !PhoneNumber || !Images) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,

      images: Images,
      phoneNumber: PhoneNumber,
      address: Address,
    };

    Axios.post("/api/emergency/emergencyUploadProduct", variables).then(
      (response) => {
        if (response.data.success) {
          alert("Emergency Info Successfully Uploaded");
          props.history.push("/emergency");
        } else {
          alert("Failed to upload Emergency Info");
        }
      }
    );
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Emergency List</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <EmergencyFileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Survice Name</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />

        <label>Contact Number</label>
        <Input onChange={onPhoneNumber} value={PhoneNumber} />
        <br />
        <label>Address</label>
        <Input onChange={onAddress} value={Address} />

        <br />

        <br />

        <Button type='primary' ghost onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EmergencyUploadProductPage;

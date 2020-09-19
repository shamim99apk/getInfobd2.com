import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";

import PoliceFileUpload from "../../utils/FileUpload.police";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

function PoliceUploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");

  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");

  const [PhoneNumber, setPhoneNumber] = useState();

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onAddress = (event) => {
    setAddress(event.currentTarget.value);
  };
  const onEmail = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPhoneNumber = (event) => {
    setPhoneNumber(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      email: Email,
      images: Images,
      phoneNumber: PhoneNumber,
      address: Address,
    };

    Axios.post("/api/police/policeUploadProduct", variables).then(
      (response) => {
        if (response.data.success) {
          alert("Police Info Successfully Uploaded");
          props.history.push("/police");
        } else {
          alert("Failed to upload Police Info");
        }
      }
    );
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Police Station List</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <PoliceFileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Police Box Name</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />

        <label>Phone Number</label>
        <Input onChange={onPhoneNumber} value={PhoneNumber} />
        <br />
        <label>Address</label>
        <Input onChange={onAddress} value={Address} />

        <br />
        <label>Email</label>
        <TextArea onChange={onEmail} value={Email} />
        <br />
        <br />

        <br />
        <br />

        <Button type='primary' ghost onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default PoliceUploadProductPage;

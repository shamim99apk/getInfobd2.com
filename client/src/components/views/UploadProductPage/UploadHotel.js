import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";

import HotelFileUpload from "../../utils/FileUpload.hotel";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

function HotelUploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Link, setLink] = useState("");

  const [PhoneNumber, setPhoneNumber] = useState();

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onLink = (event) => {
    setLink(event.currentTarget.value);
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

    if (!TitleValue || !DescriptionValue || !Email || !PhoneNumber || !Images) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      email: Email,
      images: Images,
      phoneNumber: PhoneNumber,
      address: Address,
      link: Link,
    };

    Axios.post("/api/hotel/hotelUploadProduct", variables).then((response) => {
      if (response.data.success) {
        alert("Hotel Info Successfully Uploaded");
        props.history.push("/hotel");
      } else {
        alert("Failed to upload Hotel Info");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Hotel List</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <HotelFileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Hotel Name</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Hotel Details</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Email</label>
        <Input onChange={onEmail} value={Email} />
        <br />
        <label>Phone Number</label>
        <Input onChange={onPhoneNumber} value={PhoneNumber} />
        <br />
        <label>Address</label>
        <Input onChange={onAddress} value={Address} />

        <br />
        <label>Link</label>
        <Input onChange={onLink} value={Link} />

        <br />
        <br />

        <Button type='primary' ghost onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default HotelUploadProductPage;

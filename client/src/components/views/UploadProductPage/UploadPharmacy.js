import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";

import PharmacyFileUpload from "../../utils/FileUpload.pharmacy";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

function PharmacyUploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");

  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Link, setLink] = useState("");

  const [PhoneNumber, setPhoneNumber] = useState();

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
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

    if (!TitleValue || !Email || !PhoneNumber || !Images) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,

      email: Email,
      images: Images,
      phoneNumber: PhoneNumber,
      address: Address,
      link: Link,
    };

    Axios.post("/api/pharmacy/pharmacyUploadProduct", variables).then(
      (response) => {
        if (response.data.success) {
          alert("Pharmacy Info Successfully Uploaded");
          props.history.push("/pharmacy");
        } else {
          alert("Failed to upload Pharmacy Info");
        }
      }
    );
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Pharmacy List</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <PharmacyFileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Pharmacy Name</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />

        <label>Phone Number</label>
        <Input onChange={onPhoneNumber} value={PhoneNumber} />
        <br />
        <label>Address</label>
        <Input onChange={onAddress} value={Address} />

        <br />
        <label>Email</label>
        <Input onChange={onEmail} value={Email} />
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

export default PharmacyUploadProductPage;

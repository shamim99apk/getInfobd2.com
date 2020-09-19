import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";

import VolunteerFileUpload from "../../utils/FileUpload.volunteer";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

function VolunteerUploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [FullName, setFullName] = useState("");

  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");

  const [PhoneNumber, setPhoneNumber] = useState();

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onFullName = (event) => {
    setFullName(event.currentTarget.value);
  };
  const onEmail = (event) => {
    setEmail(event.currentTarget.value);
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

    if (!TitleValue || !FullName || !Email || !PhoneNumber || !Images) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      fullName: FullName,
      email: Email,
      images: Images,
      phoneNumber: PhoneNumber,
      address: Address,
    };

    Axios.post("/api/volunteer/volunteerUploadProduct", variables).then(
      (response) => {
        if (response.data.success) {
          alert("Volunteer Info Successfully Uploaded");
          props.history.push("/volunteer");
        } else {
          alert("Failed to upload volunteer Info");
        }
      }
    );
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Volunteer List</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <VolunteerFileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Full Name</label>
        <Input onChange={onFullName} value={FullName} />
        <br />
        <br />
        <label>Interested In</label>
        <TextArea onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Email</label>
        <Input onChange={onEmail} value={Email} />
        <br />
        <label>Phone Number</label>
        <Input onChange={onPhoneNumber} value={PhoneNumber} type='number' />

        <label>Address</label>
        <Input onChange={onAddress} value={Address} />

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

export default VolunteerUploadProductPage;

import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";

import BloodFileUpload from "../../utils/FileUpload.blood";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "O+" },
  { key: 2, value: "O-" },
  { key: 3, value: "A+" },
  { key: 4, value: "A-" },
  { key: 5, value: "B+" },
  { key: 6, value: "B-" },
  { key: 7, value: "AB+" },
];

function BloodUploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");

  const [PhoneNumber, setPhoneNumber] = useState();
  const [ContinentValue, setContinentValue] = useState(1);

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
  const onAddress = (event) => {
    setAddress(event.currentTarget.value);
  };

  const onPhoneNumber = (event) => {
    setPhoneNumber(event.currentTarget.value);
  };

  const onContinentsSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !TitleValue ||
      !DescriptionValue ||
      !Email ||
      !ContinentValue ||
      !PhoneNumber ||
      !Images
    ) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      email: Email,
      images: Images,
      continents: ContinentValue,
      phoneNumber: PhoneNumber,
      address: Address,
    };

    Axios.post("/api/blood/bloodUploadProduct", variables).then((response) => {
      if (response.data.success) {
        alert("Blood Info Successfully Uploaded");
        props.history.push("/blood");
      } else {
        alert("Failed to upload Blood Info");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Become a Blood Donor</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <BloodFileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <br />
        <label>Full Name</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <label>Blood Group</label>
        <Input onChange={onTitleChange} value={TitleValue} />
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
        <select onChange={onContinentsSelectChange} value={ContinentValue}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}{" "}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type='primary' ghost onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default BloodUploadProductPage;

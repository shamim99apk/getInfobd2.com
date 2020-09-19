import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";

import GroceryFileUpload from "../../utils/FileUpload.grocery";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

function GroceryUploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [Price, setPrice] = useState();
  const [Address, setAddress] = useState("");

  const [PhoneNumber, setPhoneNumber] = useState();

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPrice = (event) => {
    setPrice(event.currentTarget.value);
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

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: Price,
      images: Images,
      phoneNumber: PhoneNumber,
      address: Address,
    };

    Axios.post("/api/grocery/groceryUploadProduct", variables).then(
      (response) => {
        if (response.data.success) {
          alert("Grocery Info Successfully Uploaded");
          props.history.push("/grocery");
        } else {
          alert("Failed to upload grocery Info");
        }
      }
    );
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Grocery Product List</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <GroceryFileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Product Name</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Product Details</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price</label>
        <Input onChange={onPrice} value={Price} type='number' />
        <br />
        <label>Phone Number</label>
        <Input onChange={onPhoneNumber} value={PhoneNumber} type='number' />
        <br />
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

export default GroceryUploadProductPage;

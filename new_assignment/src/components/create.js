import React from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Create = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const postData = (data) => {
    const emp_id = Math.floor(Math.random() * (99999 - 10000)) + 10000;

    if (
      data.firstName === "" ||
      data.lastName === "" ||
      data.email === "" ||
      data.contact.length !== 10
    ) {
      console.log({ ...data });
    } else {
      axios
        .post(`http://localhost:4000/create`, {
          emp_id,
          ...data,
        })
        .then(() => {
          navigate("/");
        });
    }
  };
  const onSubmit = (data) => {
    postData(data);
  };
  const backHandler = () => {
    navigate("/");
  };
  return (
    <div>
      <Button primary onClick={backHandler}>
        Back
      </Button>
      <Form className="create-form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            // onChange={(e) => setFirstName(e.target.value)}
            type="text"
            {...register("firstName", { required: true, maxLength: 10 })}
          />
        </Form.Field>
        {errors.firstName && <p>Please check the First Name</p>}

        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            //onChange={(e) => setLastName(e.target.value)}
            type="text"
            {...register("lastName", { required: true, maxLength: 10 })}
          />
        </Form.Field>
        {errors.lastName && <p>Please check the Last Name</p>}
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            //onChange={(e) => setEmail(e.target.value)}
            type="email"
            {...register("email", { required: true })}
          />
        </Form.Field>
        {errors.email && <p>Please check the Email</p>}

        <Form.Field>
          <label>Contact</label>
          <input
            placeholder="Contact"
            // onChange={(e) => setContact(e.target.value)}
            type="number"
            {...register("contact", {
              required: true,
              minLength: 10,
              maxLength: 10,
            })}
          />
        </Form.Field>
        {errors.contact && <p>Contact must be of 10 characters</p>}

        <Button color="green" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Create;

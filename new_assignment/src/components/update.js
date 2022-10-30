import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(false);
  const [contact, setContact] = useState("");
  const [id, setID] = useState(null);

  useEffect(() => {
    setID(localStorage.getItem("_id"));
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
    setEmail(localStorage.getItem("Email"));
    setContact(localStorage.getItem("contact"));
  }, []);

  const updateAPIData = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      contact.length !== 10
    ) {
    } else {
      axios
        .put(`http://localhost:4000/update/${id}`, {
          firstName,
          lastName,
          email,
          contact,
        })
        .then(() => {
          navigate("/");
        });
    }
  };
  const backHandler = () => {
    navigate("/");
  };
  return (
    <div>
      <Button primary onClick={backHandler}>
        Back
      </Button>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
          />
        </Form.Field>

        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </Form.Field>

        <Form.Field>
          <label>Contact</label>
          <input
            placeholder="Contact"
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
            }}
            type="number"
          />
        </Form.Field>
        {contact.length !== 10 && <p>Contact must be 10 characters long.</p>}
        <Button color="green" onClick={updateAPIData} type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};
export default Update;

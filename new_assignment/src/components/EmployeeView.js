import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeView = () => {
  const [APIData, setAPIData] = useState([]);

  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/");
  };
  useEffect(() => {
    const id = localStorage.getItem("_id");
    axios.get(`http://localhost:4000/view/${id}`).then((response) => {
      setAPIData(response.data);
    });
  }, []);
  return (
    <div>
      <Button primary onClick={backHandler}>
        Back
      </Button>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Employee Id</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Contact</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>{APIData.emp_id}</Table.Cell>
            <Table.Cell>{APIData.firstName}</Table.Cell>
            <Table.Cell>{APIData.lastName}</Table.Cell>
            <Table.Cell>{APIData.email}</Table.Cell>
            <Table.Cell>{APIData.contact}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default EmployeeView;

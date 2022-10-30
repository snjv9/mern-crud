import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Read = () => {
  const navigate = useNavigate();
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/`).then((response) => {
      setAPIData(response.data);
    });
  }, []);

  const setId = (_id) => {
    localStorage.setItem("_id", _id);
  };
  const setData = (data) => {
    let { _id, firstName, lastName, email, contact } = data;
    localStorage.setItem("_id", _id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Email", email);
    localStorage.setItem("contact", contact);
  };
  const getData = () => {
    axios.get(`http://localhost:4000/`).then((getData) => {
      setAPIData(getData.data);
    });
  };
  const onDelete = (_id) => {
    axios.delete(`http://localhost:4000/delete/${_id}`).then(() => {
      getData();
    });
  };
  const addEmployeehandler = () => {
    navigate("/create");
  };
  return (
    <div>
      <div>
        <h2 className="sub-header">Employees List</h2>
      </div>
      <div>
        <Button color="blue" onClick={addEmployeehandler}>
          Add Employee
        </Button>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Contact</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {APIData.map((data) => {
              return (
                <Table.Row>
                  <Table.Cell>{data.firstName}</Table.Cell>
                  <Table.Cell>{data.lastName}</Table.Cell>
                  <Table.Cell>{data.email}</Table.Cell>
                  <Table.Cell>{data.contact}</Table.Cell>
                  <Table.Cell>
                    <Link to={"/view/"}>
                      <Button
                        onClick={() => {
                          setId(data._id);
                        }}
                      >
                        View
                      </Button>
                    </Link>
                    <Link to={"/update"}>
                      <Button color="teal" onClick={() => setData(data)}>
                        Update
                      </Button>
                    </Link>

                    <Button color="red" onClick={() => onDelete(data._id)}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
export default Read;

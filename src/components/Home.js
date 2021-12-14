import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddUser from "./Users/AddUser";
import { AppContext } from "./Context.js";
const Home = () => {

  const [tabValue, settabValue] = useState("admin");
  const [pageno, setpageno] = useState(1);

  const [openModal, setOpenModal] = useState(false);

  const [users, setUsers] = useContext(AppContext);

  useEffect(() => {
    loadUsers();
  }, [tabValue, pageno]);

  const nextpage = () => {
    if (users[tabValue].length < 5) {
      console.log("not data found");
    }
    else {
      setpageno(pageno + 1)
    }

  }
  const previouspage = () => {
    if (pageno > 1) {
      setpageno(pageno-1)
    }
  }

  const loadUsers = async () => {
    const result = await axios.get(
      `https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=${tabValue}&page=${pageno}&limit=${5}`
    );

    // console.log(users[tabValue]);
    // result.data.reverse();
    const tempUser = { ...users }
    tempUser[tabValue] = result.data
    setUsers(tempUser);
  };


  const deleteUser = async (id) => {
    await axios.delete(
      `https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`
    );
    loadUsers();
  };

  return (
    <div className="home-container">
      <div className="container">

        {openModal && (
          <AddUser closeModal={setOpenModal} settabValue={settabValue} />
        )}

        <div className="top">
          <h3 className="page-title">Users List</h3>
          <Link
            className="back-button-home"
            id="addUser"
            onClick={() => setOpenModal(true)}
            to="/"
          >
            Add User
          </Link>
        </div>
        <hr />

        <div className={openModal === false ? "tabshow" : "tabhide"}>
          <button
            className={tabValue === "admin" ? "admin" : "button"}
            id="admin"
            name="mytabs"
            checked="checked"
            onClick={() => {
              settabValue("admin");
              setpageno(1)
            }
            }
          >
            Admin
          </button>
          <button
            className={tabValue === "employee" ? "employee" : "button"}
            id="employee"
            name="mytabs"
            checked="checked"
            onClick={() => {
              settabValue("employee");
              setpageno(1)
            }
            }
          >
            Employee
          </button>

          <div className="tab">
            <table class="table">
              <thead>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                {tabValue === 'employee' ? (<><th scope="col">Division</th>
                  <th scope="col">District</th></>) : (<></>)}

                <th scope="col">User Type</th>
                <th scope="col">Details View</th>
              </thead>
              <tbody>

                {users &&
                  users[tabValue].map((user) => (
                    <tr>
                      <td data-label="First Name">{user.first_name}</td>
                      <td data-label="Last Name">{user.last_name} </td>
                      {tabValue === 'employee' ? (<><td data-label="Division">{user.division}</td>
                        <td data-label="District">{user.district}</td></>) : (<></>)}
                      <td data-label="User Type">{user.user_type}</td>
                      <td data-label="Details View">
                        <Link className="btn-primary" to={`/user/${user.id}`}>
                          Details
                        </Link>
                        <Link
                          className="btn-warn"
                          onClick={() => deleteUser(user.id)}
                          to='/'
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="bottom-button">
              <p> Page No: {pageno}</p>
              <div className="back-forw-btn">
                <button onClick={() => previouspage()} class="next-btn">Previous</button>
                <button onClick={() => nextpage()} class="previous-btn">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

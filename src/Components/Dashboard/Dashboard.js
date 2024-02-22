import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import Header from '../Header/Header';
import axios from 'axios';
const getUserById = async (userId) => {
  try {
    const storageUser = JSON.parse(localStorage.getItem('user'));

    const headers = {
      'Content-Type': 'application/json', // Set the content type header
      'Authorization': `Bearer ${storageUser?.token}` // Set the token header
    };

    const response = await axios.get(`http://localhost:5000/users/${userId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};


const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      // Parse the user data from localStorage
      const storageUser = JSON.parse(localStorage.getItem('user'));
      // Check if the user data exists and has an id property
      if (storageUser && storageUser.id) {
        const userData = await getUserById(storageUser.id);
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {/* <h1>This is a Secret page</h1>
      <button onClick={handleLogout}>Logout</button> */}
      <Header />
      <section style={{ backgroundColor: '#eee' }} >

        <MDBContainer className="py-5">
          <MDBCol>

            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>

          </MDBCol>


          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid />

                  <p className="text-muted mb-4">{user?.username ? user?.username : '-'}</p>

                </MDBCardBody>
              </MDBCard>


            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>User Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{user?.username ? user?.username : '-'}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{user?.email ? user?.email : '-'}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Profiles</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{user.profiles.map((p) => p).join(', ')}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>


            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
};

export default Dashboard

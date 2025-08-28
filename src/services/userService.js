import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { backend_url } from "../environment";
//import { setUser } from "../store/slices/userSlice";
//import store from "../store";

const createUser = async (data) => {
  try {
    const response = await axios.post(`${backend_url}/signup`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (id, data) => {
  try {
    const response = await axios.put(`${backend_url}/userpassword/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const changePermissionType = async (id, data) => {

  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.patch(`${backend_url}/usertype/${id}`, data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {

  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.delete(`${backend_url}/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {

  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.get(`${backend_url}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    } catch (error) {
      throw error;
    }
  };

const getUser = async (id) => {

  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.get(`${backend_url}/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (data) => {
  try {
    const response = await axios.post(`${backend_url}/login`, data);

    const token = response.data;
    localStorage.setItem('authToken', token);

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    localStorage.setItem("userId", userId);
    //const role = decoded.type;

    //store.dispatch(setUser({ name: userId, type: role }));

    return userId;
  } catch (error) {
    throw error;
  }
};

const logoutUser = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('authToken')
};

const verifyIsAdminUser = async () => {

  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.get(`${backend_url}/isadmin`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  createUser,
  changePassword,
  changePermissionType,
  deleteUser,
  getUsers,
  getUser,
  loginUser,
  logoutUser,
  verifyIsAdminUser
};
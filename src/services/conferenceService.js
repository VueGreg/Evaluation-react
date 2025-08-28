import axios from "axios";
import { backend_url } from "../environment";

const createConference = async (data) => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.post(
      `${backend_url}/conference`,
      data,
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

const deleteConference = async (id) => {

  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.delete(`${backend_url}/conference/${id}`,
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

const getConferences = async () => {
  try {
    const response = await axios.get(`${backend_url}/conferences`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getConference = async (id) => {
  try {
    const response = await axios.get(`${backend_url}/conferences/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateConference = async (id, data) => {
  try {

    const token = localStorage.getItem('authToken');

    const response = await axios.patch(`${backend_url}/conference/${id}`,
       data,
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

export {
  createConference,
  deleteConference,
  getConferences,
  getConference,
  updateConference
};
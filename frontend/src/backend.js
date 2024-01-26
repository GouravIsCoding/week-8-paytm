import axios from "axios";
const baseUrl = "http://localhost:3000/api/v1";

async function postSignup(data) {
  try {
    const response = await axios.post(`${baseUrl}/user/signup`, data);
    return { message: response.data.message };
  } catch (error) {
    return { error: error.response.data.message };
  }
}

async function postLogin(data) {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, data);
    return { message: "login successfull", token: response.data.token };
  } catch (error) {
    return { error: error.response.data.message };
  }
}

async function getBalance(token) {
  try {
    const response = await axios.get(`${baseUrl}/account/balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { balance: response.data.balance };
  } catch (error) {
    return { error: error.response.data.message };
  }
}

async function getFilterUsers(filter, token) {
  try {
    const response = await axios.get(`${baseUrl}/user/bulk?filter=${filter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { users: response.data.users };
  } catch (error) {
    return { error: error.response.data.message };
  }
}

async function postTransfer(to, amount, token) {
  try {
    const response = await axios.post(
      `${baseUrl}/account/transfer`,
      { to, amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { message: response.data.message };
  } catch (error) {
    return { error: error.response.data.message };
  }
}

export { postSignup, postLogin, getBalance, getFilterUsers, postTransfer };

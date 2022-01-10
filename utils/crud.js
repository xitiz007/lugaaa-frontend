const baseURL = process.env.BASE_URL;
import axios from "../utils/axios";

export const getCategories = async () => {
  let categories = [];
  try {
    const response = await axios.get("/categories");
    categories = response.data.categories;
  } catch (err) {}
  return categories;
};

export const getProducts = async (query) => {
  const { sortBy, page = 1, category = "all", price, search } = query;
  let data = {};
  try {
    const response = await axios.get(
      `/products?sortBy=${sortBy}&page=${page}&category=${category}&price=${
        price ? price : ""
      }&search=${search ? search : ""}`
    );
    data = response.data;
  } catch (err) {
    console.log(err.message);
  }

  return data;
};

export const getProductDetail = async (id) => {
  try {
    const response = await axios.get(`/products/${id}`);
    return response.data.product;
  } catch (err) {
    return null;
  }
};

export const postOrder = async (data, accessToken) => {
  try {
    const response = await axios.post("/orders/create", data, {
      headers: {
        Authorization: accessToken,
      },
    });
    return { ...response.data, error: false };
  } catch (err) {
    return { message: err.response.data.message, error: true };
  }
};

export const updateProfile = async (data, accessToken) => {
  try {
    const response = await axios.put("/users/updateProfile", data, {
      headers: {
        Authorization: accessToken,
      },
    });
    return { error: false, message: response.data.message };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const getOrders = async (accessToken) => {
  try {
    const response = await axios.get("/orders", {
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data.orders;
  } catch (err) {
    return []
  }
};


export const deliverOrder = async (id, accessToken) => {
  try {
    const response = await axios.put(
      `/orders/${id}/delivered`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );
    return {
      error: false,
      message: response.data.message,
      date: response.data.date,
    };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const getUsers = async (accessToken) => {
  try {
    const response = await axios.get("/users", {
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data.users;
  } catch (err) {
    return [];
  }
};

export const updateRole = async (id, role, accessToken) => {
  try {
    const response = await axios.put(`/users/updateRole/${id}`, role, {
      headers: {
        Authorization: accessToken,
      },
    });
    return { error: false, message: response.data.message };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const deleteUser = async (id, accessToken) => {
  try {
    const response = await axios.delete(`/users/${id}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return { error: false, message: response.data.message };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const addCategory = async (category, accessToken) => {
  try {
    const response = await axios.post("/categories/create", category, {
      headers: {
        Authorization: accessToken,
      },
    });
    return {
      error: false,
      message: response.data.message,
      category: response.data.category,
    };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const deleteCategory = async (id, accessToken) => {
  try {
    const response = await axios.delete(`/categories/delete/${id}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return { error: false, message: response.data.message };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const updateCategory = async (id, category, accessToken) => {
  try {
    const response = await axios.put(`/categories/edit/${id}`, category, {
      headers: {
        Authorization: accessToken,
      },
    });
    return {
      error: false,
      message: response.data.message,
      category: response.data.category,
    };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const createProduct = async (formData, accessToken) => {
  try {
    const response = await axios.post(`/products/create`, formData, {
      headers: {
        Authorization: accessToken,
      },
    });
    return { error: false, message: response.data.message };
  } catch (err) {
    return { message: err.response.data.message, error: true };
  }
};

export const updateProduct = async (id, formData, accessToken) => {
  try {
    const response = await axios.put(`/products/${id}`, formData, {
      headers: {
        Authorization: accessToken,
      },
    });
    return { error: false, message: response.data.message };
  } catch (err) {
    return { message: err.response.data.message, error: true };
  }
};

export const uploadImages = async (images) => {
  const uploadedImages = [];
  for (const image of images) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.CLOUD_UPDATE_PRESET);
    formData.append("cloud_name", process.env.CLOUD_NAME);

    const response = await fetch(process.env.CLOUD_UPLOAD_API, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      uploadedImages.push({ public_id: data.public_id, url: data.secure_url });
    }
  }
  return uploadedImages;
};

export const verifyPayment = async (data, accessToken) => {
  try {
    const response = await axios.post("/orders/verifyRequest", data, {
      headers: {
        Authorization: accessToken,
      },
    });
    return { error: false, message: response.data.message };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const getPayments = async (accessToken) => {
  try {
    const response = await axios.get("/orders/payments", {
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data.payments;
  } catch (err) {
    return [];
  }
};

export const deletePaymentVerifyRequest = async (id, accessToken) => {
  try {
    const response = await axios.delete(`/orders/${id}/paymentRequest`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return { error: false, message: response.data.message };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const setOrderPaid = async (id, data, accessToken) => {
  try {
    const response = await axios.put(`/orders/${id}/orderPaid`, data, {
      headers: {
        Authorization: accessToken,
      },
    });
    return { error: false, message: response.data.message };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const deleteOrder = async (id, accessToken) => {
  try {
    const response = await axios.delete(`/orders/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
    return { error: false, message: response.data.message };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const setOrderReceived = async (id, accessToken) => {
  try {
    const response = await axios.put(
      `orders/${id}/orderReceived`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );
    return { error: false, message: response.data.message };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const deleteProduct = async (id, accessToken) => {
  try {
    const response = await axios.delete(`products/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
    return { error: false, message: response.data.message };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

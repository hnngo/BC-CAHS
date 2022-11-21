import axios from "axios";

const formatAPIURL = (url) => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:8000" + url;
  } else {
    // EC2 public v4 DNS
    return "http://ec2-18-213-81-12.compute-1.amazonaws.com" + url;
  }
};

export const get = async (url, headers = {}) => {
  try {
    const { data } = await axios.get(formatAPIURL(url), {
      headers: {
        ...headers
      },
      withCredentials: true
    });

    return { ...data };
  } catch (err) {
    return { error: -1, ...err.response.data };
  }
};

export const post = async (url, body, headers = {}) => {
  try {
    const { data } = await axios.post(formatAPIURL(url), body, {
      headers: {
        ...headers
      },
      withCredentials: true
    });
    return { ...data };
  } catch (err) {
    return { error: -1, ...err.response.data };
  }
};

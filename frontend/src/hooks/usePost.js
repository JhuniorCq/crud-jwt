import { useState } from "react";
import axios from "axios";

export const usePost = () => {
  const [statePost, setStatePost] = useState({
    responsePost: null,
    loadingPost: false,
    errorPost: null,
  });

  const postData = async (url, body, options = {}) => {
    setStatePost({ ...statePost, loadingPost: true });
    try {
      const { data } = await axios.post(url, body, options);

      setStatePost({
        responsePost: data,
        loadingPost: false,
        errorPost: null,
      });
    } catch (error) {
      const errorMessage = error.response?.data.message ?? error.message;
      console.error("", errorMessage ?? error.message);

      setStatePost({
        responsePost: null,
        loadingPost: false,
        errorPost: errorMessage ?? error.message,
      });
    }
  };

  return {
    ...statePost,
    postData,
  };
};

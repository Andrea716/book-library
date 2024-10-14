import axios from 'axios';

const API_BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (query, type) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.json`, {
      params: {
        [type]: query,
      },
    });
    return response.data.docs;
  } catch (error) {
    throw error;
  }
};

export const getBookDetails = async (isbn) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/books`, {
      params: {
        bibkeys: `ISBN:${isbn}`,
        format: 'json',
        jscmd: 'data',
      },
    });
    return response.data[`ISBN:${isbn}`];
  } catch (error) {
    throw error;
  }
};

import axios from "axios";
import { credentials } from "../config";

export const getChildrenApi = async (pageNumber = 0, pageSize = 10) => {
  try {
    const response = await axios.get(
      `https://tryfamly.co/api/daycare/tablet/group`,
      {
        params: credentials,
      }
    );
    if (response.data) {
      const { children } = response.data;
      return {
        children: children.slice(
          (pageNumber - 1) * pageSize,
          pageNumber * pageSize
        ),
        total: response.data.children.length,
      };
    }
  } catch (err) {
    console.error(`Fetch Error: ${err}`);
  }
};

export const checkInChildApi = async (childId, pickupTime) => {
  return axios.post(`https://tryfamly.co/api/v2/children/${childId}/checkins`, {
    accessToken: credentials.accessToken,
    pickupTime,
  });
};

export const checkOutChildApi = async (childId) => {
  return axios.post(`https://tryfamly.co/api/v2/children/${childId}/checkout`, {
    accessToken: credentials.accessToken,
  });
};

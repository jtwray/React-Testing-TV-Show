import axios from "axios";

export const fetchShow = () => {
  return axios
    .get(
      "a"
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return console.error(error);
    });
};

import API from "./api";

export const getMeals = async () => {
  const res = await API.get("/meals");
  return res.data;
};

export const getMealById = async (id) => {
  const res = await API.get(`/meals/${id}`);
  return res.data;
};
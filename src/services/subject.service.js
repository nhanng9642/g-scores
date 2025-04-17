import { fetchData } from "./util";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080/api/v1";
const URL = `${BASE_URL}/subject`;

export const getSubjects = () => fetchData(`${URL}`);

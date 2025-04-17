import { fetchData } from "./util";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080/api/v1";
const URL = `${BASE_URL}/score`;

export const getScoreById = (id) => fetchData(`${URL}/${id}`);

export const getReport = (id) => fetchData(`${URL}/${id}/report`);

export const getTopScoreGroupA = () => fetchData(`${URL}/group/A`);

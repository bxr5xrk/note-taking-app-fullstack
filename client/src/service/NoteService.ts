import axios from "axios";

const $host = axios.create({
    baseURL: "http://localhost:4000",
});
// http://localhost:4000/api/notes
export const getNotes = async () => {
    const { data } = await $host.get("api/notes");
    return await data;
};

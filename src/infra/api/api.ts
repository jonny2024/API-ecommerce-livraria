import express from "express";
import routes from "../../routes/routes";

const api = express();
api.use(express.json());
api.use(routes);

export default api;

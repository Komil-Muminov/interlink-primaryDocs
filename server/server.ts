import express, { Request, Response, Router } from "express";
import createUser from "./routes/users/createUser";
import userRoutes from "./routes/users";
import organizationsRoutes from "./routes/organizations";
import cors from "cors";

// const router = Router();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/organizations", organizationsRoutes);

// app.use(router);
app.use(express.static("uploads"));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT} порту`);
});

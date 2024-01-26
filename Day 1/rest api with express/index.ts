import { log } from "console";
import express, { Request, Response, Application } from "express";

const PORT = 8000;
const app: Application = express();
app.use(express.json());

type TUser = {
  id: number;
  name: string;
};

type TUsers = TUser[];

const users: TUsers = [
  { id: 1, name: "Andy" },
  { id: 2, name: "Andrew" },
  { id: 3, name: "Ashley" },
];

//CRUD
//READ
app.get("/", (req: Request, res: Response) => {
  res.send({ message: `GET TOTAL: ${users.length}`, users });
});

//CREATE
app.post("/", (req: Request, res: Response) => {
  const { name }: { name: string } = req.body;
  const newUser = {
    id: users[users.length - 1].id + 1,
    name,
  };

  users.push(newUser);
  res.send({ message: "Post", user: newUser });
});

// UPDATE
app.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const userIndex = users.findIndex((user) => user.id === Number(id));

  if (userIndex === -1) {
    return res.status(500).send({ message: "update failed" });
  }

  users[userIndex] = { ...users[userIndex], ...body };

  res.send({ message: "Update", data: users[userIndex] });
});

//DELETE
app.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === Number(id));
  if (userIndex === -1) {
    return res.status(500).send({ message: "id not found" });
  }
  users.splice(userIndex, 1);
  res.send({ message: "DELETED", data: users });
});

//query
// app.get("/api", (req: Request, res: Response) => {
//   const { query } = req;
//   res.status(200).send({ message: "api", query });
// });

//param
// app.get("/api/:id", (req: Request, res: Response) => {
//   const { query, params } = req;
//   res.status(200).send({ message: "api", query, params });
// });

//body
// app.post("/api", (req: Request, res: Response) => {
//   const { body } = req;

//   res.status(201).send({ message: "post api", body });
// });

app.listen(PORT, () => {
  console.log(`App Runs on port ${PORT}`);
});

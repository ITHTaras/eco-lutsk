import express, { Request, Response } from "express";
import { PrismaClient } from "prisma/prisma-client";
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(cors());

const prisma = new PrismaClient();

// Create category
app.post("/", async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const category = await prisma.category.create({
    data: {
      name: name,
      description: description,
    },
  });

  res.json(category);
});

app.get("/", async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  res.json(categories);
});

app.listen(5000, () => {
  console.log("Running on 5000");
});

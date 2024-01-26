import express, { Router, Request, Response, NextFunction } from "express";

type Expense = {
  id: number;
  name: string;
  nominal: number;
  category: string;
  date: Date;
};

type manyExpense = Expense[];

const Expenses: manyExpense = [
  { id: 1, name: "pizza", nominal: 5, category: "Food", date: new Date() },
  { id: 2, name: "burger", nominal: 10, category: "Food", date: new Date() },
  {
    id: 3,
    name: "laptop",
    nominal: 10,
    category: "Technology",
    date: new Date(),
  },
  {
    id: 4,
    name: "tiket",
    nominal: 10,
    category: "stuff",
    date: new Date("2022-12-31T17:00:00.000Z"),
  },
];

export const expensesController = {
  getAll(req: Request, res: Response, next: NextFunction) {
    res.send({ message: `GET TOTAL: ${Expenses.length}`, Expenses });
  },

  //Get list of Expenses
  getList(req: Request, res: Response, next: NextFunction) {
    const expenseName = Expenses.map((expense) => expense.name);
    res.send({ message: `GET TOTAL: ${Expenses.length}`, expenseName });
  },

  //Get detail of expenses
  getDetail(req: Request, res: Response, next: NextFunction) {
    const expenseID = Number(req.params.id);
    const expenseDetail = Expenses.find((expense) => expense.id == expenseID);

    res.send({ message: " ini detail expense", data: expenseDetail });
  },

  //Add expenses
  addExpense(req: Request, res: Response, next: NextFunction) {
    const { name, nominal, category, date } = req.body;
    const newExpense = {
      id: Expenses[Expenses.length - 1].id + 1,
      name,
      nominal,
      category,
      date: new Date(date),
    };
    Expenses.push(newExpense);
    return res.send({ data: newExpense });
  },

  //Edit expense
  editExpense(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { body } = req;
    const index = Expenses.findIndex((expense) => expense.id === Number(id));

    if (index == -1) {
      return res.status(500).send({ message: "id not found" });
    }

    const editExpense: Expense = {
      id: Expenses[index].id,
      name: body.name || Expenses[index].name,
      nominal: body.nominal || Expenses[index].nominal,
      category: body.category || Expenses[index].category,
      date: body.date || Expenses[index].date,
    };

    Expenses[index] = editExpense;

    return res.send({ message: "Update success", data: Expenses[index] });
  },

  //Delete Expense
  deleteExpense(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const Index = Expenses.findIndex((expense) => expense.id == Number(id));
    if (Index == -1) {
      return res.status(500).send({ message: "id not found" });
    }

    Expenses.splice(Index, 1);
    return res.send({ message: "data deleted" });
  },

  // Get total Expense by date range
  getByDate(req: Request, res: Response, next: NextFunction) {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).send({
        message:
          "Both startDate and endDate are required in the query parameters.",
      });
    }

    const startDateTime = new Date(startDate as string);
    const endDateTime = new Date(endDate as string);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return res.status(400).send({
        message: "Invalid date format. Please provide dates in valid format.",
      });
    }

    const filter = Expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDateTime && expenseDate <= endDateTime;
    });

    const totalExpense = Expenses.reduce((sum, expense) => {
      const expenseDate = new Date(expense.date);

      if (expenseDate >= startDateTime && expenseDate <= endDateTime) {
        return sum + Number(expense.nominal);
      }

      return sum;
    }, 0);

    res.send({
      data: filter,
      message: `Total expense between ${startDateTime.toISOString()} and ${endDateTime.toISOString()}: ${totalExpense}`,
    });
  },

  // Get total expense by category
  getByCategory(req: Request, res: Response, next: NextFunction) {
    const category = req.query.category;
    const search = req.query.category ? String(req.query.category) : "";

    if (!search) {
      return res.status(400).send({
        message: "CATEGORY NOT FOUND",
      });
    }

    const filter = Expenses.filter((expense) => {
      return expense.category.includes(search);
    });

    const totalExpense = filter.reduce((sum, expense) => {
      return sum + expense.nominal;
    }, 0);

    res.send({
      data: filter,
      message: `total expense of ${category} is ${totalExpense}`,
    });
  },
};

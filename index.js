const express = require("express");
const app = express();
const cors = require("cors");
const dbActions = require("./dbFunctions");

app.use(cors());
app.use(express.json());

app.post("/api/auth", async (req, res) => {
  console.log(req.body);

  const user = req.body;

  const result = await dbActions.authenticateUser(user);

  if (result.error) {
    return res.status(500).send(result);
  }

  return res.json(result);
});

app.post("/api/groceries", async (req, res) => {
  const grocery = req.body;

  console.log(grocery);

  return res.json(grocery);
});

app.get("/api/groceries/:familyId", async (req, res) => {
  const familyId = req.params.familyId;

  const groceries = await dbActions.getGroceries(familyId);

  res.json(groceries);
});

app.patch("/api/groceries", async (req, res) => {
  const groceryId = req.body.groceryId;
  const familyId = req.body.familyId;

  const result = await dbActions.updateGroceryStatus(familyId, groceryId);

  if (result) {
    res.send({ id: groceryId });
  } else {
    res.sendStatus(500);
  }
});

app.listen(9002, () => {
  console.log("Node server started on port 9002");
});

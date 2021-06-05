const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://cyrusfps:3502Duck@cluster0.zx6s2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Admin version of getUsers(), returns passwords aswell
const getUsersAdmin = async () => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const users = await client
      .db("user-application")
      .collection("users")
      .find()
      .toArray();

    return users;
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

const authenticateUser = async (user) => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const users = await getUsersAdmin();

    let returnedUserArr = users.filter(
      (serverUser) =>
        serverUser.username === user.username &&
        serverUser.password === user.password
    );

    if (returnedUserArr.length === 1) {
      returnedUser = {
        id: returnedUserArr[0].id,
        username: returnedUserArr[0].username,
      };
      return returnedUser;
    } else {
      return { error: "User not found" };
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

const getGroceries = async (familyId) => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const id = parseInt(familyId);

  try {
    const family = await client
      .db("user-application")
      .collection("families")
      .find({ id })
      .toArray();

    const groceries = family[0].list;

    return groceries;
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

const updateGroceryStatus = async (familyId, groceryId) => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const family = await client
      .db("user-application")
      .collection("families")
      .find({ id: familyId })
      .toArray();

    const groceries = family[0].list.map((grocery) => {
      if (grocery.id === groceryId) {
        grocery.inCart = !grocery.inCart;
        return grocery;
      } else {
        return grocery;
      }
    });

    const result = await client
      .db("user-application")
      .collection("families")
      .updateOne({ id: familyId }, { $set: { list: groceries } });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    client.close();
  }
};

exports.updateGroceryStatus = updateGroceryStatus;
exports.authenticateUser = authenticateUser;
exports.getGroceries = getGroceries;

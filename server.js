//база и регистрация
const express = require("express");
const sql = require("mssql/msnodesqlv8");
const path = require("path");

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const dbConfig = {
  connectionString:
     "Driver={ODBC Driver 17 for SQL Server};Server=A402ЗPCPREPOD;Database=Kodinets_tower_up;Trusted_Connection=Yes;",
  driver: "msnodesqlv8",
};

app.get("/users", async (req, res) => {
  const connection = await sql.connect(dbConfig);

  const result = await connection.request().query("SELECT * FROM dbo.user");

  res.json(result.recordset);
});

app.post("/registration", async (req, res) => {
  const { login, password } = req.body;
  const connection = await sql.connect(dbConfig);

  await connection
    .request()
    .input("login", sql.VarChar, login)
    .input("password", sql.VarChar, password)
    .query(`
      INSERT INTO dbo.user ( login, password)
      VALUES (@login, @password)
    `);

  res.send("OK");
});

app.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    const connection = await sql.connect(dbConfig);

    const result = await connection
      .request()
      .input("login", sql.VarChar, login)
      .input("password", sql.VarChar, password)
      .query(`
        SELECT * FROM dbo.user
        WHERE name = @name AND password = @password
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({
        message: "Invalid login or password",
      });
    }

    res.json({
      message: "Login successful",
      user: result.recordset[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login error",
    });
  }
});


app.listen(3000, () => {
  console.log("Server started on port 3000!, http://localhost:3000");
});

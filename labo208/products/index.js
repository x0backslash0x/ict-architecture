const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

app.get("/get_product_data", async (req, res) => {

    try {
        const [rows] = await db.execute(
            "SELECT * FROM Products",
        );

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "database error" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

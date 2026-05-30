const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

/* interface order {
    product_id: number;
    customer_id: number;
    date: date; // yyyy-mm-dd hh:mm:ss
} */

function pad2(n) {
  return n.toString().padStart(2, "0");
}

app.get("/get_order_data", async (req, res) => {

    try {
        const [rows] = await db.execute(
            "SELECT * FROM Orders",
        );

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "database error" });
    }
});

// order data toevoegen
app.post("/add_order_data", async (req, res) => {
    const product_id = req.query.product_id;
    const customer_id = req.query.customer_id;
    const currentDate = new Date();
    const year   = currentDate.getFullYear();
    const month  = pad2(currentDate.getMonth() + 1); // 0-11 -> 1-12
    const day    = pad2(currentDate.getDate());
    const hours   = pad2(currentDate.getHours());
    const minutes = pad2(currentDate.getMinutes());
    const seconds = pad2(currentDate.getSeconds());
    const datetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    console.log ("Inserting order");

    if (!product_id || !customer_id) {
        return res.status(400).json({ error: "gegevens onvolledig" });
    }

    try {
        const query = `INSERT INTO Orders VALUES ("${product_id}", "${customer_id}", "${datetime}")`;
        const [result] = await db.query(query);

        if (result.affectedRows == 0) {
            return res.status(500).send("query failed");
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "database error" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

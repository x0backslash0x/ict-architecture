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

function get_datetime() {
    const currentDate = new Date();
    const year   = currentDate.getFullYear();
    const month  = pad2(currentDate.getMonth() + 1); // 0-11 -> 1-12
    const day    = pad2(currentDate.getDate());
    const hours   = pad2(currentDate.getHours());
    const minutes = pad2(currentDate.getMinutes());
    const seconds = pad2(currentDate.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// order data ophalen
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
    const datetime = get_datetime();
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

// order data bijwerken (op basis van datum)
// alle velden zijn vereist
app.put("/update_order_data_by_date", async (req, res) => {
    const date = decodeURI(req.query.date);
    const new_product_id = req.query.product_id;
    const new_customer_id = req.query.customer_id;
    const new_datetime = get_datetime();

    if (!date || !new_product_id | !new_customer_id) {
        return res.status(400).json({ error: "gegevens onvolledig" });
    }

    try {
        console.log(`updating order with date ${date}`);
        const query = `
            UPDATE Orders
            SET product_id = "${new_product_id}", customer_id = "${new_customer_id}", date = "${new_datetime}"
            WHERE date = "${date}"
        `

        const [result] = await db.query(query);

        if (result.changedRows == 0) {
            return res.status(500).json({ error: "query failed"});
        }

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "database error"});
    }
});

// order data verwijderen (op basis van datum)
app.delete("/remove_order_data_by_date", async (req, res) => {
    // %20 vertalen in witruimte voor MySQL compatibiliteit
    const date = decodeURI(req.query.date);

    if (!date) {
        return res.status(400).json({ error: "datum is vereist" });
    }

    try {
        console.log("Deleting order with date " + date)
        const query = `DELETE FROM Orders WHERE date = "${date}"`
        const [result] = await db.query(query);

        if (result.affectedRows == 0) {
            return res.status(400).json({ error: "query failed"})
        }

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "database error"});
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

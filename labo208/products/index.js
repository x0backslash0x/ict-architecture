const express = require("express");
const db = require("./db");

/* interface product {
    product_id: number;
    description: number;
    price: float;
} */

// product data ophalen
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

// product data toevoegen
app.post("/add_product_data", async (req, res) => {
    const product_id = req.query.product_id;
    const description = req.query.description;
    const price = req.query.price;
    console.log ("Inserting product");

    if (!product_id || !description || !price) {
        return res.status(400).json({ error: "gegevens onvolledig" });
    }

    try {
        const query = `INSERT INTO Products VALUES ("${product_id}", "${description}", "${price}")`;
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

// product data verwijderen (op basis van id)
app.delete("/remove_product_data_by_id", async (req, res) => {
    // %20 vertalen in witruimte voor MySQL compatibiliteit
    const product_id = decodeURI(req.query.product_id);

    if (!product_id) {
        return res.status(400).json({ error: "id is vereist" });
    }

    try {
        console.log("Deleting product with id " + product_id)
        const query = `DELETE FROM Products WHERE id = "${product_id}"`
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

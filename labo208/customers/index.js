const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

app.get("/get_customer_data_by_email", async (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ error: "e-mail is vereist" });
    }

    try {
        const [rows] = await db.execute(
            "SELECT * FROM Customers WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "klant bestaat niet" });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "database error" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

/* interface customer {
    id: number;
    first_name: String;
    last_name: String;
    email: String;
} */

// customer data opvragen (op basis van email adres)
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

// customer data toevoegen
app.post("/add_customer_data", async (req, res) => {
    const id = req.query.id;
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const email = req.query.email;
    console.log (`INSERTING
        id: ${id}
        first name: ${first_name}
        last name: ${last_name}
        email: ${email}
        `)

    if (!id || !first_name || !last_name || !email) {
        return res.status(400).json({ error: "gegevens onvolledig" });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO Customers VALUES ("${id}", "${first_name}", "${last_name}", "${email}")`
        );

        if (result.affectedRows == 0) {
            return res.status(500).send("query failed")
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "database error" });
    }
});

// custom data bijwerken (op basis van email adres)
// alle velden zijn vereist
app.put("/update_customer_data", async (req, res) => {
    const email = req.query.email;
    const new_id = req.query.new_id;
    const new_first_name = req.query.new_first_name;
    const new_last_name = req.query.new_last_name;
    const new_email = req.query.new_email;

    if (!email || !new_id || !new_first_name || !new_last_name || !new_email) {
        return res.status(400).json({ error: "gegevens onvolledig" });
    }

    try {
        console.log(`updating Customer with email ${email}`);
        const query = `
            UPDATE Customers
            SET id = "${new_id}", first_name = "${new_first_name}", last_name = "${new_last_name}", email = "${new_email}"
            WHERE email = "${email}"
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

// customer data verwijderen (op basis van email adres)
app.delete("/remove_customer_data", async (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ error: "e-mail is vereist" });
    }

    try {
        console.log("Deleting customer with email " + email)
        const [result] = await db.query(`DELETE FROM Customers WHERE email = "${email}"`);

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

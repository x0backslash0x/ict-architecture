const express = require("express");

const app = express();
app.use(express.json());

// hou telkens de laatste 2 timestamps bij
const secrets = {
    "abc": [],
    "def": [],
    "ghi": []
};

app.get("/get_customer_data_by_email", async (req, res) => {
    const email = req.query.email;
    // zou je normaal niet via query parameter doen!
    const secret = req.query.secret;

    if (Object.keys(secrets).includes(secret)) {
        const now = Date.now();
        if (secrets[secret].length < 2) {
            secrets[secret].push(now);
            response = await fetch(`http://customers:3000/get_customer_data_by_email?email=${email}`);
            console.debug(response);
            contents = await response.json();
            res.json(contents);
        }
        else {
            let allowed = false;
            for (let timestamp of secrets[secret]) {
                if (now - timestamp >= 60_000) {
                    allowed = true;
                }
            }
            if (allowed) {
                if (secrets[secret].length == 2) {
                    secrets[secret].shift();
                }
                secrets[secret].push(now);
                response = await fetch(`http://customers:3000/get_customer_data_by_email?email=${email}`);
                contents = await response.json();
                res.json(contents);
            }
            else {
                res.status(400).send("Rate limit overschreden, wacht nog even.");
            }
        }
    }
    else {
        res.status(401).send("Ongeldig secret.");
    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

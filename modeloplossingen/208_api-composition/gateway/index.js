const express = require("express");

const app = express();
app.use(express.json());

app.get("/get_customer_data_by_email", async (req, res) => {
    const email = req.query.email;

    customersResponse = await fetch(`http://customers:3000/get_customer_data_by_email?email=${email}`);
    customersContents = await customersResponse.json();
    customerId = customersContents.id;

    productsResponse = await fetch(`http://products:3000/get_product_data`);
    productsContents = await productsResponse.json();

    ordersResponse = await fetch(`http://orders:3000/get_order_data`);
    ordersContents = await ordersResponse.json();

    const joinResults = [];
    for (let order of ordersContents) {
        if (order.customer_id === customerId) {
            const product = productsContents.find((p) => p.id === order.product_id);
            joinResults.push({ date: order.date, product: product.name, current_price: product.price });
        }
    }
    res.json({ name: customersContents.name, orders: joinResults });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

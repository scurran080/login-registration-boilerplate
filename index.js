const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth',require("./routes/jwtAuth"));

app.listen(5000, () => {
    console.log("Server is running on port 5000.");
})

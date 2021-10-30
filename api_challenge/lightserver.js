const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const PORT = 8000;
const HOST = "0.0.0.0";

const app = express();
app.use("/static", express.static("public"));
app.use(express.json());
const appdir = __dirname;

app.get("/", (req, res) => {
    fs.readFile(`${appdir}/app.html`)
    .then(content => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(content);
        return;
    })
    .catch(err => {
        res.writeHead(404);
        res.end("SOMETHING WENT WRONG");
    })

    

});

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);
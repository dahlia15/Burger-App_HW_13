var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "burger_db"
});

connection.connect(function(err, res) {
    if (err) {
       console.log("error connecting " + err.stack)
    }
    console.log("connected as id " + connection.threadId)
});

//render
app.get("/", function(req, res) {
    connection.query("SELECT * FROM burgerList", function(err, data) {
        if (err) {
            res.status(500).end();
        }
        return res.render("index", {burger : data})
    })
});

//api route
app.post("/api/burgers", function(req, res) {
    connection.query("INSERT INTO burgerList (burger) VALUE (?)", [req.body.burger], function(err,data) {
        if (err) {
            res.status(500).end();
        }
        res.json({id: data.resultId});
        console.log({id: data.resultId})
    })
});

//api route
app.put("/api/burgers/:id", function(req, res) {
    connection.query("UPDATE burgerList SET burger=? WHERE id=?", [req.body.burger], [req.params.id], function(err,result) {
        if (err) {
            res.status(500).end();
        }
        else if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    })

})

//api route
app.delete("/api/burgers/:id", function(req, res) {
    connection.query("DELETE FROM burgerList WHERE id=?", [req.params.id], function(err, result){
        if (err) {
            res.status(500).end()
        }
        else if (result.affectedRows === 0) {
            res.status(400).end();
        }
        res.status(200).end();
    })
})

app.listen(PORT,function() {
    console.log("Now connected at http://localhost:" + PORT)
})
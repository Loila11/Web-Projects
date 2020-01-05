const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidv1 = require('uuid/v1');
const fs = require("fs");
const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.post("/users", (req, res) => {
    const userList = readJSONFile();
    const newUser = req.body;
    newUser.id = uuidv1();
    userList.push(newUser);
    writeJSONFile(userList);
    res.json(newUser);
});

app.get("/users/:id", (req, res) => {
    const userList = readJSONFile();
    const id = req.params.id;
    let flag = false;
    let user;

    userList.forEach(currentUser => {
        if (id == currentUser.id) {
            flag = true;
            user = currentUser;
        }
    });

    if (flag) {
        res.json(user);
    } else {
        res.status(404).send('User ${id} was not found');
    }
});

app.get("/users", (req, res) => {
    const userList = readJSONFile();
    res.json(userList);
});

app.put("/users/:id", (req, res) => {
    const userList = readJSONFile();
    const id = req.params.id;
    const newUser = req.body;

    newUser.id = id;
    let flag = false;

    const newUserList = userList.map((user) => {
        if (user.id == id) {
            flag = true;
            return newUser;
        }
        return user;
    });

    writeJSONFile(newUserList);

    if (flag == true) {
        res.json(newUser);
    } else {
        res.status(404).send('User ${id} was not found');
    }
});

app.delete("/users/:id", (req, res) => {
    const userList = readJSONFile();
    const id = req.params.id;
    const newUserList = userList.filter((user) => user.id != id);

    if (userList.length !== newUserList.length) {
        res.status(200).send('User ${id} was removed');
        writeJSONFile(newUserList);
    } else {
        res.status(404).send('User ${id} was not found');
    }
});

function readJSONFile() {
    return JSON.parse(fs.readFileSync("login.json"))["users"];
}

function writeJSONFile(content) {
    fs.writeFileSync(
        "login.json",
        JSON.stringify({users: content}),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

app.listen("3000", () =>
    console.log("Server started at: http://localhost:3000")
);
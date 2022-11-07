import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

const tweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }

    users.push({
        id: users.length + 1,
        username,
        avatar,
    });

    res.sendStatus(201);
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;

    if (!username || !tweet) {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }

    const { avatar } = users.find((user) => user.username === username);

    tweets.push({
        avatar,
        username,
        tweet,
    });

    res.sendStatus(201);
});

app.get("/tweets", (req, res) => {
    const recentTweets = tweets.slice(-10);

    res.send(recentTweets.reverse());
});

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;

    const userExist = tweets.find((user) => user.username === username);

    if (!userExist) {
        res.status(400).send("Usuário não encontrado!");
        return;
    }

    const allTweets = tweets.filter((twt) => twt.tweet);

    res.send(allTweets);
});

app.listen(5000, () => {
    console.log(chalk.bold.cyan("[Listening ON] Port: 5000."));
});

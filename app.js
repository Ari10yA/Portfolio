import express from "express";
import sgMail from "@sendgrid/mail";
import { readFileSync } from "node:fs";
import "dotenv/config";

const metaData = JSON.parse(
    readFileSync(new URL("./metadata.json", import.meta.url), "utf8"),
);
const app = express();
const port = process.env.PORT || 4000;

const API_KEY = process.env.API_KEY;

sgMail.setApiKey(API_KEY);

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("views", "public");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {
        path: "/",
        mainProjects: metaData.HomePageProjects,
    });
});

app.get("/contact", (req, res) => {
    res.render("Contact/contact", {
        path: "/contact",
    });
});

app.post("/contact", (req, res) => {
    const { email, name, message } = req.body;

    const text = `From : ${email} , I am ${name}, ${message}`;

    const msg = {
        to: "arityakhamrui.work@gmail.com", // Replace with your email address
        from: "khamruiaritya.2.3.5.ak@gmail.com", // Replace with your SendGrid email
        subject: "Inquiry",
        text: text,
    };

    sgMail
        .send(msg)
        .then(() => {
            res.redirect("/contact");
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error sending email");
        });
});

app.get("/projects", (req, res) => {
    res.render("Projects/project", {
        path: "/projects",
        projectsData: metaData.ProjectsData,
    });
});

app.get("/experience", (req, res) => {
    res.render("Experience/experience", {
        path: "/experience",
        experiences: metaData.Experiences,
    });
});

app.get("/about", (req, res) => {
    res.render("AboutMe/about", {
        path: "/about",
        skills: metaData.Skill,
    });
});

app.listen(port, () => {});

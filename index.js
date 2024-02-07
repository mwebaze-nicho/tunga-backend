const express = require("express");
const persons = require("./persons");

const app = express();

//Route for all persons
app.get("/api/persons", (req, res) => {
  res.send(persons);
});

//Retrieving individual person route
app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);

  //Getting person with matching id
  const OnePerson = persons.find((person) => person.id === id);

  //Sending response
  if (OnePerson) {
    res.send(OnePerson);
  } else {
    res.status(404).send(`Person with id ${id} not found`);
  }
});

//Checking info route
app.get("/info", (req, res) => {
  const date = new Date();
  const personsLength = persons.length;

  if (personsLength > 0) {
    res.send(
      `<span>Phonebook has info for ${personsLength} people</span> <br/> <span>${date.toLocaleString()}</span>`
    );
  } else {
    res.status(404).send("No info found");
  }
});

//Setting port
const PORT = 3001 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let animals = [
  {
    id: "1",
    title: "Lion King",
    description: "The king of the savanna. Very proud and strong, loves to roar.",
    expense: 150,
    type: "cat",
    img: "img/cat.jpg",
  },
  {
    id: "2",
    title: "Buddy",
    description: "A friendly golden retriever. Loves to play fetch.",
    expense: 80,
    type: "dog",
    img: "img/dog.jpg",
  },
  {
    id: "3",
    title: "Polly",
    description: "A colorful parrot that can repeat words and loves fruit.",
    expense: 30,
    type: "parrot",
    img: "img/parrot.jpg",
  },
  {
    id: "4",
    title: "Hammy",
    description: "A small and curious hamster. Runs on his wheel all night.",
    expense: 10,
    type: "hamster",
    img: "img/hamster.jpg",
  },
  {
    id: "5",
    title: "Shelly",
    description: "A wise old turtle. Moves slowly, eats slowly.",
    expense: 5,
    type: "turtle",
    img: "img/turtle.jpg",
  },
  {
    id: "6",
    title: "Simba",
    description: "Another cat, but this one is small and playful.",
    expense: 40,
    type: "cat",
    img: "img/cat2.jpg",
  },
];

const typeImages = {
  cat: "img/cat.jpg",
  dog: "img/dog.jpg",
  parrot: "img/parrot.jpg",
  hamster: "img/hamster.jpg",
  turtle: "img/turtle.jpg",
};

app.get("/api/animals", (req, res) => {
  res.json(animals);
});

app.get("/api/animals/:id", (req, res) => {
  const { id } = req.params;
  const animal = animals.find((a) => a.id === id);
  if (animal) {
    res.json(animal);
  } else {
    res.status(404).json({ message: "Animal not found" });
  }
});

app.post("/api/animals", (req, res) => {
  const { title, description, expense, type } = req.body;

  if (!title || !description || !expense || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newAnimal = {
    id: Date.now().toString(),
    title,
    description,
    expense: Number(expense),
    type,
    img: typeImages[type] || "img/default.png",
  };

  animals.unshift(newAnimal);
  res.status(201).json(newAnimal);
});

app.put("/api/animals/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, expense, type } = req.body;

  const animalIndex = animals.findIndex((a) => a.id === id);

  if (animalIndex === -1) {
    return res.status(404).json({ message: "Animal not found" });
  }

  const updatedAnimal = {
    ...animals[animalIndex],
    title,
    description,
    expense: Number(expense),
    type,
    img: typeImages[type] || "img/default.png",
  };

  animals[animalIndex] = updatedAnimal;
  res.json(updatedAnimal);
});

app.delete("/api/animals/:id", (req, res) => {
  const { id } = req.params;
  const animalIndex = animals.findIndex((a) => a.id === id);

  if (animalIndex === -1) {
    return res.status(404).json({ message: "Animal not found" });
  }

  animals.splice(animalIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
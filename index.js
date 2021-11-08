const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let message ='';

let pokemon = [
  {
    number:'001',
    name:'Bulbasaur',
    image:"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    type1:"Grama",
    type2: 'Venenoso',
    description: 'Há uma semente de planta em suas costas desde o dia em que o Pokémon nasceu. A semente cresce lentamente.',
    height: '0.7',
    weight: '6.9',
    category: 'Semente',
    abilities: 'Overgrow', 
  },
  {
    number:'002',
    name:'Ivysaur',
    image:"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
    type1:"Grama",
    type2: 'Venenoso',
    description: 'Quando o bulbo em suas costas fica grande, ele parece perder a capacidade de ficar em pé sobre as patas traseiras.',
    height: '1.0',
    weight: '13.0',
    category: 'Semente',
    abilities: 'Overgrow', 
  },
  {
    number:'003',
    name:'Venusaur',
    image:"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png",
    type1:"Grama",
    type2: 'Venenoso',
    description: 'Sua planta floresce quando está absorvendo energia solar. Ele permanece em movimento para buscar a luz solar.',
    height: '2.0',
    weight: '100.0',
    category: 'Semente',
    abilities: 'Overgrow', 
  },
]

app.get("/", (req, res) => { 
  setTimeout(() => {
    message = "";
  }, 1000);

  res.render("index", {
      pokemons: pokemon,
      message
    }
  );
    
}); 

app.get("/cadastro", (req, res) => {
  res.render("cadastro")
});

app.post("/sent", (req, res) => {
  const {
    number, 
    name,
    type1,
    type2,
    image,
    description,
    height,
    weight,
    category,
    abilities  
  } = req.body;

  const objeto= {
    number: number, 
    name: name,
    type1: type1,
    type2: type2,
    image: image,
    description: description,
    height: height,
    weight: weight,
    category: category,
    abilities: abilities,  
  };

  pokemon.push(objeto)
  res.redirect("/");
  message = 'Seu pokémon foi capturado com sucesso!'
})

app.get("/detalhes", (req, res) => {
  res.render("detalhes")
})

app.get("/detalhes/:number", (req, res) => {
  res.render("detalhes", {pokemons: pokemon.filter(i => i.number === req.params.number), number: req.params.number});
});

app.listen ( port, () => 
  console.log(`Servidor rodando em localhost:${port}`));
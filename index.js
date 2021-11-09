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
    number:'133',
    name:'Eevee',
    image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/133.png',
    type1:'Normal',
    type2: '',
    description: 'Ele tem a capacidade de alterar a composição de seu corpo para se adequar ao ambiente circundante.',
    height: '0.3',
    weight: '6.5',
    category: 'Evolução',
    abilities: 'Run Away / Adaptability', 
  },
  {
    number:'134',
    name:'Vaporeon',
    image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/134.png',
    type1:'Água',
    type2: '',
    description: 'Quando as barbatanas de Vaporeon começam a vibrar, é um sinal de que a chuva virá dentro de algumas horas.',
    height: '1.0',
    weight: '29.0',
    category: 'Bubble Jet',
    abilities: 'Water Absorb', 
  },
  {
    number:'135',
    name:'Jolteon',
    image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/135.png',
    type1:'Elétrico',
    type2: '',
    description: 'Se ele estiver com raiva ou assustado, o pelo de todo o corpo eriçar-se-á como agulhas afiadas que perfuram os inimigos.',
    height: '0.8',
    weight: '24.5',
    category: 'Raio',
    abilities: 'Volt Absorb', 
  },
  {
    number:'136',
    name:'Flareon',
    image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/136.png',
    type1:'Fogo',
    type2: '',
    description: 'Depois de armazenar calor suficiente, a temperatura corporal deste Pokémon pode chegar a até 1.700 graus Fahrenheit.',
    height: '0.9',
    weight: '25.0',
    category: 'Chama',
    abilities: 'Flash Fire', 
  },
  {
    number:'196',
    name:'Espeon',
    image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/196.png',
    type1:'Psíquico',
    type2: '',
    description: 'Ao ler as correntes de ar, ele pode prever coisas como o clima ou o próximo movimento de seu inimigo.',
    height: '0.9',
    weight: '26.5',
    category: 'Sol',
    abilities: 'Synchronize', 
  },
  {
    number:'197',
    name:'Umbreon',
    image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/197.png',
    type1:'Noturno',
    type2: '',
    description: 'Quando este Pokémon fica zangado, seus poros secretam um suor venenoso, que espirra nos olhos do oponente.',
    height: '1.0',
    weight: '27.0',
    category: 'Luar',
    abilities: 'Synchronize', 
  },
  {
    number:'470',
    name:'Leafeon',
    image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/470.png',
    type1:'Grama',
    type2: '',
    description: 'Gálários preferem o aroma distinto que vem das folhas deste Pokémon. Existe um perfume popular feito com esse perfume.',
    height: '1.0',
    weight: '25.5',
    category: 'Verdejante',
    abilities: 'Leaf Guard', 
  },
  {
    number:'471',
    name:'Glaceon',
    image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/471.png',
    type1:'Gelo',
    type2: '',
    description: 'Qualquer um que se tornar cativado pela beleza da neve que Glaceon cria será congelado antes que perceba.',
    height: '0.8',
    weight: '25.9',
    category: 'Neve Fresca',
    abilities: 'Snow Cloak', 
  },
  {
    number:'700',
    name:'Sylveon',
    image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/700.png',
    type1:'Fada',
    type2: '',
    description: 'Ao liberar ondas de apagamento de inimizade de suas antenas em forma de fita, Sylveon interrompe qualquer conflito.',
    height: '1.0',
    weight: '23.5',
    category: 'Entrelaçando',
    abilities: 'Cute Charm', 
  },
]

app.get("/", (req, res) => { 
  setTimeout(() => {
    message = "";
  }, 1000);

  res.render("index", {
      pokemons: pokemon.sort((a ,b) => a.number - b.number),
      message
    },
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
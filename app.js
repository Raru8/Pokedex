//Variaveis globais

let nome = document.querySelector(".name-poke");
let id = document.querySelector(".id-poke");
let pic = document.querySelector(".picture");
let tp = document.querySelector(".type");
let type = document.querySelector(".primary-type");
let body = document.querySelector("body");
let hp = document.querySelector(".hp");
let attack = document.querySelector(".attack");
let defense = document.querySelector(".defense");
let speed = document.querySelector(".speed");
let sp_attack = document.querySelector(".sp-attack");
let sp_defense = document.querySelector(".sp-defense");
let searchPoke = document.querySelector(".sp");
let searchID = document.querySelector(".sid");
let btn_search = document.querySelectorAll(".search_button");

//Const

const colors = {
  bug: "rgb(111, 185, 0)",
  dark: "rgb(75, 71, 90)",
  dragon: "rgb(24, 112, 185)",
  electric: "#ffd443",
  fairy: "rgb(243, 136, 214)",
  fighting: "rgb(208, 73, 96)",
  fire: "rgb(255, 164, 28)",
  flying: "rgb(124, 153, 224)",
  ghost: "rgb(134, 121, 204)",
  grass: "rgb(70, 203, 122)",
  ground: "rgb(209, 139, 70)",
  ice: "rgb(125, 225, 221)",
  normal: "rgb(116, 125, 132)",
  poison: "rgb(217, 75, 196)",
  psychic: "rgb(255, 141, 124)",
  rock: "rgb(203, 184, 101)",
  steel: "rgb(39, 122, 142)",
  water: "rgb(94, 186, 224)",
};

const poke = {
  id: "",
  nome: "",
  sprites: "",
  type: "",
  type2: "",
};

const api = {
  base: "https://pokeapi.co/api/v2/pokemon",
};

function getPokemon(value) {
  fetch(`${api.base}/${value}`)
    .then(function (response) {
      let data = response.json();

      return data;
    })
    .then(function (data) {
   

      poke.name = data["name"];
      poke.id = `#${data["id"]}`;
      poke.sprites =
        data["sprites"]["other"]["official-artwork"]["front_default"];
      poke.type = data["types"]["0"]["type"]["name"];
      poke.hp = data["stats"]["0"]["base_stat"];
      poke.attack = data["stats"]["1"]["base_stat"];
      poke.defense = data["stats"]["2"]["base_stat"];
      poke.speed = data["stats"]["5"]["base_stat"];
      poke.sp_attack = data["stats"]["3"]["base_stat"];
      poke.sp_defense = data["stats"]["4"]["base_stat"];
      console.log(data);
    })
    .then(function () {
      displayPoke();
    });
}

function displayPoke() {
  const img = `<img src="${poke.sprites}".png/>`;
  const typeImg = `<img src="types/${poke.type}.png" data-adaptive-background />`;
  const color = colors[poke.type];

  nome.innerHTML = poke.name;
  pic.innerHTML = img;
  type.innerHTML = typeImg;
  id.innerHTML = poke.id;
  hp.innerHTML = `HP: ${poke.hp}`;
  attack.innerHTML = `Attack: ${poke.attack}`;
  defense.innerHTML = `Defense: ${poke.defense}`;
  sp_attack.innerHTML = `SP Attack: ${poke.sp_attack}`;
  sp_defense.innerHTML = `SP Defense: ${poke.sp_defense}`;
  speed.innerHTML = `Speed: ${poke.speed}`;
  body.style.backgroundColor = color;
}

window.onload = function () {
  let value = searchPoke.value;
  getPokemon(value);
};

function enter(event) {
  let value = searchPoke.value;

  key = event.keyCode;
  if (key === 13) {
    getPokemon(value);
  }
  console.log(value);
}

function enter_Second(event) {
  let value = searchID.value;

  key = event.keyCode;
  if (key === 13) {
    getPokemon(value);
  }
  console.log(value);
}

for (let btn of btn_search) {
  btn.addEventListener("click", () => {
    let value = searchPoke.value;
    getPokemon(value);
  });
}

searchPoke.addEventListener("keypress", enter);
searchID.addEventListener("keypress", enter_Second);

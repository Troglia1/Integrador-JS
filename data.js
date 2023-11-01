const productsData = [
  {
    id: 1,
    title: "Mortal Kombat Armageddon",
    category: ["Peleas", "Accion"],
    price: 9.6,
    imagefront: "./img/Armageddon.jpg",
    imageback: "./img/ArmageddonBack.jpg",
  },
  {
    id: 2,
    title: "God Of War 2",
    category: ["Peleas", "Accion"],
    price: 13.059,
    imagefront: "img/GodOfWar2.jpg",
    imageback: "img/GodOfWar2Back.jpg",
  },
  {
    id: 3,
    title: "Resident Evil 4",
    price: 8.99,
    category: ["Peleas", "Accion"],
    imagefront: "img/Resident.jpg",
    imageback: "img/ResidentBack.webp",
  },
  {
    id: 4,
    title: "Jak And Dexter",
    category: ["Aventura", "Accion"],
    price: 14.99,
    imagefront: "img/Jak.png",
    imageback: "img/JakBack.jpg",
  },
  {
    id: 5,
    title: "Mortal Kombat Shaolin Monks",
    category: ["Peleas", "Aventura"],
    price: 14.99,
    imagefront: "img/MKSM.jpg",
    imageback: "img/MKSMBack.webp",
  },
  {
    id: 6,
    title: "Dragon Ball: Budokai Tenkaichi 3",
    category: ["Peleas", "Aventura"],
    price: 27.99,
    imagefront: "img/DBZ.jpg",
    imageback: "img/DBZBack.jpg",
  },
  {
    id: 7,
    title: "God Of War",
    category: ["Aventura", "Accion"],
    price: 14.99,
    imagefront: "img/GodOfWar.jpg",
    imageback: "img/GodOfWarBack.webp",
  },
  {
    id: 8,
    title: "Black",
    category: ["Aventura", "Accion"],
    price: 12.199,
    imagefront: "img/Black.jpg",
    imageback: "img/BlackBack.jpg",
  },
  {
    id: 9,
    title: "Bully",
    category: ["Peleas", "Accion", "Aventura"],
    price: 9.449,
    imagefront: "img/Bully.webp",
    imageback: "img/BullyBack.jpg",
  },
  {
    id: 10,
    title: "The Simpsons: Hit And Run",
    category: ["Aventura"],
    price: 17.699,
    imagefront: "img/Simpsons.jpg",
    imageback: "img/SimpsonsBack.jpg",
  },
  {
    id: 11,
    title: "Def Jam Fight: New York",
    category: ["Peleas"],
    price: 4.399,
    imagefront: "img/DefJam.jpg",
    imageback: "img/DefJamBack.webp",
  },
  {
    id: 12,
    title: "Grand Theft Auto: San Andreas",
    category: ["Peleas", "Accion", "Aventura"],
    price: 13.999,
    imagefront: "img/GTA.jpg",
    imageback: "img/GTABack.jpg",
  },
];

const splitProducts = (size) => {
  let dividedProducts = [];
  for (i = 0; i < productsData.length; i += size) {
    dividedProducts.push(productsData.slice(i, i + size));
  }
  return dividedProducts;
};

const productsController = {
  dividedProducts: splitProducts(12),
  nextProductsIndex: 1,
  productsLimit: splitProducts(12).length,
};

require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Product = require("../models/Product");


const MONGODB_URL = process.env.MONGODB_URL;

// PRODUCT DATA
const products = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    description: "Apple iPhone 17 Pro latest flagship smartphone.",
    variants: [
      {
        title: "256GB Deep Blue",
        price: 134900,
        mrp: 149900,
        images: [
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762408926/products/ubbyllzs7xtt7xu4lc47.webp",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762408928/products/kok2rbfngvbfhv6l3ume.webp",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762408929/products/qrtddi5twurnkzb1fx3i.webp"
        ]
      },
      {
        title: "256GB Cosmic Orange",
        price: 134900,
        mrp: 149900,
        images: [
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762408931/products/hfyc8ogiril7og2gkzod.webp",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762408933/products/mwmfgqlwax2urztxwvqt.webp",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762410514/products/n45xvugf3kqsdxrplloo.webp"
        ]
      },
      {
        title: "256GB Silver",
        price: 134900,
        mrp: 149900,
        images: [
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762410516/products/bsyh6chn9e2rckinolay.webp",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762410517/products/wawqmni9l0t6im8ijbov.webp",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762410518/products/xriawdbhxokzenvlrice.webp"
        ]
      }
    ],
    emiPlans: [
      { name: "3 Months EMI", tenureMonths: 3, monthly: 38221, interestRate: 0, cashback: "" },
      { name: "6 Months EMI", tenureMonths: 6, monthly: 21442, interestRate: 1.7, cashback: "" },
      {name: "9 Months EMI", tenureMonths: 9, monthly: 15281, interestRate: 1.8, cashback: "" },
      { name: "12 Months EMI",  tenureMonths: 12, monthly: 12106, interestRate: 1.9, cashback: "" }
    ]
  },

  // OnePlus 12
  {
    name: "OnePlus 12",
    slug: "oneplus-12",
    description: "OnePlus 12 Premium Smartphone.",
    variants: [
      {
        title: "256GB Glacial White",
        price: 64999,
        mrp: 69999,
        images: [
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762410520/products/vmtiggvfaafpexs8vqb1.webp",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762412802/products/yoc6b9ubrpbpoej1eqb1.webp",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762412805/products/jyjolqwi2b3k6akh3e4y.webp"
        ]
      },
      {
        title: "256GB Silky Black",
        price: 64999,
        mrp: 69999,
        images: [
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762412806/products/yqkhz9bjhh6qkxk4mapq.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762412807/products/kryvdkld3txrjwa2nqil.webp",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762412810/products/dhqgq6gd3jkwxco1nfw4.webp"
        ]
      },
      {
        title: "256GB Flowy Emerald",
        price: 64999,
        mrp: 69999,
        images: [
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762413882/products/oxdsod0gmge3lrbm2fcf.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762413883/products/tjvkayzmpwj5w0ueaz36.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762413884/products/ghmkxupn3d0ygksvxjbc.webp",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762413885/products/cjwsuqaq4o81a2dy6inh.webp"
        ]
      }
    ],
    emiPlans: [
      {name: "3 Months EMI", tenureMonths: 3, monthly: 21500, interestRate: 0, cashback: "" },
      { name: "6 Months EMI", tenureMonths: 6, monthly: 11500, interestRate: 1.4, cashback: "" },
      { name: "9 Months EMI",  tenureMonths: 9, monthly: 7900, interestRate: 1.8, cashback: "" }
    ]
  },

  // Samsung S24 Ultra
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    description: "Samsung S24 Ultra Flagship Android Smartphone.",
    variants: [
      {
        title: "256GB Titanium Orange",
        price: 129999,
        mrp: 139999,
        images: [
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762413888/products/inrzk2oxnxeesv22krrl.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414257/products/spwupgbe4ooll6r1spav.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414260/products/ojttcmch5p93olg4mhlj.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414265/products/r3he3w45d2eszbftk1bi.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414269/products/xnakdyzlrkstwfkt77ru.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414274/products/pbjgxfa5rnvdcclhbcv7.png"
        ]
      },
      {
        title: "256GB Titanium Green",
        price: 129999,
        mrp: 139999,
        images: [
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414360/products/q5br7xykflydzldegaan.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414364/products/xbkh7unr4q9uaprsawjx.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414368/products/rszaph1jxnxopdsdui92.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414371/products/sokzyquu5yfgrkoe2zrs.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414373/products/n00kisykxlvqbszxwohm.png"
        ]
      },
      {
        title: "256GB Titanium Blue",
        price: 129999,
        mrp: 139999,
        images: [
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414539/products/ry9mmwjuby4jvm4fhnoo.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414543/products/dqqnfv6kzqksroybaxc9.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414546/products/bhv48f29szhhpbxoghca.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414548/products/kgahusyqgomdki8zrl4c.png",
          "https://res.cloudinary.com/dfo3otbrh/image/upload/v1762414551/products/kzux15qrtye4luy40vwk.png"
        ]
      }
    ],
    emiPlans: [
      {name: "3 Months EMI", tenureMonths: 3, monthly: 43500, interestRate: 0, cashback: "" },
      {name: "6 Months EMI",  tenureMonths: 6, monthly: 22900, interestRate: 1.6, cashback: "" },
      {name: "12 Months EMI", tenureMonths: 12, monthly: 12500, interestRate: 1.9, cashback: "" }
    ]
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log(" Connected to database");

    await Product.deleteMany({});
    console.log("🗑 Old product data cleared");

    await Product.insertMany(products);
    console.log(" New product data inserted successfully");

    process.exit();
  } catch (err) {
    console.error(" Error while seeding:", err);
    process.exit(1);
  }
}

seedDB();

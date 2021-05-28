const fake = require("faker");
const axios = require("axios");
const { Route } = require("react-router");
// const { get } = require("./routes");
/*
restaurant_review_date string varchar(10)
restaurant_review free text long text
restaurant_review_rating double double
--------------------------------------------------------------------------------------
Favorite Restaurants Table
user_id* int int
restaurant_id* int int
--------------------------------------------------------------------------------------
Crypto Wallet Table
wallet_id* int int
crypto_name free text 64 chars varchar(64)
crypto_balance double double
--------------------------------------------------------------------------------------
*/


// For cuisines:
var cuisines = ["Sushi","Chinese","Korean","BBQ","Fine Dining","Wings","Burgers", "Pastries", "Pizza"]
var cryptoCurrencies = ["Bitcoin","Ethereum","DogeCoin","Ethereum Classic","Basic Attention Token","Mana"]

// console.log(getReview());
function getReview() {
  const restaurant_id = getRandomArbitrary(0, 101);
  const restaurant_review = fake.lorem.paragraph();
  const rating = getRandomArbitrary(1, 5);
  console.log(restaurant_id,restaurant_review)
  return { restaurant_id, restaurant_review, rating };
}

// console.log(getRandomInt())
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// console.log(getAddress())
function getAddress() {
  const street = fake.address.streetAddress();
  const city = fake.address.city();
  const state = fake.address.stateAbbr();
  const zip = fake.address.zipCode();
  const phone = fake.phone.phoneNumberFormat();
  const website = fake.internet.url();

  return { street, city, state, zip, phone, website };
}

// console.log(getRestaurantName())
function getRestaurant() {
  const name = fake.animal.bird().replace(/'/g, "\\'");
  const addressStreet = fake.address.streetAddress().replace(/'/g, "\\'");
  const addressCity = fake.address.city().replace(/'/g, "\\'");
  const addressState = fake.address.stateAbbr().replace(/'/g, "\\'");
  const addressZip = fake.address.zipCode().replace(/'/g, "\\'");
  const rating = getRandomArbitrary(0, 5);
  const cuisine = cuisines[getRandomArbitrary(0, 8)];
  const phone = fake.phone.phoneNumberFormat().replace(/'/g, "\\'");
  const website = fake.internet.url().replace(/'/g, "\\'");
  return { name,addressStreet,addressCity, addressState, addressZip, rating,cuisine,phone,website };
}

// console.log(getRestaurantName())
function getUser() {
  var first_name = fake.name.firstName().replace(/'/g, "\\'");
  var last_name = fake.name.lastName().replace(/'/g, "\\'");
  var age = getRandomInt(18,70);
  var street = fake.address.streetAddress().replace(/'/g, "\\'");
  var city = fake.address.city().replace(/'/g, "\\'");
  var state = fake.address.stateAbbr().replace(/'/g, "\\'");
  var zip = fake.address.zipCode().replace(/'/g, "\\'");

  return { first_name, last_name, age, street, city, state, zip };
}

// console.log(getRestaurantName())
function getLastName() {
  const restaurantName = fake.animal.bird();
  return { restaurantName };
}

// console.log(getMenuItem())
function getMenuItem() {
  var restaurant_id =  getRandomArbitrary(0, 101);
  var menu_item = [fake.animal.fish(),fake.animal.snake(),fake.animal.bear(),fake.animal.cow(),fake.animal.type(), "Chicken Wings", "Chicken Nuggets","Steak","French Fries","Pepperoni Pizza", "Cheese Pizza", "Sesamie Chicken", "Rice", "Baked Potato","Fried Pickles"][getRandomInt(0,14)];
  var price = fake.commerce.price(5,150)
  console.log(restaurant_id)

  return { restaurant_id, menu_item, price };
  
}


// console.log(getCuisine)

function getCuisine() {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(({ data }) => {
      if (!data) {
        console.log("No meal found!");
      } else {
        return data.meals[0].strArea;
      }
    })
    .catch((error) => console.log(error));
}

// console.log(getMenuPrice())
function getMenuPrice() {
  const min = 5.0;
  const max = 30.0;
  const precision = 100;
  let randomnum =
    Math.floor(
      Math.random() * (10 * precision - 1 * precision) +
        1 * precision * (max - min) +
        min
    ) /
    (1 * precision);

  return randomnum;
}

// for (let i = 0; i < 100; i++) {
//   console.log(getReview());
// }

function convertToCSV(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  return str;
}
// let arr = [];
// for (let i = 0; i < 100; i++) {
//   arr.push(getReview());
// }
// console.log(convertToCSV(arr));

module.exports = {
  getMenuPrice,
  getCuisine,
  getMenuItem,
  getReview,
  getRestaurant,
  getAddress,
  getUser,
};

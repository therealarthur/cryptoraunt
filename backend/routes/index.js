// Loads app server using express.
const express = require("express");
const morgan = require("morgan");
const router = express.Router();
const db = require("../db");
const fake = require("./../fake.js");

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/////////////
/////////////
/////////////
/////////////
/////////////
// DEV CODE//
/////////////
/////////////
/////////////
/////////////
/////////////

router.post("/generate/users", async (req, res, next) => {
  try {
    for (var x = 0; x < 50; x++) {
      var person = fake.getUser();
      let results = await db.createUser(person); // To test validity of this function, swap out req.body with myRestauarant
      console.log(
        "Created User: ",
        x,
        "Named:",
        person.first_name,
        person.last_name
      );
    }
    res.json("finito");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/generate/restaurants", async (req, res, next) => {
  try {
    for (var x = 0; x < 100; x++) {
      console.log(obj);
      var obj = fake.getRestaurant();
      let results = await db.createRestaurant(obj); // To test validity of this function, swap out req.body with myRestauarant
      console.log("Created Entry: ", x);
    }
    res.json("finito");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/generate/reviews", async (req, res, next) => {
  try {
    for (var x = 0; x < 900; x++) {
      var obj = fake.getReview();
      let results = await db.createReview(obj); // To test validity of this function, swap out req.body with myRestauarant
      console.log("Created Entry: ", x);
    }
    res.json("finito");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/generate/menu_items", async (req, res, next) => {
  try {
    for (var x = 0; x < 1651; x++) {
      var obj = fake.getMenuItem();
      let results = await db.createMenuItem(obj); // To test validity of this function, swap out req.body with myRestauarant
      console.log("Created Entry: ", x, obj.restaurant_id);
    }
    res.json("finito");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/generate/cryptocurrencies", async (req, res, next) => {
  var cryptoCurrencies = [
    "Bitcoin",
    "Ethereum",
    "DogeCoin",
    "Ethereum Classic",
    "Basic_Attention_Token",
    "Mana",
  ];
  try {
    for (var x = 1; x < 102; x++) {
      used = [];
      amnt = getRandomArbitrary(1, 5);
      for (var y = 0; y < amnt; y++) {
        console.log("building restaurant: ", x);
        val = getRandomArbitrary(1, 5);
        while (used.includes(val)) {
          val = getRandomArbitrary(0, 6);
        }
        used.push(val);
        var obj = { restaurant_id: x, cryptocurrency: cryptoCurrencies[val] };
        let results = await db.createCurrency(obj); // To test validity of this function, swap out req.body with myRestauarant
      }
    }
    res.json("finito");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/generate/favorites", async (req, res, next) => {
  try {
    for (var x = 1; x < 552; x++) {
      used = [];
      amnt = getRandomArbitrary(0, 25);
      for (var y = 0; y < amnt; y++) {
        console.log("adding favorites for user: ", x);
        val = getRandomArbitrary(1, 101); //ID of random restaurant
        while (used.includes(val)) {
          val = getRandomArbitrary(1, 101);
        }
        used.push(val);
        console.log(used);
        var obj = { user_id: x, restaurant_id: val };
        let results = await db.createFavorite(obj); // To test validity of this function, swap out req.body with myRestauarant
      }
    }
    res.json("finito");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

/////////////
/////////////
/////////////
/////////////
/////////////
// DEV CODE//
//// END ////
/////////////
/////////////
/////////////
/////////////

// Returns all users
// http://localhost:6969/api/users
router.get("/users", async (req, res, next) => {
  try {
    let results = await db.all_users();
    console.log("fetched all users");
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/user/:id/favorites", async (req, res, next) => {
  try {
    const { id } = req.params;
    let menu = await db.getUserFavorites(id);
    console.log("fetched favorites");
    res.json(menu);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/restaurants", async (req, res, next) => {
  try {
    let results = await db.all_restaurants();
    console.log("fetched all restaurants");
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/restaurant/reviews/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let results = await db.reviewsForRestaurant(id);
    console.log("fetched reviews for restaurant with id: ", id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/restaurants/in/:state", async (req, res, next) => {
  try {
    const { state } = req.params;
    let results = await db.restaurants_in_state(state);
    console.log("fetched restaurants in: ", state);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Takes single id peram
router.get("/restaurants/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let results = await db.restaurant_by_id(id);
    console.log("fetched single restauarant");
    res.json(results[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Get restaurant reviews
router.get("/restaurants/:id/reviews", async (req, res, next) => {
  try {
    const { id } = req.params;
    let reviews = await db.reviewsForRestaurant(id);
    console.log("fetched restauarant reviews");
    res.json(reviews);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Get restaurant menu
router.get("/restaurants/:id/menu", async (req, res, next) => {
  try {
    const { id } = req.params;
    let menu = await db.get_menu(id);
    console.log("fetched restaurant menu");
    res.json(menu);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/restaurants/crypto/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    let menu = await db.get_restaurants_with_crypto(name);
    console.log("fetched restaurant list");
    res.json(menu);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/restaurant/cuisine/:cuisine", async (req, res, next) => {
  try {
    const { cuisine } = req.params;
    let idk = await db.restaurantCuisine(cuisine);
    console.log("fetched restauarnts with cuisine: ", cuisine);
    res.json(idk);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get(
  "/restaurant/cuisine/:cuisine/state/:state",
  async (req, res, next) => {
    try {
      const { cuisine, state } = req.params;
      let idk = await db.restaurantCuisineState(cuisine, state);
      console.log("fetched restauarnts with cuisine: ", cuisine, state);
      res.json(idk);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);

router.get(
  "/restaurant/cuisine/:cuisine/city/:city",
  async (req, res, next) => {
    try {
      const { cuisine, city } = req.params;
      let idk = await db.restaurantCuisineCity(cuisine, city);
      console.log("fetched restauarnts with cuisine: ", cuisine, city);
      res.json(idk);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);

router.get("/restaurant/cuisine/:cuisine/zip/:zip", async (req, res, next) => {
  try {
    const { cuisine, zip } = req.params;
    let idk = await db.restaurantCuisineZip(cuisine, zip);
    console.log("fetched restauarnts with cuisine: ", cuisine, zip);
    res.json(idk);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get(
  "/restaurant/cuisine/:cuisine/currency/:currency",
  async (req, res, next) => {
    try {
      const { cuisine, currency } = req.params;
      let idk = await db.restaurantCuisineCurrency(cuisine, currency);
      console.log("fetched restauarnts with cuisine: ", cuisine, currency);
      res.json(idk);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);

router.get("/number/restaurants/state", async (req, res, next) => {
  try {
    let idk = await db.stateRestaurantCount();
    console.log("fetched number of restaurants accepting crypto in each state");
    res.json(idk);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/mostliked/restaurants", async (req, res, next) => {
  try {
    let idk = await db.mostLikedRestaurants();
    res.json(idk);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//////////////
//////////////
// CREATION //
//////////////
//////////////

//Obj MUST HAVE ATTRIBUTES:
//name,city,state,zip,yelp,cuisine,website
router.post("/restaurant/create", async (req, res, next) => {
  try {
    console.log(req);
    if (req.body == {}) {
      res.sendStatus("BODY EMPTY!");
    }
    let results = await db.createRestaurant(req.body); // To test validity of this function, swap out req.body with myRestauarant
    console.log("Created Restaurant!");
    res.json(req.body);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Obj MUST HAVE ATTRIBUTES:
//restaurant_id,menu_item,price
router.post("/menuItem/create", async (req, res, next) => {
  try {
    console.log(req);
    if (req.body == {}) {
      res.sendStatus("BODY EMPTY!");
    }
    let results = await db.createMenuItem(req.body);
    console.log("Created Menu!");
    res.json(req.body);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Obj MUST HAVE ATTRIBUTES:
//restaurant_id,restauarant_review,rating
router.post("/review/create", async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.body == {}) {
      res.sendStatus("BODY EMPTY!");
    }
    let results = await db.createReview(req.body);
    console.log("Created Review!");
    res.json(req.body);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Obj MUST HAVE ATTRIBUTES:
//first_name,last_name,age,street,city,state,zip
router.post("/user/create", async (req, res, next) => {
  try {
    console.log(req);
    if (req.body == {}) {
      res.sendStatus("BODY EMPTY!");
    }
    let results = await db.createUser(req.body); // To test validity of this function, swap out req.body with myRestauarant
    console.log("Created User!");
    res.json(req.body);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

////////////
////////////
// UPDATE //
////////////
////////////

// MUST INCLUDE ID IN REQUEST
router.put("/restaurant/update", async (req, res, next) => {
  try {
    console.log(req);
    if (req.body == {}) {
      res.sendStatus("BODY EMPTY!");
    }
    let results = await db.updateRestaurant(req.body);
    console.log("Updated Restaurant!");
    res.json(req.body);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// MUST INCLUDE ID IN REQUEST
router.put("/user/update", async (req, res, next) => {
  try {
    console.log(req);
    if (req.body == {}) {
      res.sendStatus("BODY EMPTY!");
    }
    let results = await db.updateUser(req.body);
    console.log("Updated User!");
    res.json(req.body);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// MUST INCLUDE ID IN REQUEST
router.put("/review/update", async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.body == {}) {
      res.sendStatus("BODY EMPTY!");
    }
    let results = await db.updateReview(req.body);
    console.log("Updated Review!");
    res.json(req.body);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// MUST INCLUDE ID IN REQUEST
router.put("/menu_item/update", async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.body == {}) {
      res.sendStatus("BODY EMPTY!");
    }
    let results = await db.updateMenuItem(req.body);
    console.log("Updated Review!");
    res.json(req.body);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//////////////
//////////////
// DELETION //
//////////////
//////////////

// Takes single id peram and delete that restaurant
router.delete("/restaurants/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let results = await db.deleteRestaurant(id);
    console.log("Deleted single restauarant");
    res.json(results[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Takes single id peram and delete that user
router.delete("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let results = await db.deleteUser(id);
    console.log("Deleted single restauarant");
    res.json(results[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Takes single id peram and delete that review
router.delete("/review/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let results = await db.deleteReview(id);
    console.log("Deleted single restauarant");
    res.json(results[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Takes single id peram and delete that restaurant
router.delete("/menu_item/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let results = await db.deleteMenuItem(id);
    console.log("Deleted single restauarant");
    res.json(results[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;

// Loads app server using express.
// import fake from "../fake.js";
const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "database-2.cnxqeypeorsf.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Sknf6q1sCsTAaQ3j8sYw",
  database: "cryptoraunt",
});

let DB = {};

function myQueryer(stringQuery) {
  return new Promise((resolve, reject) => {
    pool.query(stringQuery, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

/* 
All GET queries
*/

// Returns all Users
DB.all_users = () => {
  return myQueryer(`SELECT * FROM users`);
};

DB.all_restaurants = () => {
  return myQueryer(`SELECT * FROM restaurants`);
};

DB.all_reviews = () => {
  return myQueryer(`SELECT * FROM reviews`);
};

DB.get_one_rest = (id) => {
  //   console.log(`SELECT * FROM restaurants WHERE id=` + id + `;`);
  return myQueryer(`SELECT * FROM restaurants WHERE id=` + id + `;`);
};

DB.get_menu = (id) => {
  //   console.log(`SELECT * FROM restaurants WHERE id=` + id + `;`);
  return myQueryer(`SELECT * FROM menu_items WHERE restaurant_id=` + id + `;`);
};

DB.get_restaurants_with_crypto = (name) => {
  //   console.log(`SELECT * FROM restaurants WHERE id=` + id + `;`);
  return myQueryer(
    `select * FROM (select DISTINCT name, id, street, city, state, zip, cuisine, phone_number, yelp_rating,website,cryptocurrency from restaurants JOIN accepted_crypto ON restaurant_id = id) T where cryptocurrency = "` +
      name +
      `";`
  );
};

DB.getUserFavorites = (id) => {
  return myQueryer(
    `select name from (select restaurant_id from favorites where user_id = ` +
      id +
      `) T join restaurants on restaurant_id = id;`
  );
};

// DB.user_favorites = (first_name, last_name) => {
//   return myQueryer(
//     "select restaurants.name, phone_number phone Restaurant FROM (select restaurant_id, first_name, last_name from favorites join users on user_id = users.id) p join restaurants on restaurant_id = restaurants.id where first_name = '" +
//       first_name +
//       "' and last_name = '" +
//       last_name +
//       "';"
//   );
// };

DB.restaurants_in_state = (location) => {
  return myQueryer(
    `SELECT name, id, street, city, state, zip, yelp_rating, cuisine, website,  phone_number FROM restaurants where state = '` +
      location +
      `';`
  );
};

DB.restaurant_by_id = (id) => {
  return myQueryer(`SELECT * FROM restaurants WHERE id = ` + id + `;`);
};

DB.reviewsForRestaurant = (id) => {
  return myQueryer(
    `(SELECT DISTINCT restaurants.id, restaurants.name, cuisine, phone_number, restaurant_review, rating  FROM restaurants JOIN reviews on restaurants.id = restaurant_id WHERE restaurants.id = ` +
      id +
      `);`
  );
};

DB.stateRestaurantCount = () => {
  return myQueryer(`select state, count(name) from restaurants group by state`);
};

DB.restaurantCuisine = (cuisine) => {
  return myQueryer(
    `select * from restaurants where cuisine = '` + cuisine + `';`
  );
};

DB.restaurantCuisineState = (cuisine, state) => {
  return myQueryer(
    `select * from (select * from restaurants where cuisine = '` +
      cuisine +
      `') T WHERE state = '` +
      state +
      `';`
  );
};
DB.restaurantCuisineCity = (cuisine, city) => {
  return myQueryer(
    `select * from (select * from restaurants where cuisine = '` +
      cuisine +
      `') T WHERE city = '` +
      city +
      `';`
  );
};
DB.restaurantCuisineZip = (cuisine, zip) => {
  return myQueryer(
    `select * from (select * from restaurants where cuisine = '` +
      cuisine +
      `') T WHERE zip = '` +
      zip +
      `';`
  );
};
DB.restaurantCuisineCurrency = (cuisine, currency) => {
  return myQueryer(
    `select * from (select * from restaurants where cuisine = '` +
      cuisine +
      `') T JOIN accepted_crypto ON id = restaurant_id WHERE cryptocurrency = '` +
      currency +
      `';`
  );
};
DB.mostLikedRestaurants = () => {
  return myQueryer(
    `select name, favorited from (select restaurant_id, count(user_id) favorited FROM favorites group by restaurant_id) T join restaurants on restaurant_id = id order by favorited DESC;`
  );
};
/* 
CREATION
*/

//Obj MUST HAVE ATTRIBUTES:
//name,city,state,zip,yelp,cuisine,website
DB.createRestaurant = (Obj) => {
  console.log(Obj);
  return myQueryer(
    `INSERT INTO restaurants (name,street,city,state,zip,yelp_rating,cuisine,phone_number,website) VALUES ('` +
      Obj.name +
      `', '` +
      Obj.addressStreet +
      `', '` +
      Obj.addressCity +
      `','` +
      Obj.addressState +
      `', '` +
      Obj.addressZip +
      `', ` +
      // Obj.rating +
      `0,'` +
      Obj.cuisine +
      `', '` +
      Obj.phone +
      `', '` +
      Obj.website +
      `');`
  );
};

//Obj MUST HAVE ATTRIBUTES:
//restaurant_id,restauarant_review,rating
DB.createReview = (Obj) => {
  // console.log("HERE", Obj)
  return myQueryer(
    `INSERT INTO reviews (restaurant_id,restaurant_review,rating) VALUES (` +
      Obj.restaurant_id +
      `, '` +
      Obj.restaurant_review +
      `', ` +
      Obj.rating +
      `);`
  );
};

//Obj MUST HAVE ATTRIBUTES:
//first_name,last_name,age,street,city,state,zip
DB.createUser = (Obj) => {
  // console.log(Obj)
  return myQueryer(
    `INSERT INTO users (first_name,last_name,age,street,city,state,zip) VALUES ('` +
      Obj.first_name +
      `', '` +
      Obj.last_name +
      `', ` +
      Obj.age +
      `, '` +
      Obj.street +
      `', '` +
      Obj.city +
      `','` +
      Obj.state +
      `', '` +
      Obj.zip +
      `');`
  );
};

//Obj MUST HAVE ATTRIBUTES:
//restaurant_id,menu_item,price
DB.createMenuItem = (Obj) => {
  // console.log(Obj)
  return myQueryer(
    `INSERT INTO menu_items (restaurant_id,menu_item,price) VALUES (` +
      Obj.restaurant_id +
      `, '` +
      Obj.menu_item +
      `', ` +
      Obj.price +
      `);`
  );
};

//Obj MUST HAVE ATTRIBUTES:
//restaurant_id, currency
DB.createCurrency = (Obj) => {
  // console.log(Obj)
  return myQueryer(
    `INSERT INTO accepted_crypto (restaurant_id,cryptocurrency) VALUES (` +
      Obj.restaurant_id +
      `, '` +
      Obj.cryptocurrency +
      `');`
  );
};

//Obj MUST HAVE ATTRIBUTES:
//user_id, restaurant_id,
DB.createFavorite = (Obj) => {
  // console.log(Obj)
  return myQueryer(
    `INSERT INTO favorites (user_id,restaurant_id) VALUES (` +
      Obj.user_id +
      `, ` +
      Obj.restaurant_id +
      `);`
  );
};

/* 
UPDATION
*/

// Updates entire restaurant entry.
// OBJ MUST HAVE ALL ATTRIBUTES OF THE RESTAURANT (including id)
DB.updateRestaurant = (Obj) => {
  // console.log(Obj)
  return myQueryer(
    `UPDATE restaurants SET name = '` +
      Obj.name +
      `', street = '` +
      Obj.addressStreet +
      `', city = '` +
      Obj.addressCity +
      `', state = '` +
      Obj.addressState +
      `', zip = '` +
      Obj.addressZip +
      `', yelp_rating = ` +
      0 +
      `, cuisine = '` +
      Obj.cuisine +
      `', phone_number = '` +
      Obj.phone +
      `', website = '` +
      Obj.website +
      `' WHERE id = ` +
      Obj.id +
      `;`
  );
};

// Updates entire user entry.
// OBJ MUST HAVE ALL ATTRIBUTES OF THE USER (including id)
DB.updateUser = (Obj) => {
  // console.log(Obj)
  return myQueryer(
    `UPDATE users SET first_name = '` +
      Obj.first_name +
      `', last_name = '` +
      Obj.last_name +
      `', age = '` +
      Obj.age +
      `', street = '` +
      Obj.street +
      `', city = '` +
      Obj.city +
      `', state = '` +
      Obj.state +
      `', zip = '` +
      Obj.zip +
      `' WHERE id = ` +
      Obj.id +
      `;`
  );
};

// Updates entire review entry.
// OBJ MUST HAVE ALL ATTRIBUTES OF THE REVIEW (including id)
DB.updateReview = (Obj) => {
  // console.log(Obj)
  return myQueryer(
    `UPDATE reviews SET restaurant_id = '` +
      Obj.restaurant_id +
      `', restaurant_review = '` +
      Obj.resaurant_review +
      `', rating = '` +
      Obj.rating +
      `' WHERE id = ` +
      Obj.id +
      `;`
  );
};

// updates entire menu item entry.
// OBJ MUST HAVE ALL ATTRIBUTES OF THE REVIEW (including id)
DB.updateMenuItem = (Obj) => {
  // console.log(Obj)
  return myQueryer(
    `UPDATE menu_items SET restaurant_id = '` +
      Obj.restaurant_id +
      `', menu_item = '` +
      Obj.menu_item +
      `', price = '` +
      Obj.price +
      `' WHERE id = ` +
      Obj.id +
      `;`
  );
};

/* 
Deletion
*/

DB.deleteRestaurant = (id) => {
  return myQueryer(`DELETE FROM restaurants WHERE id = ` + id + `;`);
};
DB.deleteUser = (id) => {
  return myQueryer(`DELETE FROM users WHERE id = ` + id + `;`);
};
DB.deleteReview = (id) => {
  return myQueryer(`DELETE FROM reviews WHERE id = ` + id + `;`);
};
DB.deleteMenuItem = (id) => {
  return myQueryer(`DELETE FROM menu_items WHERE id = ` + id + `;`);
};

module.exports = DB;

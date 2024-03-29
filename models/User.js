var sql = require('../config/db.js');

//User object constructor
var User = function(user){
    this.name = user.name;
    this.mail = user.mail;
};

User.createUser = function (newUser, result) {    
  sql.query("INSERT INTO users set ?", newUser, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });           
};
User.listAllUsers = function (result) {
  sql.query("Select * from users", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('users : ', res);  

      result(null, res);
    }
});   
};

User.getUserById = function (id, result) {
  sql.query("Select user from users where name = ? ", id, function (err, res) {             
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });   
};

User.updateById = function(id, user, result){
  sql.query("UPDATE users SET user = ? WHERE id = ?", [user.user, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{   
      result(null, res);
    }
  }); 
};

User.remove = function(id, result){
  sql.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  }); 
};

module.exports = User;
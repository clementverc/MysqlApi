const User = require("../models/User.js");

// what to do to list all the users registred
exports.list_All_Users = function(req, res) {
  User.listAllUsers(function(err, user) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

// what to do to list to create a new user
exports.create_New_User = function(req, res) {
  var new_user = new User(req.body);

  //handles null error 
  if(!new_user.user || !new_user.status){
    res.status(400).send({ error:true, message: 'Please provide user/status' });
  }
  else{
    User.createUser(new_user, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  }
};

// what to do to display content of a specific user
exports.display_User = function(req, res) {
  User.getUserById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

// what to do to update content of a specific user
exports.update_User = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userid },
    req.body,
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json({ message: "User successfully updated", user });
    }
  );
};

// what to do to delete content of a specific user
exports.delete_User = function(req, res) {
  User.remove({ _id: req.params.userid }, (err, user) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "User successfully deleted", user });
  });
};

/*!
  * Person.js - person class 
  * v0.1.0
  * copyright JGA 2012
  * MIT License
  */

var Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.getFullName = function() {
  return this.firstName + ' ' + this.lastName;
}

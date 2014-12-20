var Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.getFullName = function() {
  return this.firstName + ' ' + this.lastName;
}

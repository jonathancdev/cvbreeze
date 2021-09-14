//ALLOWS OBJECTS TO BE SAVED AND RETREIVED FROM LOCALSTORAGE BY SAVING AS STRING AND THEN PARSING
//STRING BACK TO JOSON
function objectStorage() {
  Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
  };

  Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
  };
}

export default objectStorage;

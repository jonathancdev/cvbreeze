//allows objects to be saved and retreived from localStorage by saving as string and then parsing
//string back to JOSON
function objectStorage () {

    Storage.prototype.setObject = function(key, value) {
        this.setItem(key, JSON.stringify(value));
    }
    
    Storage.prototype.getObject = function(key) {
        var value = this.getItem(key);
        return value && JSON.parse(value);
    }
};

export default objectStorage;
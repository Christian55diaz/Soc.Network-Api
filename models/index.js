// require both the users and thoughts models
// these consts have to match the .js file to their name exactly
const Thoughts = require('./Thoughts');
const User = require('./User');

//exporting both the users and thoughts models
module.exports = {User, Thoughts};
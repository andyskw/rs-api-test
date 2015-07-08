
module.exports = function (mongoose) {

  var Schema = new mongoose.Schema({
      name: {
        type: String
      },
      email: {
        type: String
      }
  });

  var Model = mongoose.model('User', Schema);

}

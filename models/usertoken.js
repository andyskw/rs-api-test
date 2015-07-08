
module.exports = function (mongoose) {

  var Schema = new mongoose.Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      tokenValue: {
        type: String,
        index: 1
      }
  });

  var Model = mongoose.model('UserToken', Schema);

}

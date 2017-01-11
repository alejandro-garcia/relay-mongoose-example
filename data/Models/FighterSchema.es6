import mongoose from 'mongoose';

var FighterSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: mongoose.Types.ObjectId
    },
    charId: { type: Number, index: true },
    name: String,
    rankPoints: { type: Number},
    image: String ,
    shortname: String,
    abbreviation: { type: String, index: true }
});

let Fighter = mongoose.model('Fighter', FighterSchema);

exports.FighterSchema = Fighter;

exports.getFighterById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    Fighter.findOne({id:id}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    })
  });
};

exports.getListOfFighters = () => {
  return new Promise((resolve, reject) => {
    Fighter.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};


exports.addFighter = (obj, {charId, name, rankPoints, image, shortname, abbreviation}) => {
  var newFighter = new Fighter({charId: charId, name: name, rankPoints: rankPoints, image: image, shortname: shortname, abbreviation: abbreviation});

  return new Promise((resolve, reject) => {
    newFighter.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

exports.updateFighter = (root, {charId, name, rankPoints, image, shortname, abbreviation, id}) => {
  let modify = {};
  charId ? modify.charId = charId : null;
  name ? modify.name = name : null;
  rankPoints ? modify.rankPoints = rankPoints : null;
  image ? modify.image = image : null;
  shortname ? modify.shortname = shortname : null;
  abbreviation ? modify.abbreviation = abbreviation : null; 

  return new Promise((resolve, reject) => {
    Fighter.update({id: id}, modify, (err, res) => {
      if (err) {
        reject(err)
      } else {
        Fighter.find({id: id}, (err, res) => {
          err || res.length != 1 ? reject(err) : resolve(res[0]);
        });
      }
    });
  });
};
import mongoose from 'mongoose';

var RankSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
   rankId: { type: Number, index: true },
   nombre: String,
   orden: { type: Number},
   category: String, 
   abbreviation: String
});

let Rank = mongoose.model('Rank', RankSchema);

exports.RankSchema = Rank;

exports.getRankById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    Rank.findOne({id:id}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    })
  });
};

exports.getListOfRanks = () => {
  return new Promise((resolve, reject) => {
    Rank.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};


exports.addRank = (obj, {rankId, nombre, orden, category, abbreviation}) => {
  var newRank = new Rank({rankId: rankId, nombre: nombre, orden: orden, category: category, abbreviation: abbreviation});

  return new Promise((resolve, reject) => {
    newRank.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

exports.updateRank = (root, {rankId, nombre,orden,category, abbreviation, id}) => {
  let modify = {};
  rankId ? modify.rankId = rankId : null;
  nombre ? modify.nombre = nombre : null;
  orden ? modify.orden = orden : null;
  category ? modify.category = category : null;
  abbreviation ? modify.abbreviation = abbreviation : null;
  

  return new Promise((resolve, reject) => {
    Rank.update({id: id}, modify, (err, res) => {
      if (err) {
        reject(err)
      } else {
        Rank.find({id: id}, (err, res) => {
          err || res.length != 1 ? reject(err) : resolve(res[0]);
        });
      }
    });
  });
};
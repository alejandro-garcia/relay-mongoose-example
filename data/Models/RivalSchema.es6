import mongoose from 'mongoose';

var RivalSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: mongoose.Types.ObjectId
    },
    rivalId: { type: Number, index: true },
    psn: String,
    rank1id: { type: Number},
    rank2id: { type: Number},
    char1Id: { type: Number},
    char2Id: { type: Number}
});

let Rival = mongoose.model('Rival', RivalSchema);

exports.RivalSchema = Rival;

exports.getRivalById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    Rival.findOne({id:id}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    })
  });
};

exports.getListOfRivals = () => {
  return new Promise((resolve, reject) => {
    Rival.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};


exports.addRival = (obj, {rivalId, psn, rank1id, rank2id, char1Id, char2Id}) => {
  var newRival = new Rival({rivalId: rivalId, psn: psn, rank1id: rank1id, rank2id: rank2id, char1Id: char1Id, char2Id: char2Id});

  return new Promise((resolve, reject) => {
    newRival.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

exports.updateRival = (root, {rivalId, psn, rank1id, rank2id, char1Id, char2Id, id}) => {
  let modify = {};
  rivalId ? modify.rivalId = rivalId : null;
  psn ? modify.psn = psn : null;
  rank1id ? modify.rank1id = rank1id : null;
  rank2id ? modify.rank2id = rank2id : null;
  char1Id ? modify.char1Id = char1Id : null;
  char2Id ? modify.char2Id = char2Id : null;  

  return new Promise((resolve, reject) => {
    Rival.update({id: id}, modify, (err, res) => {
      if (err) {
        reject(err)
      } else {
        Rival.find({id: id}, (err, res) => {
          err || res.length != 1 ? reject(err) : resolve(res[0]);
        });
      }
    });
  });
};
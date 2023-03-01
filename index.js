const {Band} = require('./Band')
const {Musician} = require('./Musician')

//defining associates
Musician.belongsTo(Band);
Band.hasMany(Musician);

module.exports = {
    Band,
    Musician
};

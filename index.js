const {Band} = require('./Band')
const {Musician} = require('./Musician');
const {Song} = require('./Song');

//defining associates
Musician.belongsTo(Band);
Band.hasMany(Musician);

Song.belongsToMany(Band, {through: 'band_songs'});
Band.belongsToMany(Song, {through: 'band_songs'});

module.exports = {
    Band,
    Musician,
    Song
};
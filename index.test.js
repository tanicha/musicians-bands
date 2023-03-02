const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const bandUser = await Band.create({ name: 'Tani Band', genre: 'ROCK', showCount: 777});
        expect(bandUser.name).toBe('Tani Band');
        expect(bandUser.genre).toBe('ROCK');
        expect(bandUser.showCount).toBe(777);
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const musicianPlayer = await Musician.create({ name: 'Tani the Holy Musician', instrument: 'Piano'});
        expect(musicianPlayer.name).toBe('Tani the Holy Musician');
        expect(musicianPlayer.instrument).toBe('Piano')
    })

    test('can create a Song', async () => {
        const newSong = await Song.create({ title: 'song', year: 2012});
        const newSong2 = await Song.create({ title: 'song2', year: 2013});
        const newSong3 = await Song.create({ title: 'song3', year: 2014});

        expect(newSong.title).toBe('song');
        expect(newSong.year).toBe(2012)
        expect(newSong2.title).toBe('song2');
        expect(newSong2.year).toBe(2013)
        expect(newSong3.title).toBe('song3');
        expect(newSong3.year).toBe(2014)
    })

    test('test for updating band instances', async () => {
        const bandUser = await Band.create({ name: 'Tani Band', genre: 'ROCK', showCount: 777});

        await bandUser.update({name: 'The Old Rockstars'});
        await bandUser.update({genre: 'METAL'});
        await bandUser.update({showCount: 1000});

        expect(bandUser.name).toBe('The Old Rockstars');
        expect(bandUser.genre).toBe('METAL');
        expect(bandUser.showCount).toBe(1000);
    })

    test('test for updating musician instances', async () => { 
        const MusicianUser = await Musician.create({ name: 'Tani the Best Musician', instrument: 'Piano'});
        
        await MusicianUser.update({name: 'Bob the Harpist'});
        await MusicianUser.update({instrument: 'Harp'});

        expect(MusicianUser.name).toBe('Bob the Harpist');
        expect(MusicianUser.instrument).toBe('Harp');
    })

    test('test for deleting band instances', async () => {
        const bandUserByeBye = await Band.create({ name: 'The Rockin R0ckstars', genre: 'ROCK', showCount: 777});
        const deletedBandUser = await bandUserByeBye.destroy();
        // console.log(updatedBandUser)
        expect(deletedBandUser).toBe(bandUserByeBye);
    })

    test('test for deleting musician instances', async () => {
        const MusicianUser1 = await Musician.create({ name: 'Tani 1', instrument: 'Piano'});
        const MusicianUser2 = await Musician.create({ name: 'Tani', instrument: 'Harp'}); //will be destroyed
        const MusicianUser3 = await Musician.create({ name: 'Tani 2', instrument: 'Guitar'});
        const MusicianUser4 = await Musician.create({ name: 'Tani', instrument: 'Drums'}); //will be destroyed

       const destroyedMusicians = await Musician.destroy({
            where: {
                name:'Tani'
            }
        });
        expect(destroyedMusicians).toBe(2);
    })

    test('test for adding musicians to band', async () => {
        const someBand = await Band.findByPk(1) //tani band pk1

        await someBand.addMusician(1)
        await someBand.addMusician(2)
        await someBand.addMusician(3)

        bandMusicians = await someBand.getMusicians();

        expect(bandMusicians.length).toBe(3);
    })

    test('test for adding songs to band', async () => {
        const foundBand = await Band.findByPk(2) //the old rockstar band pk2

        await foundBand.addSong(1)
        await foundBand.addSong(2)
        await foundBand.addSong(3)

        bandSongs = await foundBand.getSongs();

        expect(bandSongs.length).toBe(3);
    })


    test('test for adding a band to song', async () => {
        const foundSong = await Song.findByPk(1) //pk 1 'song'

        await foundSong.addBand(1) //tani band pk 1
        await foundSong.addBand(2) //old rockstars pk2

        songsInBands = await foundSong.getBands();

        expect(songsInBands.length).toBe(2)
    })

})
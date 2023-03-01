const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

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
        const bandUser = await Band.create({ name: 'Tani the R0ckstar4', genre: 'ROCK', showCount: 777});
        expect(bandUser.name).toBe('Tani the R0ckstar4');
        expect(bandUser.genre).toBe('ROCK');
        expect(bandUser.showCount).toBe(777);
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const musicianPlayer = await Musician.create({ name: 'Tani the Holy Musician', instrument: 'Piano'});
        expect(musicianPlayer.name).toBe('Tani the Holy Musician');
        expect(musicianPlayer.instrument).toBe('Piano')
    })

    test('test for updating band instances', async () => {
        const bandUser = await Band.create({ name: 'Tani the R0ckstar4', genre: 'ROCK', showCount: 777});
        
        await bandUser.update({name: 'Herald the Old Rockstar'});
        await bandUser.update({genre: 'METAL'});
        await bandUser.update({showCount: 1000});

        expect(bandUser.name).toBe('Herald the Old Rockstar');
        expect(bandUser.genre).toBe('METAL');
        expect(bandUser.showCount).toBe(1000);
    })

    test('test for updating musician instances', async () => { 
        const MusicianUser = await Musician.create({ name: 'Tani the Holy Musician', instrument: 'Piano'});
        
        await MusicianUser.update({name: 'Bob the Harpist'});
        await MusicianUser.update({instrument: 'Harp'});

        expect(MusicianUser.name).toBe('Bob the Harpist');
        expect(MusicianUser.instrument).toBe('Harp');
    })

    test('test for deleting band instances', async () => {
        const bandUserByeBye = await Band.create({ name: 'Tani the Rockin R0ckstar', genre: 'ROCK', showCount: 777});
        const deletedBandUser = await bandUserByeBye.destroy();
        // console.log(updatedBandUser)
        expect(deletedBandUser).toBe(bandUserByeBye);
    })

    test('test for deleting musician instances', async () => {
        const MusicianUser1 = await Musician.create({ name: 'Tani the Holy Musician', instrument: 'Piano'});
        const MusicianUser2 = await Musician.create({ name: 'Tani', instrument: 'Harp'}); //will be destroyed
        const MusicianUser3 = await Musician.create({ name: 'Tani the Lover', instrument: 'Guitar'});
        const MusicianUser4 = await Musician.create({ name: 'Tani', instrument: 'Drums'}); //will be destroyed

       const destroyedMusicians = await Musician.destroy({
            where: {
                name:'Tani'
            }
        });
        expect(destroyedMusicians).toBe(2);
    })

    test('test for adding musicians to band', async () => {
        const someBand = await Band.findByPk(1)

        await someBand.addMusician(1)
        await someBand.addMusician(2)
        await someBand.addMusician(3)

        bandMusicians = await someBand.getMusicians();

        expect(bandMusicians.length).toBe(3);
    })

})
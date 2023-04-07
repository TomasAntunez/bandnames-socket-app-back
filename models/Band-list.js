const Band = require("./Band");


class BandList {

    constructor() {
        this.bands = [
            new Band('Metallica'),
            new Band('Foo Fighters'),
            new Band('Audioslave'),
            new Band('Rainbow')
        ];
    }

    addBand( name ) {
        const newBand = new Band( name );
        this.bands.push( newBand );
    }

    removeBand( id ) {
        this.bands = this.bands.filter( band => band.id !== id );
    }

    getBands() {
        return this.bands;
    }

    incraseVotes( id ) {
        this.bands = this.bands.map( band => {

            if ( band.id === id ) {
                band.votes += 1;
            }

            return band;
        });
    }

    changeBandName( id, newName ) {
        this.bands = this.bands.map( band => {

            if ( band.id === id ) {
                band.name = newName;
            }

            return band;
        });
    }

}


module.exports = BandList;
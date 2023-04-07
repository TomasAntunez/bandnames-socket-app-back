const BandList = require("./Band-list");


class Sockets {

    constructor( io ) {
        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on( 'connection', socket => {

            console.log('Client connected');

            // Emit to the connected client all current bands
            socket.emit( 'current-bands', this.bandList.getBands() );

            // Vote for a band
            socket.on( 'vote-band', id => {
                this.bandList.incraseVotes( id );
                this.io.emit( 'current-bands', this.bandList.getBands() );
            });

            // Remove band
            socket.on( 'remove-band', id => {
                this.bandList.removeBand( id );
                this.io.emit( 'current-bands', this.bandList.getBands() );
            });
            
            // Change band name
            socket.on( 'change-band-name', ({ id, name }) => {
                this.bandList.changeBandName( id, name );
                this.io.emit( 'current-bands', this.bandList.getBands() );
            });

            // Create a new band
            socket.on( 'new-band', ({ name }) => {
                this.bandList.addBand( name );
                this.io.emit( 'current-bands', this.bandList.getBands() );
            });

        });
    }

}


module.exports = Sockets;
define([ './button' ], function(){

    Crafty.c( 'WelcomeController', {

        playBtn: undefined,
        init: function(){

            this.playBtn = Crafty.e( 'Button' ).button({
                x: 300,
                y: 120,
                w: 50,
                h: 25,
                style: {
                    'background-color': 'red',
                    'border-radius': '5px',
                    'color': 'white',
                    'text-align': 'center',
                    'cursor': 'pointer'
                },
                text: 'PLAY'
            });

            this.playBtn.bind( 'Click', function(){

                Crafty.scene( 'playing' );
            });
        }
    });
});
requirejs.config({
    baseUrl: '/javascripts/'
});

requirejs( [ 'underscore', 'crafty-min', 'map', 'wall', 'role', 'monster', 'bean', 'pacman' ], function(){
    Crafty.init( 640, 320 );
    Crafty.background('#0571a9');

    Crafty.audio.add({
        bgMusic: [
            "/audios/bg.mp3",
            "/audios/bg.ogg"
        ]
    });

    var mapGenerator = Crafty.e( 'MapGenerator' );
    var mapArray = mapGenerator.randomMap( 20, 10 );
    var pacman;
    var monster;

    Crafty.e( 'Wall' ).wall({
        map: mapArray 
    });

    _.each( mapArray, function( rows, row ){

        _.each( rows, function( ifWall, col ){

            if( ifWall === 0 ){

                if( pacman !== undefined && monster === undefined ){

                    monster = Crafty.e( 'Monster' ).monster( mapArray ).attr({ x: col * 32, y: row * 32, z: 100 });
                }

                if( pacman === undefined ){

                    pacman = Crafty.e( 'Pacman' ).attr({ x: col * 32, y: row * 32, z: 100 });
                }

                
                else {

                    // 画一颗豆子
                    Crafty.e( 'Bean' ).bean( col * 32 + 10, row * 32 + 10 );  
                }
            }
        })
    });

    // Crafty.audio.play( 'bgMusic', -1, 0.1 );

    var _map = [
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
            [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1 ],
            [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1 ],
            [ 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1 ],
            [ 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1 ],
            [ 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1 ],
            [ 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1 ],
            [ 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
        ];
});



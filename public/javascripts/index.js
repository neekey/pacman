requirejs.config({
    baseUrl: '/javascripts/'
});

requirejs( [ 'underscore', 'crafty-min', 'gameInfo', 'map', 'wall', 'role', 'monster', 'bean', 'pacman' ], function(){
    Crafty.init( 640, 340 );
    Crafty.background('#0571a9');

    Crafty.audio.add({
        bgMusic: [
            "/audios/bg.mp3",
            "/audios/bg.ogg"
        ]
    });

    var pacmanMap = Crafty.e( 'PacmanMap' ).pacmanMap( 20, 10 );
    var mapArray = pacmanMap.attr( 'mapArray' );
    var pacman;
    var monster;

    Crafty.e( 'Wall' ).wall({
        map: mapArray 
    });

    // 绘制游戏信息
    var gameInfo = Crafty.e( 'GameInfo' ).gameInfo( 0, 320 );

    // 画豆子
    _.each( pacmanMap.attr( 'noWallArray' ), function( cube ){

        // 画一颗豆子
        Crafty.e( 'Bean' ).bean( cube[ 1 ] * 32 + 10, cube[ 0 ] * 32 + 10, gameInfo );  
    });

    var roleArray = pacmanMap.getRandomNoWallCubes( 5 );


    // 画妖怪
    _.each( roleArray, function( cube, index ){

        if( index === 0 ){

            // 画吃豆人
            pacman = Crafty.e( 'Pacman' ).attr({ x: cube[ 1 ] * 32, y: cube[ 0 ] * 32, z: 100 });   


        }
        else  {

            Crafty.e( 'Monster' ).monster( mapArray ).attr({ x: cube[ 1 ] * 32, y: cube[ 0 ] * 32, z: 100 });   
        }
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



/**
 * 游戏进行中
 */
define( [ './gameInfo', './map', './wall', './role', './monster', './bean', './pacman' ], function(){

    Crafty.audio.add({
        bgMusic: [
            "/audios/bg.mp3",
            "/audios/bg.ogg"
        ],
        opening: [
            "/audios/opening.mp3",
            "/audios/opening.ogg"
        ]
    });

    Crafty.c( 'PlayingController', {

        pacman: undefined,
        mapArray: undefined,
        monsters: [],
        mapController: undefined,
        wall: undefined,
        gameInfo: undefined,
        init: function(){

            var that = this;

            this.gameInfo = Crafty.e( 'GameInfo' ).gameInfo( 0, 320 );
            this.buildMap();
            

            Crafty.audio.play( 'opening', 1, 1 );
            setTimeout(function(){

                // Crafty.pause();
            }, 0 );

            setTimeout(function(){

                // Crafty.pause();
                that.addRoles();
                that.addBeans();
                // that.pacman.enableControl();
            }, 4000 );


        },

        /**
         * 构造地图
         */
        buildMap: function(){

            this.mapController = Crafty.e( 'PacmanMap' ).pacmanMap( 20, 10 );
            this.mapArray = this.mapController.attr( 'mapArray' );

            this.wall = Crafty.e( 'Wall' ).wall({
                map: this.mapArray 
            });    
        },

        /**
         * 想地图中添加吃豆人和妖怪
         */
        addRoles: function(){

            // 获取地图中随即的5个位置
            var roleArray = this.mapController.getRandomNoWallCubes( 5 );
            var that = this;
            var monster;

            // 画妖怪 和 吃豆人
            _.each( roleArray, function( cube, index ){

                if( index === 0 ){

                    // 画吃豆人
                    that.pacman = Crafty.e( 'Pacman' );
                    that.pacman.attr({ x: cube[ 1 ] * 32, y: cube[ 0 ] * 32, z: 100 });   
                }
                else  {

                    monster = Crafty.e( 'Monster' );
                    monster.monster( that.mapArray ).attr({ x: cube[ 1 ] * 32, y: cube[ 0 ] * 32, z: 100 });   

                    that.monsters.push( monster );
                }
            });
        },

        /**
         * 添加豆子
         */
        addBeans: function(){

            var that = this;

            // 画豆子
            _.each( this.mapController.attr( 'noWallArray' ), function( cube ){

                if( that.ifCoorEmpty( cube[ 0 ], cube[ 1 ]) === true ){

                    // 画一颗豆子
                    Crafty.e( 'Bean' ).bean( cube[ 1 ] * 32 + 10, cube[ 0 ] * 32 + 10, that.gameInfo ); 
                }
            });           
        },

        /**
         * 指定的地图坐标是否为空
         */
        ifCoorEmpty: function( row, col ){

            if( this.mapArray[ row ][ col ] === 1 ){

                return false;
            }
            else {

                var pacmanCoor = this.pacman.getCurrentMapCoor();

                if( pacmanCoor.row === row && pacmanCoor.col === col ){

                    return false;
                }

                var ifEmpty = true;

                _.each( this.monsters, function( monster ){

                    var monsterCoor = monster.getCurrentMapCoor();

                    if( monsterCoor.row === row && monsterCoor.col === col ){

                        ifEmpty = false;
                    } 
                });

                return ifEmpty;
            }
        }
    });
});
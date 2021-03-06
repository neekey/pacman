/**
 * 墙壁
 */

define(function function_name (argument) {

    Crafty.sprite(32, "/images/wall.png", {
        wall: [ 0, 0 ]
    });

    Crafty.c( 'WallCube', {
        init: function(){
            this.requires( '2D, Canvas, Solid, wall, Collision, SpriteAnimation' );
            this.attr({ w: 32, h: 32 });
            // this.collision(
            //     new Crafty.polygon([ 5, 5 ], [ 27, 5], [ 27,27 ], [ 5, 27 ])
            // );
            this.animate( 'wallBlink', 0, 0, 3 );

            var that = this;

            (function(){

                var recall = arguments.callee;
                that.stop();

                setTimeout(function(){
                    
                    that.animate( 'wallBlink', 25, -1 );

                    setTimeout(function(){

                        recall();
                    }, 800 * Math.random() );
                }, parseInt( 500 * Math.random() ));

            })();

        },
        wallCube: function( config ){
            
            if( config.w ){
                this.attr( { w: config.w } );
            }

            if( config.h ){

                this.attr( { h: config.h } );
            }

            if( config.x ){

                this.attr( { x: config.x } );
            }

            if( config.y ){

                this.attr( { y: config.y } );
            }

            if( config.color ){
                // this.color( config.color );
            }
        }
    });

    Crafty.c( 'Wall', {
        _wallCubes: [],
        _wallMap: [],
        _wallCubeWidth: 32,
        _wallCubeHeight: 32,
        init: function initialize () {
            
        },
        wall: function wall ( config ) {
            
            var map = config.map;
            var w = config.w;
            var h = config.h;
            var ifWall = false;
            var row = 0, col = 0;

            this.attr({
                _wallMap: map
            });

            if( w ){
                this.attr( {
                    _wallCubeWidth: w
                });
            }

            if( h ){
                this.attr( {
                    _wallCubeHeight: h
                });
            }

            for( row = 0; row < map.length; row++ ){

                for( col = 0; col < map[ row ].length; col++ ){

                    ifWall = map[ row ][ col ]; 

                    if( ifWall === 1 ){

                        this.addWallCube( col, row );
                    } 
                }
            }
        },
        addWallCube: function( mapX, mapY ){

            var cubeW = this.attr( '_wallCubeWidth' );
            var cubeH = this.attr( '_wallCubeHeight' );
            var config = {
                w: cubeW,
                h: cubeH,
                x: cubeW * mapX,
                y: cubeH * mapY
            };

            var newCube = Crafty.e( 'WallCube' ).wallCube( config );

            var wallCubes = this.attr( '_wallCubes' );

            wallCubes.push( newCube );
        }
    })
});

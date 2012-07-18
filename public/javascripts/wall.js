/**
 * 墙壁
 */

(function function_name (argument) {

    Crafty.c( 'WallCube', {
        init: function(){
            this.requires( '2D, Canvas, Solid, Color' );
            this.color( 'red' ).attr({ w: 32, h: 32 });
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
})();

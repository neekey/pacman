/**
 * 下方显示游戏信息
 */
(function(){

    Crafty.c( 'PacmanLiveIcon', {
        init: function(){
            this.requires( '2D, Canvas, left' ).attr({
                w: 15,
                h: 15
            });
        }
    });

    Crafty.c( 'BeanCounter', {
        init: function(){
            this.requires( '2D, Canvas, Text' ).attr({
                w: 15,
                h: 15
            }).text( '0' );   
        }
    });

    Crafty.c( 'GameInfo', {

        pacmanLives: [],
        beans: 0,
        beanCounter: undefined,
        init: function(){

        },

        addBean: function(){

            this.beans++;
            this.beanCounter.text( String( this.beans ) );
        },

        gameInfo: function( x, y ){

            var liveLen = 3;
            var liveIcon;
            var i;

            for( i = 0; i < liveLen; i++ ){

                liveIcon = Crafty.e( 'PacmanLiveIcon' );
                liveIcon.attr({ x: i * ( liveIcon.attr( 'w' ) + 15 ) + x, y: y });

                this.pacmanLives.push( liveIcon );
            }

            this.beanCounter = Crafty.e( 'BeanCounter' );
            this.beanCounter.attr({ x: liveLen * ( liveIcon.attr( 'w' ) + 10 ) + x, y: y }).text( this.beans );

            return this;
        }
    });

    
})();
(function (argument) {
    
    Crafty.c( 'Bean', {
        init: function(){

            var that = this;

            this.requires( '2D, Canvas, bean, Collision' );
            this.onHit( 'Pacman', function(){

                that.destroy();
            });
        },

        bean: function( x, y ){

            this.attr({
                x: x,
                y: y,
                w: 15,
                h: 15
            })
        }
    });


})();
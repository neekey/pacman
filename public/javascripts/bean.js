(function (argument) {
    
    Crafty.c( 'Bean', {
        init: function(){

            var that = this;

            this.requires( '2D, Canvas, bean, Collision, SpriteAnimation' );
            this.onHit( 'Pacman', function(){

                Crafty.audio.play( 'eat', 1, 0.2 );
                that.destroy();
            });

            this.animate( 'beanFloat', 0, 0, 3 );

            (function(){

                var recall = arguments.callee;
                that.stop();

                setTimeout(function(){
                    
                    that.animate( 'beanFloat', 25, -1 );

                    setTimeout(function(){

                        recall();
                    }, 500 * Math.random() );
                }, parseInt( 500 * Math.random() ));

            })();
            
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
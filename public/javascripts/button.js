define(function(){

    Crafty.c( 'Button', {

        init: function(){

            this.requires( '2D, DOM, Text, Mouse' );
        },

        button: function( config ){

            this.attr({
                x: config.x,
                y: config.y,
                w: config.w,
                h: config.h
            });

            this.css( config.style );
            this.text( config.text );

            return this;
        }
    })
});
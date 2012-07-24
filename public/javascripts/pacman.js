define(function(){

    Crafty.audio.add({
        eat: [
            "/audios/eat.mp3",
            "/audios/eat.ogg"
        ],
        die: [
            "/audios/die.mp3",
            "/audios/die.ogg"
        ]
    });

    Crafty.sprite(32, "/images/pacman.png", {
        idle: [ 1, 0 ],
        left: [ 0, 0 ],
        up: [ 2, 0 ],
        right: [ 4, 0 ],
        down: [ 6, 0 ],
        die: [ 0, 1 ]
    });

    Crafty.c( 'Pacman', {
        init: function(){
            this.requires( 'Role, idle' )
                .fourway( 2.5 );

            this.collision( new Crafty.polygon([ 5, 5 ], [ 48, 1 ], [ 27,5 ], [ 29, 14 ], [ 27, 23 ], [ 48, 28 ], [ 5, 24 ], [ 2, 14 ]) );

            // 设置移动动画
            this.animate( 'walk_left', 0, 0, 1 )
                .animate( 'walk_up', 2, 0, 3 )
                .animate( 'walk_right', 4, 0, 5 )
                .animate( 'walk_down', 6, 0, 7 )
                .animate( 'pacman-die', 0, 1, 0 );

            var ifDie = false;
            var that = this;

            this.onHit( 'Monster', function(){

                if( ifDie === false ){

                    this.disableControl();
                    this.stop();
                    this.animate( 'pacman-die', 10, -1 ).tween( {alpha: 0.0, y: this.y - 20 }, 30 );
                    Crafty.audio.play( 'die', 1, 0.2 );  

                    ifDie = true; 

                    setTimeout(function(){

                        that.destroy();
                    }, 500 );
                }
                
            });
        }
    });

});
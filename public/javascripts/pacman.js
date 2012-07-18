(function(){

Crafty.c( 'pacman', {
    init: function(){
        this.requires( 'idle, SpriteAnimation, Collision, Fourway' )
        this.fourway( 2 );
        this.attr({
            w: 25,
            h: 25
        });

        // 设置移动动画
        this.animate( 'walk_left', 0, 0, 1 )
            .animate( 'walk_up', 2, 0, 3 )
            .animate( 'walk_right', 4, 0, 5 )
            .animate( 'walk_down', 6, 0, 7 );

        this.bind( 'NewDirection', function (direction) {
                if (direction.x < 0) {
                    if (!this.isPlaying("walk_left"))
                        this.stop().animate("walk_left", 10, -1);
                }
                if (direction.x > 0) {
                    if (!this.isPlaying("walk_right"))
                        this.stop().animate("walk_right", 10, -1);
                }
                if (direction.y < 0) {
                    if (!this.isPlaying("walk_up"))
                        this.stop().animate("walk_up", 10, -1);
                }
                if (direction.y > 0) {
                    if (!this.isPlaying("walk_down"))
                        this.stop().animate("walk_down", 10, -1);
                }
                if(!direction.x && !direction.y) {
                    this.stop();
                }
        } );

        // 防止 吃豆人走出跑到地图
        this.bind( 'Moved', function( from ){

            var newX = this.attr( 'x' );
            var newY = this.attr( 'y' );
            var w = this.attr( 'w' );
            var h = this.attr( 'h' );

            if( this.hit( 'WallCube' ) || newX < 0 || newX > ( 600 - w ) || newY < 0 || newY > ( 300 - h ) ){

                this.attr({
                    x: from.x,
                    y: from.y
                });
            }
        });
    }
});

})();
/**
 * 游戏中可以移动的生物的基类（吃豆人、怪物）
 */

 (function(){

Crafty.c( 'Role', {
    init: function(){

        // 具有动画、四个方向行走、可以被碰撞
        this.requires( '2D, Canvas, SpriteAnimation, Fourway' )
        // 设置速度    
        this.fourway( 2 )
        // 宽高为32
            .attr({
                w: 32,
                h: 32
            });

        // 必须在设置过entity的尺寸后在引入Collision        
        this.requires( 'Collision' );

        //与墙体的碰撞检测
        this.bind( 'Moved', function( from ){

            var newX = this.attr( 'x' );
            var newY = this.attr( 'y' );
            var w = this.attr( 'w' );
            var h = this.attr( 'h' );

            if( this.hit( 'WallCube' ) ){

                this.attr({
                    x: from.x,
                    y: from.y
                });
            }
        });

        // 根据不同方形的移动改变动画
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
        
    }
});

})();
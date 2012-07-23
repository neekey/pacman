/**
 * 游戏中可以移动的生物的基类（吃豆人、怪物）
 */

 (function(){

Crafty.c( 'Role', {
    init: function(){

        var that = this;

        // 具有动画、四个方向行走、可以被碰撞
        this.requires( '2D, Canvas, SpriteAnimation, Tween, Fourway' )
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

            if( this.hit( 'WallCube' ) ){

                this.attr({
                    x: from.x,
                    y: from.y
                });

                // 对位置进行修正
                // 当水平撞击到物体时，则从垂直方向上修正
                // 当垂直方向上撞击到物体时，则从水平方向上修正
                // 这个修正，让玩家更加容易进入狭窄的通道
                if( newX !== from.x ){

                    this.fixPosition( 'y' );   
                }

                if( newY !== from.y ){

                    this.fixPosition( 'x' );
                }
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
    },

    fixPosition: function( xOry ){

        if( xOry === 'y' ){

            if( this.y % this.h === 0 ){

                return;
            }
            else if( this.y % this.h / this.h <= 0.5 ){

                this.y--;
            }
            else {

                this.y++;
            }
        }

        if( xOry === 'x' ){

            if( this.x % this.w === 0 ){

                return;
            }
            else if( this.x % this.w / this.w <= 0.5 ){

                this.x--;
            }
            else {

                this.x++;
            }
        }
    } 
});

})();
(function(){

    Crafty.sprite( 32, 'images/monster.png', {

        monster_down: [ 0, 0 ]   
    });

    Crafty.c( 'Monster', {
        
        init: function(){

            this.requires( 'monster_down, SpriteAnimation, Collision, Fourway');
            this.animate( 'walk_down', 0, 0, 3 )
                .animate( 'walk_right', 4, 0, 7 )
                .animate( 'walk_up', 8, 0, 11 )
                .animate( 'walk_left', 12, 0, 15 );
            this.fourway( 3 );
            // this.fourway( 2 );
            this.attr({
                w: 30,
                h: 30
            });

            this.bind( 'NewDirection', function (direction) {
                if (direction.x < 0) {
                    if (!this.isPlaying("walk_left"))
                        this.stop().animate("walk_left", 25, -1);
                }
                if (direction.x > 0) {
                    if (!this.isPlaying("walk_right"))
                        this.stop().animate("walk_right", 25, -1);
                }
                if (direction.y < 0) {
                    if (!this.isPlaying("walk_up"))
                        this.stop().animate("walk_up", 25, -1);
                }
                if (direction.y > 0) {
                    if (!this.isPlaying("walk_down"))
                        this.stop().animate("walk_down", 25, -1);
                }
                if(!direction.x && !direction.y) {
                    this.stop();
                }

                // 进入完整的格子里


                if( newX % 32 <= 5 ){

                    newX = newX - newX % 3;
                }

                if( newX % 32 > ( 32 - 5 ) ){

                    newX = newX + newX % 5;  
                }

            } );

            // 防止 吃豆人走出跑到地图
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
        },
        monster: function(){

        }
    })
})();
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
            this.fourway( 2 );
            this.attr({
                w: 32,
                h: 32
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
        } );
        },
        monster: function(){

        }
    })
})();
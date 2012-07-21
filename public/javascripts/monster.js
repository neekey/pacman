(function(){

    Crafty.sprite( 32, 'images/monster.png', {

        monster_down: [ 0, 0 ]   
    });

    Crafty.c( 'Monster', {
        
        init: function(){

            this.requires( 'Role, monster_down' ).fourway( 1.5 );
            this.animate( 'walk_down', 0, 0, 3 )
                .animate( 'walk_right', 4, 0, 7 )
                .animate( 'walk_up', 8, 0, 11 )
                .animate( 'walk_left', 12, 0, 15 );
        }
    })
})();
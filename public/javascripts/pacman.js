(function(){

Crafty.audio.add({
    eat: [
        "/audios/eat.mp3",
        "/audios/eat.ogg"
    ]
});

Crafty.c( 'Pacman', {
    init: function(){
        this.requires( 'Role, idle' )
            .fourway( 3 );

        // 设置移动动画
        this.animate( 'walk_left', 0, 0, 1 )
            .animate( 'walk_up', 2, 0, 3 )
            .animate( 'walk_right', 4, 0, 5 )
            .animate( 'walk_down', 6, 0, 7 );
    }
});

})();
(function(){

    Crafty.audio.add({
        eat: [
            "/audios/eat.mp3",
            "/audios/eat.ogg"
        ]
    });

    Crafty.sprite(32, "/images/pacman-copy.png", {
        idle: [ 1, 0 ],
        left: [ 0, 0 ],
        up: [ 2, 0 ],
        right: [ 4, 0 ],
        down: [ 6, 0 ]
    });

    Crafty.c( 'Pacman', {
        init: function(){
            this.requires( 'Role, idle' )
                .fourway( 2 );

            // 设置移动动画
            this.animate( 'walk_left', 0, 0, 1 )
                .animate( 'walk_up', 2, 0, 3 )
                .animate( 'walk_right', 4, 0, 5 )
                .animate( 'walk_down', 6, 0, 7 );
        }
    });

})();
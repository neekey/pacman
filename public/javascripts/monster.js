(function(){

    Crafty.sprite( 32, 'images/monster.png', {

        monster_down: [ 0, 0 ]   
    });

    Crafty.c( 'Monster', {
        
        init: function(){

            this.requires( 'Role, monster_down' ).fourway( 1.5 ).disableControl();
            this.animate( 'walk_down', 0, 0, 3 )
                .animate( 'walk_right', 4, 0, 7 )
                .animate( 'walk_up', 8, 0, 11 )
                .animate( 'walk_left', 12, 0, 15 );

            var walkDirs = [ 'left', 'up', 'right', 'down' ];
            var walkDir = getRandomDir();
            var preX = this.x;
            var preY = this.y;
            var preDir = walkDir;

            this.bind( 'EnterFrame', function() {
                
                var newX = this.attr( 'x' );
                var newY = this.attr( 'y' );
                var direction = {};

                if( this.hit( 'WallCube' ) ){

                    this.attr({
                        x: preX,
                        y: preY
                    });

                    walkDir = getRandomDir( walkDir );
                }
                else {

                    preX = this.x;
                    preY = this.y;

                    switch( walkDir ){

                        case 'left':
                            direction.x = -1;
                            this.x--
                            break;
                        case 'up':
                            direction.y = -1;
                            this.y--;
                            break;
                        case 'right':
                            direction.x = 1;
                            this.x++;
                            break;
                        case 'down':
                            direction.y = 1;
                            this.y++;
                            break;
                    }

                    if( walkDir !== preDir ){

                        this.trigger( 'NewDirection', direction );

                        preDir = walkDir;
                    }
                    else {

                        if( Math.random() > 0.98 ){

                            walkDir = getRandomDir( walkDir );   
                        }
                    }
                }
            });

            //与墙体的碰撞检测
            // this.bind( 'Moved', function( from ){

            //     var newX = this.attr( 'x' );
            //     var newY = this.attr( 'y' );

            //     if( this.hit( 'WallCube' ) ){

            //         this.attr({
            //             x: from.x,
            //             y: from.y
            //         });

            //         walkDir = getRandomDir();
            //     }
            // });

            function getRandomDir( dirCome ){

                var rdm = Math.random();

                dirCome = dirCome || 'left';

                if( rdm < 0.5 ){

                    return dirCome;
                }
                else if( rdm < 0.2 ){

                    if( dirCome === 'left' ){
                        return 'right';
                    }
                    if( dirCome === 'right' ){
                        return 'left';
                    }
                    if( dirCome === 'up' ){

                        return 'down';
                    }
                    if( dirCome === 'down' ){

                        return 'up';
                    }
                }
                else {

                    if( dirCome === 'left' || dirCome === 'right' ){

                        return Math.random() > 0.5 ? 'up' : 'down';
                    }
                    else {

                        return Math.random() > 0.5 ? 'left' : 'right';
                    }
                }
            }
        }
    })
})();
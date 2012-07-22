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
            var that = this;

            setDirAnim( walkDir );

            // 设置其自动移动
            this.bind( 'EnterFrame', function() {
                
                var newX = this.attr( 'x' );
                var newY = this.attr( 'y' );

                // 若撞到墙了，恢复位置，并改变方向
                if( this.hit( 'WallCube' ) ){

                    this.attr({
                        x: preX,
                        y: preY
                    });

                    walkDir = getNewDir( walkDir );
                }
                else {

                    preX = this.x;
                    preY = this.y;

                    switch( walkDir ){

                        case 'left':
                            this.x--;
                            this.fixPosition( 'y' );
                            break;
                        case 'up':
                            this.y--;
                            this.fixPosition( 'x' );
                            break;
                        case 'right':
                            this.x++;
                            this.fixPosition( 'y' );
                            break;
                        case 'down':
                            this.y++;
                            this.fixPosition( 'x' );
                            break;
                    }

                    // 改变方向
                    if( walkDir !== preDir ){

                        setDirAnim( walkDir );

                        preDir = walkDir;
                    }
                    
                    // 检查是否为整点位置，是的话根据当前的路口情况，抉择是否换方向
                    if( this.x % this.w === 0 && this.y % this.h === 0 ){

                        if( Math.random() > 0.5 ){
                            this.trigger( 'completeCube', walkDir );
                        }
                    }
                }
            });

            this.bind( 'completeCube', function( dir ){

                var avaliableDirs = getAvaliableDir();

                if( avaliableDirs.length >= 3 ){

                    walkDir = getNewDir( dir );
                }
            });

            // 设置行走的方向动画
            function setDirAnim( dir ){
                var direction = {};

                switch( dir ){

                    case 'left':
                        direction.x = -1;
                        break;
                    case 'up':
                        direction.y = -1;
                        break;
                    case 'right':
                        direction.x = 1;
                        break;
                    case 'down':
                        direction.y = 1;
                        break;
                }

                that.trigger( 'NewDirection', direction );
            }

            // 获取随即的方向
            function getRandomDir(){

                return walkDirs[ Math.floor( Math.random() * 4 ) ];    
            }

            /**
             * 根据当前的行走方向和周边可用方向，选取新方向
             * 1、若只有一个方向可用，则使用这个方向
             * 2、若大于等于2个方向，则去除与来的方向相反的方向，在剩下的方向中选取一个
             */
            function getNewDir( dirCome ){

                var avaliableDirs = getAvaliableDir();
                var oppositeDir = getOppositeDirection( dirCome );

                // 如果只有一条路可以走
                if( !avaliableDirs || avaliableDirs.length === 0){

                    alert( 'No way to go!' );
                }
                else if( avaliableDirs.length === 1 ){

                    return avaliableDirs[ 0 ];
                }
                else {

                    // 去掉来的方向
                    avaliableDirs = avaliableDirs.join( '@' ).replace( new RegExp( '@' + oppositeDir + '|' + oppositeDir + '@' ), '' ).split( '@' );

                    return avaliableDirs[ Math.floor( Math.random() * avaliableDirs.length ) ];
                }
            }

            /**
             * 根据当前的x,y 计算在地图中的row, col坐标
             */
            function getCurrentMapCoor(){

                var mapRow;
                var mapCol;

                if( that.y % that.h / that.h <= 0.5 ){

                    mapRow = Math.floor( that.y / that.h );
                }
                else {

                    mapRow = Math.ceil( that.y / that.h );    
                }

                if( that.x % that.w / that.w <= 0.5 ){

                    mapCol = Math.floor( that.x / that.w );
                }
                else {
                    mapCol = Math.ceil( that.x / that.w );  
                }

                return {
                    row: mapRow,
                    col: mapCol
                }
            }

            /**
             * 获取当前位置的可用方向
             */
            function getAvaliableDir(){

                var mapCoor = getCurrentMapCoor();
                var mapRow = mapCoor.row;
                var mapCol = mapCoor.col;

                var avaliableDirs = [];

                if( that.wallMap[ mapRow - 1 ] && that.wallMap[ mapRow - 1 ][ mapCol ] === 0 ) {
                    avaliableDirs.push( 'up' );
                }
                if( that.wallMap[ mapRow ] && that.wallMap[ mapRow ][ mapCol - 1 ] === 0 ) {
                    avaliableDirs.push( 'left' );
                }
                if( that.wallMap[ mapRow ] && that.wallMap[ mapRow ][ mapCol + 1 ] === 0 ) {
                    avaliableDirs.push( 'right' );
                }
                if( that.wallMap[ mapRow + 1 ] && that.wallMap[ mapRow + 1 ][ mapCol ] === 0 ) {
                    avaliableDirs.push( 'down' );
                }

                return avaliableDirs;
            }

            /**
             * 根据给定的方向获取其相反方向
             */
            function getOppositeDirection( dir ){

                return dir === 'left' && 'right' ||
                    dir === 'right' && 'left' ||
                    dir === 'up' && 'down' || 'up';
            }
        },

        /**
         * 设置地图信息
         */
        monster: function( map ){

            this.wallMap = map;
            return this;
        }
    })
})();
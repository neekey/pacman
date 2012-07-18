(function(){

    Crafty.c( 'MapGenerator', {

        randomMap: function( w, h ){

            var mapArray = [];
            var row, col;
            var rowArray;

            // 先建立一个随机地图
            for( row = 0; row < h; row++ ){

                rowArray = [];

                for( col = 0; col < w; col++ ){

                    if( Math.random() > 0.5 ){
                        rowArray.push( 1 );
                    }
                    else {
                        rowArray.push( 0 );  
                    }
                }

                mapArray.push( rowArray );
            }

            // 将地图边缘封闭
            for( row = 0; row < h; row++ ){

                mapArray[ row ][ 0 ] = 1;
                mapArray[ row ][ w - 1 ] = 1;

                if( row === 0 || row === ( h -1 ) ){

                    for( col = 0; col < w; col++ ){

                        mapArray[ row ][ col ] = 1;   
                    }    
                }
            }

            // 从地图中寻找连续的块
            var blocks = {};
            var newBlock = undefined;
            // 用于标记 坐标与所在块的关系
            var blockTags = {};
            var lastestTag = 0;
            var currentTag = 0;
            var upperCubeTag;
            var leftCubeTag;
            var comboTag;
            var beCombodTag;
            var beCombodCube;
            var beCombodBlock;
            var upperCube;
            var leftCube;
            var i;

            
            for( row = 0; row < h; row++ ){

                for( col = 0; col < w; col++ ){

                    // 如果为可以移动的区域
                    if( mapArray[ row ][ col ] === 0 ){

                        upperCube = mapArray[ row - 1 ][ col ];
                        leftCube = mapArray[ row ][ col - 1 ];

                        // 说明这算是发现了一个新块
                        if( upperCube === 1 && leftCube === 1 ){

                            // 更新 tag
                            lastestTag++;
                            currentTag = lastestTag;

                            // 记录该块的tag值，并将当前块放入block中
                            blocks[ lastestTag ] = [];
                            blocks[ lastestTag ].push( [ row, col ] );
                            blockTags[ row + ',' + col ] = lastestTag;
                        }
                        else {

                            // 若只有左边有
                            if( leftCube === 0 && upperCube === 1 ){

                                currentTag = blockTags[ row + ',' + ( col - 1 ) ];
                                blockTags[ row + ',' + col ] = currentTag;
                                blocks[ currentTag ].push( [ row, col ] );
                            }
                            // 若只有上边有
                            if( leftCube === 1 && upperCube === 0 ){

                                currentTag = blockTags[ row - 1 + ',' + col ];
                                blockTags[ row + ',' + col ] = currentTag;
                                blocks[ currentTag ].push( [ row, col ] );
                            }
                            // 若两边都有
                            if( leftCube === 0 && upperCube === 0 ){

                                upperCubeTag = blockTags[ row - 1 + ',' + col ];
                                leftCubeTag = blockTags[ row + ',' + ( col - 1 ) ];

                                // 若两者属于同一个块
                                if( upperCubeTag === leftCubeTag ){

                                    currentTag = blockTags[ row - 1 + ',' + col ];
                                    blockTags[ row + ',' + col ] = currentTag;
                                    blocks[ currentTag ].push( [ row, col ] );
                                }
                                // 否则 合并到 tag较小的那一边
                                else {

                                    if( upperCubeTag > leftCubeTag ){

                                        comboTag = leftCubeTag;
                                        beCombodTag = upperCubeTag;
                                    }
                                    else {

                                        comboTag = upperCubeTag;
                                        beCombodTag = leftCubeTag;
                                    }

                                    currentTag = comboTag;
                                    blockTags[ row + ',' + col ] = currentTag;
                                    blocks[ currentTag ].push( [ row, col ] );

                                    // 将所有被合并的 移动过去

                                    beCombodBlock = blocks[ beCombodTag ];

                                    for( i = 0; i < beCombodBlock.length; i++ ){

                                        beCombodCube = beCombodBlock[ i ];

                                        blockTags[ beCombodCube[ 0 ] + ',' + beCombodCube[ 1 ] ] = comboTag;
                                        blocks[ comboTag ].push( beCombodCube );
                                    }

                                    // 删掉被合并的块
                                    delete blocks[ beCombodTag ];
                                }
                            }
                        }
                    }      
                }
            }

            // 根据连续信息，对分离的块进行合并
            

            console.log( blocks, blockTags );


            return mapArray;
        }
    });
})();
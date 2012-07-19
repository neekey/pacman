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

            // 对结果进行验证 仅用于测试
            setTimeout((function( that ){

                return function(){

                    that.randomMapCheck( blocks );

                };

            })( this ), 5000 );

            console.log( blocks, blockTags );

            // 将各个独立的连续区域进行连接
            var blocksInfos = {};

            // 先计算每个区块的重心，四个极值点
            var tagName;
            var targetTag;
            var blockEdge;
            var centerP;
            var leftP;
            var topP;
            var rightP;
            var bottomP;
            var block;
            var i;
            var sumRow;
            var sumCol;
            var cube;
            var centerDis;

            for( tagName in blocks ){

                block = blocks[ tagName ];


                // 重置
                leftP = topP = rightP = bottomP = undefined;
                centerP = undefined;
                sumCol = sumRow = 0;
                blockEdge = [];

                for( i = 0; i < block.length; i++ ){

                    cube = block[ i ];

                    // 判断是否为边界点
                    if( mapArray[ cube[ 0 ] - 1 ][ cube[ 1 ] - 1 ] === 1 ||
                        mapArray[ cube[ 0 ] - 1 ][ cube[ 1 ] ]=== 1 ||
                        mapArray[ cube[ 0 ] - 1 ][ cube[ 1 ] + 1 ] === 1 ||
                        mapArray[ cube[ 0 ] ][ cube[ 1 ] + 1 ] === 1 ||
                        mapArray[ cube[ 0 ] + 1 ][ cube[ 1 ] + 1 ] === 1 ||
                        mapArray[ cube[ 0 ] + 1 ][ cube[ 1 ] ] === 1 ||
                        mapArray[ cube[ 0 ] + 1 ][ cube[ 1 ] - 1 ] === 1 ||
                        mapArray[ cube[ 0 ] ][ cube[ 1 ] - 1 ] === 1 ){

                        blockEdge.push( cube );
                    }

                    sumRow += cube[ 0 ];
                    sumCol += cube[ 1 ];

                    if( leftP === undefined ){
                        leftP = cube
                    }
                    else {

                        if( leftP[ 0 ] > cube[ 0 ] ){
                            leftP = cube;
                        }
                    }

                    if( topP === undefined ){

                        topP = cube;
                    }
                    else {

                        if( topP[ 1 ] > cube[ 1 ] ){

                            topP = cube;
                        }
                    }

                    if( rightP === undefined ){

                        rightP = cube;
                    }
                    else {

                        if( rightP[ 0 ] < cube[ 0 ] ){

                            rightP = cube;
                        }
                    }

                    if( bottomP === undefined ){

                        bottomP = cube;
                    }
                    else {

                        if( bottomP[ 1 ] < cube[ 1 ] ){

                            bottomP = cube;
                        }
                    }
                }

                blocksInfos[ tagName ] = {
                    left: leftP,
                    top: topP,
                    right: rightP,
                    bottom: bottomP,
                    center: [ parseInt( sumRow / block.length ), parseInt( sumCol / block.length ) ],
                    edge: blockEdge
                };
            }

            var blockInfoA;
            var blockInfoB;
            var centerDisTmp;
            var targetBlockTag;
            var centerA;
            var centerB;
            var connectA;
            var connectB;
            var connectDis;
            var connectDisTemp;
            var edgeA;
            var edgeB;
            var blockConnectInfo = {};

            for( tagName in blocks ){

                centerDis = undefined;
                blockInfoA = blocksInfos[ tagName ];
                centerA = blockInfoA.center;
                if( blockConnectInfo[ tagName ] === undefined ){

                    blockConnectInfo[ tagName ] = '';
                }

                // 寻找和自己重心最近的
                for( targetTag in blocks ){

                    // 不是自身，同时又是没有连同的区域
                    if( targetTag !== tagName && blockConnectInfo[ tagName ].indexOf( '@' + targetBlockTag + '@' ) < 0 ){

                        blockInfoB = blocksInfos[ targetTag ];
                        centerB = blockInfoB.center;
                        centerDisTmp = Math.sqrt( Math.pow( centerA[ 0 ] - centerB[ 0 ], 2 ) + Math.pow( centerA[ 1 ] - centerB[ 1 ], 2 ) );

                        if( centerDis === undefined ){

                            centerDis = centerDisTmp;
                            targetBlockTag = targetTag;
                        }   
                        else {

                            if( centerDis > centerDisTmp ){

                                centerDis = centerDisTmp;
                                targetBlockTag = targetTag;
                            }
                        }
                    }
                }

                // 和找到的块进行连接
                edgeA = blockInfoA.edge;
                blockInfoB = blocksInfos[ targetBlockTag ];
                edgeB = blockInfoB.edge;
                connectDis = undefined;
                
                _.each( edgeA, function( cubeA ){

                    _.each( edgeB, function( cubeB ){

                        connectDisTemp = Math.sqrt( Math.pow( cubeA[ 0 ] - cubeB[ 0 ], 2 ) + Math.pow( cubeA[ 1 ] - cubeB[ 1 ], 2 ) );

                        if( connectDis ===  undefined || connectDis > connectDisTemp ){

                            connectDis = connectDisTemp;

                            connectA = cubeA;
                            connectB = cubeB;
                        }
                    });
                });

                // 将这两个点连接起来
                // 从A到B
                var cntARow = connectA[ 0 ];
                var cntBRow = connectB[ 0 ];
                var cntACol = connectA[ 1 ];
                var cntBCol = connectB[ 1 ];
                var moveRow = cntARow;
                var moveCol = cntACol;

                var itrRow = ( cntBRow - cntARow > 0 ) ? 1 : - 1;
                var itrCol = ( cntBCol - cntACol > 0 ) ? 1 : - 1;

                while( moveRow !== cntBRow && moveCol !== cntBCol ){

                    if( moveRow !== cntBRow ){

                        moveRow += itrRow;

                        mapArray[ moveRow ][ moveCol ] = 0;
                    }

                    if( moveCol !== cntBCol ){

                        moveCol += itrCol;

                        mapArray[ moveRow ][ moveCol ] = 0;
                    }
                }

                blockConnectInfo[ tagName ]+= '@' + targetTag + '@';

                _.each( blockConnectInfo, function( connectStr, tag ){

                    if( connectStr.indexOf( '@' + tagName + '@' ) ){

                        blockConnectInfo[ tag ]+= '@' + targetTag + '@';
                    }
                })
                
            }


            return mapArray;
        },

        randomMapCheck: function( blocks ){

            // 根据连续信息，对分离的块进行合并
            // 测试 将
            var block;
            var tagName;
            var baseColor = parseInt( 99999 * Math.random() + 100000 );

            for( tagName in blocks ){

                block = blocks[ tagName ];

                for( i = 0; i < block.length; i++ ){

                    Crafty.e( 'WallCube' ).wallCube({
                        x: block[ i ][ 1 ] * 32,
                        y: block[ i ][ 0 ] * 32,
                        color: '#' + ( baseColor + tagName * 10000 + tagName * 1000 + tagName * 100 + tagName * 10 )
                    });

                    Crafty.e("2D, DOM, Text").attr({
                        x: block[ i ][ 1 ] * 32,
                        y: block[ i ][ 0 ] * 32
                    }).text( tagName );
                }
            }   
        }
    });
})();
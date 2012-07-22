(function(){

    Crafty.c( 'PacmanMap', {

        mapArray: [],
        noWallArray: [],

        init: function(){

        },

        pacmanMap: function( w, h ){

            this.mapArray = this.randomMap( w, h );
            this.getNoWallArray();

            return this;
        },

        getNoWallArray: function(){

            var noWallCubes = [];
            var that = this;

            _.each( this.mapArray, function( rows, row ){

                _.each( rows, function( ifWall, col ){

                    if( ifWall === 0 ){

                        noWallCubes.push( [ row, col ] );
                    }
                }); 
            });

            return this.noWallArray = noWallCubes;
        },

        getRandomNoWallCubes: function( num ){

            var count = 0;
            var noWallCubes = [];
            var noWallIndexes = [];
            var indexTemp;
            var noWallLen = this.noWallArray.length;

            while( noWallIndexes.length < num ){

                indexTemp = Math.floor( Math.random() * noWallLen );

                if( _.indexOf( noWallIndexes, indexTemp ) < 0 ){

                    noWallIndexes.push( indexTemp );
                    noWallCubes.push( this.noWallArray[ indexTemp ] );
                }
            }

            return noWallCubes;
        },

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

                    // that.randomMapCheck( blocks );

                };

            })( this ), 5000 );

            console.log( blocks, blockTags );

            // 将各个独立的连续区域进行连接
            var blocksInfos = {};

            // 先计算每个区块的重心，四个极值点
            _.each( blocks, function( block, tagName ){

                // 区块的所有边界点
                var blockEdge = [];
                // 区块重心点
                var centerP;
                var sumRow = 0;
                var sumCol = 0;

                _.each( block, function( cube ){

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
                });
                
                blocksInfos[ tagName ] = {
                    center: [ parseInt( sumRow / block.length ), parseInt( sumCol / block.length ) ],
                    edge: blockEdge
                };
            });

            // 对区块进行连接
            var blockConnectInfo = {};

            _.each( blocks, function( blockA, tagName ){

                var blockInfoA = blocksInfos[ tagName ];
                var blockInfoB;
                // 两个区块重心距离
                var centerDis;
                var centerA = blockInfoA.center;
                var centerB;
                var centerDisTmp;
                // 最终选取的进行连接的区块的tag
                var targetBlockTag;
                // 进行连接的点
                var connectA;
                // 进行连接的点
                var connectB;
                var connectDis;
                var connectDisTemp;
                var edgeA;
                var edgeB;

                if( blockConnectInfo[ tagName ] === undefined ){

                    blockConnectInfo[ tagName ] = '';
                }

                // 需要需要进行连接的区块
                _.each( blocks, function( blockB, targetTag ){

                    // 不是自身，同时又是没有连同的区域
                    // console.log( targetTag + ' check: ' + blockConnectInfo[ targetTag ] );
                    if( targetTag !== tagName && blockConnectInfo[ tagName ].indexOf( '@' + targetTag + '@' ) < 0 ){

                        if( blockConnectInfo[ targetTag ] === undefined ){

                            blockConnectInfo[ targetTag ] = '';
                        }

                        blockInfoB = blocksInfos[ targetTag ];
                        centerB = blockInfoB.center;
                        centerDisTmp = Math.sqrt( Math.pow( centerA[ 0 ] - centerB[ 0 ], 2 ) + Math.pow( centerA[ 1 ] - centerB[ 1 ], 2 ) );

                        if( centerDis === undefined || centerDis > centerDisTmp ){

                            centerDis = centerDisTmp;
                            targetBlockTag = targetTag;
                        }
                    }
                });

                console.log( tagName + ' <-> ' +  targetBlockTag );

                if( targetBlockTag === undefined ){

                    return;
                }

                // 和找到的块进行连接
                edgeA = blockInfoA.edge;
                blockInfoB = blocksInfos[ targetBlockTag ];
                edgeB = blockInfoB.edge;
                
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

                setTimeout((function( a, b ){

                    return function(){

                        // Crafty.e( 'WallCube' ).wallCube({
                        //     x: a[ 1 ] * 32,
                        //     y: a[ 0 ] * 32,
                        //     color: 'red'
                        // });

                        // Crafty.e( 'WallCube' ).wallCube({
                        //     x: b[ 1 ] * 32,
                        //     y: b[ 0 ] * 32,
                        //     color: 'red'
                        // });
                    };
                })(connectA, connectB), 6000 );
                

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

                while( moveRow !== cntBRow || moveCol !== cntBCol ){

                    if( moveRow !== cntBRow ){

                        moveRow += itrRow;

                        mapArray[ moveRow ][ moveCol ] = 0;
                    }

                    if( moveCol !== cntBCol ){

                        moveCol += itrCol;

                        mapArray[ moveRow ][ moveCol ] = 0;
                    }
                }

                // 想一个块的联通信息中添加另一个块的信息
                function addTag( beAddedTag, addedTag ){

                    // 添加本身
                    if( blockConnectInfo[ beAddedTag ].indexOf( '@' + addedTag + '@' ) < 0 ){

                        blockConnectInfo[ beAddedTag ] += ( '@' + addedTag + '@' );
                    }    

                    _.each( blockConnectInfo[ addedTag ].split(/@|@@/), function(tag){

                        if( tag && blockConnectInfo[ beAddedTag ].indexOf( '@' + tag + '@' ) < 0 ){

                            blockConnectInfo[ beAddedTag ] += ( '@' + tag + '@' );   
                        }
                    });
                }

                addTag( tagName, targetBlockTag );
                addTag( targetBlockTag, tagName );

                _.each( blockConnectInfo, function( connectStr, tag ){

                    if( connectStr.indexOf( '@' + tagName + '@' ) >= 0 ){

                        addTag( tag, targetBlockTag );
                    }

                    if( connectStr.indexOf( '@' + targetBlockTag + '@' ) >= 0  ){

                        addTag( tag, tagName );
                    }
                });
            });

            return mapArray;    
        }
    });

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

                    // that.randomMapCheck( blocks );

                };

            })( this ), 5000 );

            console.log( blocks, blockTags );

            // 将各个独立的连续区域进行连接
            var blocksInfos = {};

            // 先计算每个区块的重心，四个极值点
            _.each( blocks, function( block, tagName ){

                // 区块的所有边界点
                var blockEdge = [];
                // 区块重心点
                var centerP;
                var sumRow = 0;
                var sumCol = 0;

                _.each( block, function( cube ){

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
                });
                
                blocksInfos[ tagName ] = {
                    center: [ parseInt( sumRow / block.length ), parseInt( sumCol / block.length ) ],
                    edge: blockEdge
                };
            });

            // 对区块进行连接
            var blockConnectInfo = {};

            _.each( blocks, function( blockA, tagName ){

                var blockInfoA = blocksInfos[ tagName ];
                var blockInfoB;
                // 两个区块重心距离
                var centerDis;
                var centerA = blockInfoA.center;
                var centerB;
                var centerDisTmp;
                // 最终选取的进行连接的区块的tag
                var targetBlockTag;
                // 进行连接的点
                var connectA;
                // 进行连接的点
                var connectB;
                var connectDis;
                var connectDisTemp;
                var edgeA;
                var edgeB;

                if( blockConnectInfo[ tagName ] === undefined ){

                    blockConnectInfo[ tagName ] = '';
                }

                // 需要需要进行连接的区块
                _.each( blocks, function( blockB, targetTag ){

                    // 不是自身，同时又是没有连同的区域
                    // console.log( targetTag + ' check: ' + blockConnectInfo[ targetTag ] );
                    if( targetTag !== tagName && blockConnectInfo[ tagName ].indexOf( '@' + targetTag + '@' ) < 0 ){

                        if( blockConnectInfo[ targetTag ] === undefined ){

                            blockConnectInfo[ targetTag ] = '';
                        }

                        blockInfoB = blocksInfos[ targetTag ];
                        centerB = blockInfoB.center;
                        centerDisTmp = Math.sqrt( Math.pow( centerA[ 0 ] - centerB[ 0 ], 2 ) + Math.pow( centerA[ 1 ] - centerB[ 1 ], 2 ) );

                        if( centerDis === undefined || centerDis > centerDisTmp ){

                            centerDis = centerDisTmp;
                            targetBlockTag = targetTag;
                        }
                    }
                });

                console.log( tagName + ' <-> ' +  targetBlockTag );

                if( targetBlockTag === undefined ){

                    return;
                }

                // 和找到的块进行连接
                edgeA = blockInfoA.edge;
                blockInfoB = blocksInfos[ targetBlockTag ];
                edgeB = blockInfoB.edge;
                
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

                setTimeout((function( a, b ){

                    return function(){

                        // Crafty.e( 'WallCube' ).wallCube({
                        //     x: a[ 1 ] * 32,
                        //     y: a[ 0 ] * 32,
                        //     color: 'red'
                        // });

                        // Crafty.e( 'WallCube' ).wallCube({
                        //     x: b[ 1 ] * 32,
                        //     y: b[ 0 ] * 32,
                        //     color: 'red'
                        // });
                    };
                })(connectA, connectB), 6000 );
                

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

                while( moveRow !== cntBRow || moveCol !== cntBCol ){

                    if( moveRow !== cntBRow ){

                        moveRow += itrRow;

                        mapArray[ moveRow ][ moveCol ] = 0;
                    }

                    if( moveCol !== cntBCol ){

                        moveCol += itrCol;

                        mapArray[ moveRow ][ moveCol ] = 0;
                    }
                }

                // 想一个块的联通信息中添加另一个块的信息
                function addTag( beAddedTag, addedTag ){

                    // 添加本身
                    if( blockConnectInfo[ beAddedTag ].indexOf( '@' + addedTag + '@' ) < 0 ){

                        blockConnectInfo[ beAddedTag ] += ( '@' + addedTag + '@' );
                    }    

                    _.each( blockConnectInfo[ addedTag ].split(/@|@@/), function(tag){

                        if( tag && blockConnectInfo[ beAddedTag ].indexOf( '@' + tag + '@' ) < 0 ){

                            blockConnectInfo[ beAddedTag ] += ( '@' + tag + '@' );   
                        }
                    });
                }

                addTag( tagName, targetBlockTag );
                addTag( targetBlockTag, tagName );

                _.each( blockConnectInfo, function( connectStr, tag ){

                    if( connectStr.indexOf( '@' + tagName + '@' ) >= 0 ){

                        addTag( tag, targetBlockTag );
                    }

                    if( connectStr.indexOf( '@' + targetBlockTag + '@' ) >= 0  ){

                        addTag( tag, tagName );
                    }
                });
            });

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
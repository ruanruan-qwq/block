

// 设置每次移动的距离
// distance 距离
var distance = 20;

// 分割 行 列
// 18 行 10 列
var Row = 18;
var Column = 10;

// 定义16宫格所在的位置
// gridX : row
// gridY : col
var gridX = 0;
var gridY = 0;

// 定义16宫格内 方块的位置
var Models = [
    // 第一个样式 L
    {
        0:{
            row:1,
            col:2,
        },

        1:{
            row:2,
            col:2,
        },

        2:{
            row:2,
            col:1, 
        },

        3:{
            row:2,
            col:0, 
        },
    }
]

// 当前的模型数据
var currentModel = {};

// 被固定的模型数据
var Fixed_module = {};


// 入门方法
// 当 body 加载完成时, 调用该函数
function call () {
    createModel();
    OnKeyDown()
}

// 生成对应的模型
function createModel () {

    // 初始化16宫格的位置
    gridX = 0;
    gridY = 0;

    // 确定使用的模型
    currentModel =Models[0];

    // 根据对应的数据，创建块元素
    // 使用 for 循环来遍历确定使用的模型中的所有数据源
    for (var key in currentModel) {
        // Document.createElement() 方法用于创建一个由标签名称 tagName 指定的 HTML 元素
        // 使用 createElement() 来创建一个新的div标签
        // dynamicDiv 动态Div
        var dynamicDiv = document.createElement('div');

        // 赋予 class名称
        dynamicDiv.className = 'inside';

        // Node.appendChild() 方法将一个节点附加到指定父节点的子节点列表的末尾处。
        document.getElementById('node').appendChild(dynamicDiv);
    }
    // 创建完对应的块元素之后 定位块元素的位置
    locationBlocks();
}

// 根据数据源定位块元素的位置
// 定位每个模型的位置
// locationBlocks 定位块
function locationBlocks () {

    // 查询每个方块是否越界了
    Internal_movement();

    // 拿到所有块元素的数据
    var eles = document.getElementsByClassName('inside');

    for (var i = 0 ; i < eles.length; i++) {

        // 拿到单个块元素
        // Single_block_element 单个块元素
        var Single_block_element = eles[i];

        // 找到每个块元素对应的数据
        // blockModel 区块模型， 单个模型的数据
        // currentModel 存放所有的模型数据源
        var blockModel = currentModel[i];

        // 根据每个块元素对应的数据，来指定块元素的位置
        // row 1 * 20 + px = 20px

        // 每个块元素的值由两个值确定
        // 1. 十六宫格的位置 gridX
        // 2. 块元素在16宫格内的位置
        Single_block_element.style.top = (gridX+blockModel.row) * distance + 'px';

        // col 2 * 20 + px = 40px
        Single_block_element.style.left = (gridY+blockModel.col) * distance + 'px';
    }
}

// 当用户按 上，下，左，右 时,触发对应的事件
function OnKeyDown () {
    var inside = document.getElementById('inside');

    // onkeydown 在用户按下一个按键时执行Javascript代码
    document.onkeydown = function  (event) {
        // 设置每次移动的距离
        
        // KeyCode 获取用户按下的 键值码
        switch (event.keyCode) {
            case 38 :
                // style 样式 style.top 高度
                // 现在的inside高度 = inside.offsetTop - 要走的距离 + px

                // inside.style.top = inside.offsetTop - distance + 'px';

                

                // move(-1,0);

                rotate();
                console.log('上');
                break;

                // 利用 marginTop 来设置每次移动的距离
                // parseFloat() 函数可解析一个字符串，并返回一个浮点数
                // || 或  style 样式  marginTop js中的写法
                // inside.style.marginTop = parseFloat(inside.style.marginTop || 0) - distance + 'px';

            case 39:
                // inside.style.left = inside.offsetLeft + distance + 'px';

                // 调用 move 函数进行移动
                // gridX = 0  gridY = 0
                // gridX = gridX + -1      gridY = gridY + 0
                // gridX = -1  gridY = 0

                // 调用 locationBlocks 函数，确定方块的位置

                // Single_block_element.style.top = (gridX+blockModel.row) * distance + 'px';
                // (gridX -1 + blockModel.row 16宫格内 单个方块的模型数据中的 行) * distance 20 + px

                move(0,1);
                console.log('右');
                break;

            case 40:
                // inside.style.top = inside.offsetTop + distance + 'px';

                move(1,0);
                // Touch_bottom();
                console.log('下');
                break;

            case 37:
                // inside.style.left = inside.offsetLeft - distance + 'px';

                move(0,-1);
                console.log('左');
                break;

        }
   
    }
}

// 移动模型
// x 表示在 X 轴移动的步数
// y 表示在 y 轴移动的步数
function move (x,y) {

    // 判断当前位置是否可以进行移动
    // 当前 16宫格的 x + x轴移动的步数
    // currentModel 当前模型的数据源
    
    if (iscollision(gridX + x, gridY + y,currentModel)){
        
        // y = 16宫格的位置 + y 移动的距离
        // if (x !== 0){
        //     // 将模型固定在底部
        //     Touch_bottom();
        // }

        // 如果 iscollision() 方法返回为true，则直接 return 掉move方法
        // 
        return;
    }
    
    // 移动 16宫格
    // gridX = gridX + x;
    gridX += x;
    gridY += y;

    // 根据16宫格的位置确定模型的位置
    locationBlocks();
}

// 模型旋转
function rotate () {
    // 模型旋转的算法
    // 旋转后的行 = 旋转前的列
    // 旋转后的列 = 3 - 旋转前的行

    // 调用 lodash.js 方法
    // 可以将 currentModel 克隆到新的对象中，并且 克隆体中数据的改变不会影响原对象
    var clonecurrentModel = _.cloneDeep(currentModel);

    // 遍历拿到模型数据源
    for (var key in clonecurrentModel) {

    //    声明一个 blockModel 拿到数据源
        var BlockModel = clonecurrentModel[key];

        // 后面的算法会改变 currentModel.row 的值， 声明一个对象保存下来
        var Row1 = BlockModel.row

        // 实现算法
        BlockModel.row = BlockModel.col;
        BlockModel.col = 3 - Row1;
    }

    // 判断是否触碰,如果旋转之后发生了触碰 那么就不需要此次旋转了
    // gridX || gridX 为当前16宫格的位置，旋转模型因为位置并没有发生改变
    // clonecurrentModel 为当前模型将要旋转到的位置
    if (iscollision(gridX,gridY,clonecurrentModel)) {
        // 在一个函数内任意位置调用return, 直接退出函数
        // 如果返回为 true，则返回 return
        return;
    }

    // 否则 代表接受了本次的旋转
    currentModel = clonecurrentModel;

    // 重新定位模型
    locationBlocks();
}

// 控制模型只能在容器内进行移动
function Internal_movement () {

    // 定义模型的边距
    // leftBound 左边界  rightBound 右边界  bottomBound 底部边界
    // gridX = 0   gridY = 0
    // Row 18行  Column 10列
    var leftBound = 0,
        rightBound = Column,
        bottomBound = Row;

        // 使用 fou 循环，拿到模型数据源
    for (var key in currentModel) {

        // 将模型数据赋值到 BLockModel 中
        var BLockModel = currentModel[key];

        // 如果 模型数据的行 + 16宫格 < leftBound 0 的话， 16宫格++
        if ((BLockModel.col + gridY) < leftBound){
            gridY++;
        };

        if((gridY + BLockModel.col) >= rightBound){
            gridY--;
        };

        if((BLockModel.row + gridX) >= bottomBound){
            gridX--;
            Touch_bottom();
        };
        
    }
}


// 设置 模型触碰到底部，模型底部的块元素变为灰色 同时生成一个新的模型
function Touch_bottom () {
    

    // 将 eles的classname 设为 inside，并保留内部的数据
    var eles = document.getElementsByClassName("inside");
    // eles.length = 4 数组从0开始，所以 - 1
    for (i = eles.length - 1; i >= 0; i-- ){
        // eles中的 i， 为单个模块的数据源
        var New_model = eles[i];
        // 将单个模块的数据改为 grey
        New_model.className ="grey";

        // 声明一个新的模型用来储存数据模型
        var BLOckModel = currentModel[i];
        // Fixed_module[0_0] = New_model  将新的模型数据储存到被固定模型中
        Fixed_module[(gridX + BLOckModel.row) + '_' + (gridY + BLOckModel.col)] = New_model;
    }

    // 生成新的模型
    createModel();    
}


// 判断模块与模块之间的碰撞
// X Y 表示 16宫格， 将要 移动到的位置
// model 表示当前模型数据源，将要完成的变化
function iscollision (x,y,model) {
    
    // 模型之间的触碰，在一个固定的位置 已经存在一个被固定的模型时， 活动中的模型则不可以再占用该位置
    // 判断触碰，就是判断移动中的模型《将要移动到的位置》是否已经存在被固定的模型，
    // 如果存在 返回 true,表示将要移动的位置会发生触碰 否则返回 false

    // 使用 for 循环，取出模型将要完成变化的数据源
    for (var key in model) {
        
        // 将数据赋值到 BLOCkModel 中
        var BLOCkModel = model[key];

        // 判断将要移动到的位置，是否已经存在被固定的块元素
        // 如果可以从 Fixed_module 已经被固定的数据源中 取出数据， 则表示该位置已经存在 被固定的模型 返回 true；否则返回false
        if (Fixed_module[(gridX + BLOCkModel.row) + '_' + (gridY + BLOCkModel.col)]) {
            return true;
        }
    }
    return false;
}



/*
* 提干：假设一个数组有几万项或者几十万项，要判断一个数字在一个数组中，
* 用什么方法？（要求性能要优）提供解题思路
* */

// 一、如果是无序数组，最简单的办法是直接遍历判断即可，时间复杂度为O(N)
/*
* 实现思路：
* 1、循环遍历得到数组的每一项，依次与被判断的数值比较，
* 2、如果相等则证明数组中存在该数值，记录结果，跳出循环结构。
* */
/*
* 补充：
* 数组数量比较大，一次性查找计算可能会阻塞其他程序的响应，
* 可以考虑把方法设计成异步的方式，分段进行判断。
* */
function search( arr, val ) {
    var i = 0, len = arr.length;
    while( i < len ) {
        if( arr[ i++ ] === val ) {
            return --i;
        }
    }
    return -1;
}

// 如果是有序数组，可以使用2分查找，时间复杂度为O(log(N))
/*
* 实现思路：
* 1、不断获取数组中间位置的数值参与判断
* 2、如果相等则证明数组中存在该数值，记录结果，跳出循环结构
* 3、如果大于，则证明数值可能在数组的右边，则把查找的起始下标改为中间下标+1，继续同样思路查找
* 4、如果小于，则证明数值可能在数组的左边，则把查找的结束下标改为中间下标-1，继续同样思路查找
* */
function bSearch( arr, val ) {
    while( start <= end ) {
        var start = 0, end = arr.length, middle;
        middle = start + Math.floor((end - start) / 2);
        if( arr[ middle ] === val ) {
            return middle;
        }else if( arr[ middle ] > val ) {
            start = middle + 1;
        }else {
            end = middle - 1;
        }
    }
    return -1;
}

// 如果数组中存储的值都是基本数据类型，同时以后会多次判断是否存在某数，
// 可以采用计数排序，之后判断有没有某数，一次性即可，时间复杂度为O(1)。
/*
* 实现思路：
* 1、定义一个对象
* 2、遍历数组的每一项值，以值为key，数量为值，存储到对象中
* 3、以后数组中有没有某值，就通过（对象[被判断的值]）即可得出结果
* 4、为了记录数组的变化，所以提供增加值和删除值的接口
* */
function getTimerSearch( arr ) {
    var timer = {};
    var i = 0, len = arr.length;
    while( i < len ) {
        timer[ arr[i++] ] = ++(timer[ arr[i] ]) || 1;
    }

    return {
        // 判断是否存在某值
        timerSearch: function( val ) {
            return !!timer[ val ];
        },
        // 后续给数组新增值
        timerAdd: function( val ) {
            timer[ val ] = ++(timer[ val]) || 1;
        },
        // 后续删除数组中的值
        timerDel: function( val ) {
            timer[ val ] = --(timer[ val ]);
        }
    }
}


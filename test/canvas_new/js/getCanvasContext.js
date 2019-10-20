/*
* function { getCanvasContext } 创建并获取canvas上下文
* param { containerId: string } 存放canvas元素的ID
* param { width: number } 画布的宽
* param { height: number } 画布的高
* */
function getCanvasContext( containerId, width, height, isBorder ) {
    var canvas = document.createElement('canvas');
    width && (canvas.width = width);
    height && (canvas.height = height);
    isBorder && (canvas.style.border = '1px solid red');
    containerId && document.getElementById(containerId).appendChild(canvas);
    return canvas.getContext('2d');
}
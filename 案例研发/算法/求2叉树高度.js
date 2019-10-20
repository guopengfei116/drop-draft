// 求完全2叉树高度
function getBinaryTreeHeight( binaryTree ) {
    var len = binaryTree.length;
    var height = 0, tempSum = 1;
    // <=是因为，tempSum从1算起，如果相等需要额外加一次
    while( tempSum <= len ) {
        tempSum *= 2;
        height++;
    }
    return height;
}

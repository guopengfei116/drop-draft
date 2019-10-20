# nodeType
- 元素：值为1
- 属性：值为2
- 文本: 值为3
- 字符部分 ：值为4
- 实体参考：值为5
- 实体：值为6
- 处理指令：值为7
- 注释：值为8
- document：值为9
- 文档类型：值为10
- 文档碎片：值为11
- 符号：值为12

# nodeName
- 元素：大写标签名
- 属性：属性名
- 文本：统一#text

# nodeValue
- 元素：null
- 属性：属性值
- 文本：文本字符串

# 获取元素的属性节点
- Element.attributes

# 节点操作

## 增
document.createElement( 元素名 )
document.createTextNode( 文本内容 )

<parent>.appendChild( 子元素 )
<parent>.insertBefore( 新元素，旧元素 )

element.innerHTML = ''
element.innerText = ''

## 删
<parent>.removeChild( 子元素 )
element.setAttribute( 属性名, '' )
element.属性名 = null

## 改
element.setAttribute( 属性名, '' )
element.属性名 = ''

## 查
element.getAttribute( 属性名 )
element.属性名
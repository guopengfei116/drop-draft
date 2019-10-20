# jqueryAjax

## Method
> jQuery中提供的几个ajax相关方法

### ajaxSetup
- 设置全局ajax默认选项。

### ajax
- 通过的ajax请求方法。
    + url[optional]
    + options

### post
- post方式请求数据。
    + url
    + data[optional]
    + success(response, status, xhr)[optional]
    + dataType[optional]
        + 可选值有：xml、html、text、script、json、jsonp

### get
- get方式请求数据。
    + url
    + data[optional]
    + success(response, status, xhr)[optional]
    + dataType[optional]
        + 可选值有：xml、html、text、script、json、jsonp

### getScript
- 加载js脚本并执行。
    + url
    + success(response, status)[optional]

### getJSON
- 加载JSON数据并解析传给回调。
    + url
    + data[optional]
    + success(data, status, xhr)[optional]

## Event
> ajax提供了几个全局事件，可以通过document来监听。

### ajaxStart
- 请求发送后执行，如果同时发送多个请求，
只有第一个请求发送后才会触发该事件。

### ajaxSend
- 请求发送后执行，如果同时发送多个请求，
每一个请求发送后都会触发该事件。

### ajaxSuccess
- 请求成功后执行

### ajaxError
- 请求失败后执行

### ajaxComplete
- 请求结束后执行，如果同时发送多个请求，
每一个请求结束后都会触发该事件。

### ajaxStop
- 请求结束后执行，如果同时发送多个请求，
只有最后一个请求结束后才会触发该事件。

console.log('我是Dev');

() => {
  console.log('gdgfg');
}

window.onload = function() {

  console.log('fdjkfnjdfk f fdfdfd fdjklfdj fdj fdj  fjdf ');

  // 定义ajax方法
  function ajax() {
    var ajaxData = {
      type: (arguments[0].type || "GET").toUpperCase(),
      url: arguments[0].url || "",
      async: arguments[0].async || "true",
      data: arguments[0].data || null,
      dataType: arguments[0].dataType || "json",
      contentType: arguments[0].contentType || "application/x-www-form-urlencoded; charset=utf-8",
      beforeSend: arguments[0].beforeSend || function() { },
      success: arguments[0].success || function() { },
      error: arguments[0].error || function() { }
    }

    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType = ajaxData.dataType;

    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    xhr.setRequestHeader("Content-Type", ajaxData.contentType);
    xhr.send(convertData(ajaxData.data));

    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {
          ajaxData.success(xhr.response)
        } else {
          ajaxData.error()
        }
      }
    }
  }

  //  XMLHttpRequest 兼容性处理
  function createxmlHttpRequest() {
    if(window.ActiveXObject) {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } else if(window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
  }

  // 转换请求参数
  function convertData(data) {
    if(typeof data === 'object') {
      var convertResult = "";
      for(var c in data) {
        convertResult += c + "=" + data[c] + "&";
      }
      convertResult = convertResult.substring(0, convertResult.length - 1)
      return convertResult;
    } else {
      return data;
    }
  }

  //定义获取浏览器地址栏传递的参数的方法
  function urlSerchToObj(urlSerch) {
    if(!urlSerch) {
      return;
    }
    var obj = {};
    var str = urlSerch.subStr(1);
    var strs = str.split('&');
    for(var i = 0; i < strs.length; i++) {
      var elements = strs[i].split('=');
      obj[elements[0]] = decodeURIComponent(elements[1] || '');
    }
    return obj;
  }


  // todo: 使用示例  ajax()
  // ajax({
  //   type: "POST",
  //   url: "ajax.php",
  //   dataType: "json",
  //   data: {
  //     "name": "abc",
  //     "age": 123,
  //     "id": "456"
  //   },
  //   beforeSend: function() {
  //     //some js code 
  //   },
  //   success: function(response) {
  //     console.log('response', response)
  //     // todo :  做实际的业务处理
  //   },
  //   error: function() {
  //     console.log("error")
  //   }
  // })

  var chartDom = document.getElementById('main');
  var myChart = echarts.init(chartDom);

  // todo: options是后端传递回来的  根据后端的数据格式  把数据处理好为options
  var option;
  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }]
  };
  option && myChart.setOption(option);

}

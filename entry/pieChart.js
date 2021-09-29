
import * as  echarts from 'echarts';
import '../less/pieChart.less';

window.onload = function() {

  // !  window.$ajaxFn 是发送ajax的异步方法

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
  $ajaxFn({
    type: "POST",
    url: "ajax.php",
    dataType: "json",
    data: {
      "name": "abc",
      "age": 123,
      "id": "456"
    },
    beforeSend: function() {
      //some js code 
    },
    success: function(response) {
      console.log('response', response)
      // todo :  做实际的业务处理
    },
    error: function() {
      console.log("error")
    }
  })

  var chartDom = document.getElementById('main');
  var myChart = echarts.init(chartDom);

  // todo: options是后端传递回来的  根据后端的数据格式  把数据处理好为options
  var option;
  option = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  option && myChart.setOption(option);
}

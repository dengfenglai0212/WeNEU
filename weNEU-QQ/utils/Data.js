const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//获取当前日期，以“/”连接
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
}
//获取当前日期，以“-”连接
const formatDateByH = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
//将string格式日期转换为“/”连接只包含月日的日期
const formatDateToSimple = data => {
  var date = new Date(Date.parse(data));
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [month, day].join('/')
}
//获取string格式日期的星期
const formatDateToWeek = data => {
  var date = new Date(Date.parse(data));
  const month = date.getDay();
  var weekDay;
  switch (month) {
    case 0:
      weekDay = '周日';
      break;
    case 1:
      weekDay = '周一';
      break;
    case 2:
      weekDay = '周二';
      break;
    case 3:
      weekDay = '周三';
      break;
    case 4:
      weekDay = '周四';
      break;
    case 5:
      weekDay = '周五';
      break;
    case 6:
      weekDay = '周六';
      break
  }
  return weekDay;
}

//日期的加减
const addDay = data => {
  //下面的不是时间戳，是时间戳*1000
  var timestamp = Date.parse(new Date());
  var newTimestamp = timestamp + data * 24 * 60 * 60 * 1000;
  var date = new Date(newTimestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('-');
}

//月份的加减
const addMonth = num => {
  if (typeof num == "string") {
    num = parseInt(num);
  }
  var date = new Date();
  const curYear = date.getFullYear();
  const curMonth = date.getMonth() + 1;
  const curDay = date.getDate();
  let month = (curMonth + num - 1) % 12;
  let year = curYear + (curMonth + num - month) / 12;
  let days = curDay;
  date = new Date(year, month, days);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('-')
}
//月份第几天增加后获取月份的第几天
const getDayByAddDay = data => {
  //下面的不是时间戳，是时间戳*1000
  var timestamp = Date.parse(new Date());
  var newTimestamp = timestamp + data * 24 * 60 * 60 * 1000;
  var date = new Date(newTimestamp);

  return date.getDate();
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 以下两个函数为自定义课表相关函数

// 获取距离开学是第几周星期几 startDay格式为 yyyy/MM/dd endDay yyyy/MM/dd
const getWeekAndDayFromSomeday = (startDay, endDay) => {
    var formatTime = new Date(endDay).getDay();
    // 返回 1970 年 1 月 1 日至今的毫秒数
    var formatTime1 = new Date(endDay).getTime();
    var formatTimeS = new Date(startDay).getTime();
    var days = (formatTime1 - formatTimeS) / (86400000);
    var week = (days / 7) + 1;
    var weekAndDay = {
      week: '',
      weekday: ''
    }
    if (formatTime == 0) {
      formatTime = 7
      weekAndDay = {
        week: parseInt(week),
        weekday: formatTime
      };
    } else {
      weekAndDay = {
        week: parseInt(week),
        weekday: formatTime
      };
    }
    return weekAndDay;
}

// 列出从今天开始到期末的每一天的日期和星期 startDay 开学日期(yyyy/MM/dd ) week学期周数
const listDateFormToday = (startDay, week) => {
  var dayMillSec = 86400000;
  var dateArray = [];
  var weekAndDay = getWeekAndDayFromSomeday(startDay, formatDateByH(new Date(new Date().getTime())));
  var totalDays = (week - weekAndDay.week)*7 - weekAndDay.weekday + 1;
  for(var i = 0; i < totalDays; i ++) {
    weekAndDay = getWeekAndDayFromSomeday(startDay, formatDateByH(new Date(new Date().getTime() + dayMillSec*i)));
    var date = formatDateByH(new Date(new Date().getTime() + dayMillSec*i));
    var s = date.split("-");
    var everydayFromToday = {
      date: s[1] + "." + s[2],
      week: weekAndDay.weekday
    }
    dateArray.push(everydayFromToday);
  }
  return dateArray;
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDateByH: formatDateByH,
  addDay: addDay,
  addMonth: addMonth,
  getDayByAddDay: getDayByAddDay,
  formatDateToSimple: formatDateToSimple,
  formatDateToWeek: formatDateToWeek,
  getWeekAndDayFromSomeday: getWeekAndDayFromSomeday,
  listDateFormToday: listDateFormToday
}
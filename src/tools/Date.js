/**
 * 功能函数-日期，可通过Rtp.Date访问
 *
 * add          - 递增指定日期
 * format       - 格式化日期
 * getDayNum    - 获取该月天数
 * getUTCDayCN  - 获取星期中的第几天
 * isLeapYear   - 是否闰年
 * string2Date  - 字符串转换为Date对象
 * isDateString - 字符串是否能转化成Date对象
 */

/**
 * 递增指定日期（不会改动原实例）
 * @param {Date} date - Date对象
 * @param {String} v - 格式串，支持运算符+/-，支持单位y/m/d/h/i/s(年/月/日/时/分/秒)
 * @param {String} [formatStr] - 返回的日期格式，如果指定则返回String类型
 * @return {Date|String} 运算后的Date对象或格式化结果（如果指定formatStr）
 * @example add(new Date('2012-02-29 16:04:00'), '1y'); //"2013-02-28 16:04:00"
 *          add(new Date('2017-10-18 16:04:00'), '-2m'); //"2017-08-18 16:04:00"
 */
function add(date, v, formatStr) {
    v = v.trim();
    let num = parseFloat(v), //数值
        unit = v.substr(-1), //单位
        time = date.getTime(),
        ret;
    if (unit == "y" || unit == "m") {
        //年 || 月
        ret = new Date(time);
        let d = date.getDate();
        ret.setDate(1); //先把日置为1，避免计算错误
        unit == "y"
            ? ret.setFullYear(ret.getFullYear() + num)
            : ret.setMonth(ret.getMonth() + num);
        ret.setDate(Math.min(d, getDayNum(ret))); //回填日，保证不超过当月最后一天
    } else {
        switch (unit) {
            case "d": //日
                time += num * 86400000;
                break;
            case "h": //时
                time += num * 3600000;
                break;
            case "i": //分
                time += num * 60000;
                break;
            case "s": //秒
                time += num * 1000;
                break;
            default:
        }
        ret = new Date(time);
    }
    return formatStr ? format(ret, formatStr) : ret;
}
/**
 * 计算时间差
 * @param {Date} startDate - Date对象
 * @param {Date} endDate - Date对象
 * @return {String} 计算后字符串
 * @example diffTime(new Date("2018-07-06 18:15:32"), new Date("2018-07-06 09:29:57")); //"15:14:25"
 */
function diffTime(startDate, endDate) {
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;
    if (diff < 0) {
        return "";
    }

    let hours = String(Math.floor(diff / 3600)).padStart(2, "0"),
        leaveSecond = diff % 3600,
        minutes = String(Math.floor(leaveSecond / 60)).padStart(2, "0"),
        seconds = String(leaveSecond % 60).padStart(2, "0");

    return hours + ":" + minutes + ":" + seconds;
}
/**
 * 格式化日期
 * @param {Date} date - Date对象
 * @param {String} [formatStr='Y-m-d'] - 需要输出的格式
 * @return {String} 格式化后的字符串
 * @example format(new Date()); //"2017-10-18 15:38:34"
 *          format(new Date(), 'Y年m月d日 星期N'); //"2017年10月18日 星期三"
 */
function format(date, formatStr = "Y-m-d H:i:s") {
    let str = "";
    for (let c of formatStr) {
        switch (c) {
            case "Y": //年，4位
                str += String(date.getFullYear()).padStart(4, "0");
                break;
            case "m": //月，2位
                str += String(date.getMonth() + 1).padStart(2, "0");
                break;
            case "n": //月，没有前导0
                str += date.getMonth() + 1;
                break;
            case "d": //日，2位
                str += String(date.getDate()).padStart(2, "0");
                break;
            case "j": //日，没有前导0
                str += date.getDate();
                break;
            case "H": //小时，4位
                str += String(date.getHours()).padStart(2, "0");
                break;
            case "i": //分，2位
                str += String(date.getMinutes()).padStart(2, "0");
                break;
            case "s": //秒，2位
                str += String(date.getSeconds()).padStart(2, "0");
                break;
            case "N": //星期中的第几天，汉字，日、一、二等，1位
                str += dategetUTCDayCN();
                break;
            default:
                str += c;
        }
    }
    return str;
}
/**
 * 渲染日期格式为显示用格式，转换为YYYY-MM-DD格式或YYYY-MM-DD HH:II:SS格式或HH:II:SS格式
 * @param {String} v - 需要渲染的字符串
 * @return {String} 渲染结果
 */
function formatDateDtl(v) {
    v = v.toString();
    let len = v.length;
    if (len == 14 || len == 12) {
        //转为YYYY-MM-DD HH:II:SS || YYYY-MM-DD HH:II
        return `${v.substr(0, 4)}-${v.substr(4, 2)}-${v.substr(
            6,
            2
        )} ${v.substr(8, 2)}:${v.substr(10, 2)}${
            len == 14 ? ":" + v.substr(12, 2) : ""
        }`;
    } else if (len == 8) {
        //转为YYYY-MM-DD
        return `${v.substr(0, 4)}-${v.substr(4, 2)}-${v.substr(6, 2)}`;
    } else if (len == 6 || len == 4) {
        //转为HH:II:SS || HH:II
        return `${v.substr(0, 2)}-${v.substr(2, 2)}-${
            len == 6 ? ":" + v.substr(4, 2) : ""
        }`;
    }
    return v;
}
/**
 * 获取该月的天数
 * @param {Date} date - Date对象
 * @return {Number} 该月的天数
 */
function getDayNum(date) {
    const m = date.getMonth() + 1;
    if (m == 2) {
        //2月
        return isLeapYear(date) ? 29 : 28;
    } else if (m == 4 || m == 6 || m == 9 || m == 11) {
        return 30;
    } else {
        return 31;
    }
}
/**
 * 获取星期中的第几天
 * @param {Date} date - Date对象
 * @returns (String)日、一、二、...六
 */
function getUTCDayCN(date) {
    switch (
        date.getUTCDay() //0(周日)到6(周六)
    ) {
        case 0:
            return "日";
        case 1:
            return "一";
        case 2:
            return "二";
        case 3:
            return "三";
        case 4:
            return "四";
        case 5:
            return "五";
        case 6:
            return "六";
        default:
    }
}
/**
 * 是否闰年
 * @param {Date} date - Date对象
 * @return {Boolean} 是true 否false
 */
function isLeapYear(date) {
    const year = date.getFullYear();
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}
/**
 * 字符串转换为Date对象
 * @param {String} v - 日期字符串，接受格式：YYYY-MM-DD、YYYY-MM-DD HH:II:SS
 * @return {Date|Null} v对应的Date实例，转换失败则为null
 */
function string2Date(v) {
    let str = v || "";
    if (str.length < 10) {
        //日期不完整，不合法
        return null;
    }
    str = str.replace(/\-/g, "/");
    if (str.length < 19) {
        //钟点不完整
        str += " 00:00:00".substr(str.length - 19);
    }

    let result = new Date(str);

    if (result.toString() === "Invalid Date") {
        return null;
    }
    let array = str.split(/\/|\s/g);
    let month = Number(array[1]);
    let date = Number(array[2]);
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            if (date > 31) {
                return null;
            }
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            if (date > 30) {
                return null;
            }
            break;
        case 2:
            if (isLeapYear(result)) {
                if (date > 29) {
                    return null;
                }
            } else {
                if (date > 28) {
                    return null;
                }
            }
            break;
        default:
            return null;
    }

    return result;
}
/**
 * 比较两个日期大小
 * @param {Date} dateTime1 - 日期字符串
 * @param {Date} dateTime2 - 日期字符串
 * @return {Boolean} true是大于，false是小于
 */
function compareDateTime(dateTime1, dateTime2) {
    let diff =
        Date.parse(dateTime1.replace(/\-/g, "/")) -
        Date.parse(dateTime2.replace(/\-/g, "/"));
    return diff > 0;
}
/**
 * 判断字符串能否转化成Date对象
 * @param {String} str - 日期字符串
 * @return {Boolean} true可以转化，false不可以转化
 */
function isDateString(str) {
    return string2Date(str) !== null;
}

/**
 * 
 * @param {{d: number, H: number, i: number, s: number} | number} duration 
 * @param {'d' | 'H' | 'i' | 's'} maxUnit 
 * @param {'zh_CN', 'en_US'} lang
 */
function durationFormat(duration, maxUnit, lang) {
    const oneDayMilliseconds = 24 * 60 * 60 * 1000
    const oneHourMilliseconds = 60 * 60 * 1000
    const oneMinuteMilliseconds = 60 * 1000
    const oneSecondMilliseconds = 1000

    let milliseconds = 0
    if (typeof duration == 'object') {
        const {d: days = 0, H: hours = 0, i: minutes = 0, s: seconds = 0} = duration
        milliseconds += days * oneDayMilliseconds
        milliseconds += hours * oneHourMilliseconds
        milliseconds += minutes * oneMinuteMilliseconds
        milliseconds += seconds * oneSecondMilliseconds
    } else {
        milliseconds = Number(duration)
        if (milliseconds < 0 || isNaN(milliseconds)) {throw new Error('duration is not a valid time.')}
    }

    const unit = {
        'zh_CN': {
            d: '天',
            H: '时',
            i: '分',
            s: '秒'
        },
        'en_US': {
            d: 'day',
            H: 'h',
            i: 'min',
            s: 's'
        }
    }

    let result = ''

    switch (maxUnit) {
        case 'd': 
            let days = Math.floor(milliseconds / oneDayMilliseconds)
            milliseconds %= oneDayMilliseconds
            if (days > 0) {result += `${days}${unit[lang].d}`}
            // fall through
        case 'H':
            let hours = Math.floor(milliseconds / oneHourMilliseconds)
            milliseconds %= oneHourMilliseconds
            if (hours > 0) {result += `${hours}${unit[lang].H}`}
            // fall through
        case 'i':
            let minutes = Math.floor(milliseconds / oneMinuteMilliseconds)
            milliseconds %= oneMinuteMilliseconds
            if (minutes > 0) {result += `${minutes}${unit[lang].i}`}
            // fall through
        case 's':
            let seconds = Math.floor(milliseconds / oneSecondMilliseconds)
            if (seconds > 0) {result += `${seconds}${unit[lang].s}`}
            break
        default:
            throw new Error('maxUnit is not a valid unit.')
    }
    return result
}

export default {
    add,
    diffTime,
    format,
    formatDateDtl,
    getDayNum,
    getUTCDayCN,
    isLeapYear,
    string2Date,
    compareDateTime,
    isDateString,
    durationFormat
};

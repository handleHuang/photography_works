// 防抖
export function _debounce(fn: any, delay: any) {
  var delay = delay || 200;
  var timer: any;
  return function () {
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(args);
    }, delay);
  };
}
// 节流
export function _throttle(fn: any, interval: any) {
  var last: number;
  var timer: any;
  var interval = interval || 200;
  return () => {
    var args = arguments;
    var now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(args);
      }, interval);
    } else {
      last = now;
      fn.apply(args);
    }
  };
}

/*!
 * CanJS - 2.3.23
 * http://canjs.com/
 * Copyright (c) 2016 Bitovi
 * Fri, 08 Apr 2016 17:58:15 GMT
 * Licensed MIT
 */

/*can@2.3.23#control/route/route*/
steal('can/util', 'can/route', 'can/control', function (can) {
    can.Control.processors.route = function (el, event, selector, funcName, controller) {
        selector = selector || '';
        if (!can.route.routes[selector]) {
            if (selector[0] === '/') {
                selector = selector.substring(1);
            }
            can.route(selector);
        }
        var batchNum, check = function (ev, attr, how) {
                if (can.route.attr('route') === selector && (ev.batchNum === undefined || ev.batchNum !== batchNum)) {
                    batchNum = ev.batchNum;
                    var d = can.route.attr();
                    delete d.route;
                    if (can.isFunction(controller[funcName])) {
                        controller[funcName](d);
                    } else {
                        controller[controller[funcName]](d);
                    }
                }
            };
        can.route.bind('change', check);
        return function () {
            can.route.unbind('change', check);
        };
    };
    return can;
});
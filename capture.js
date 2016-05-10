import Control from 'can/control/';

/**
 * can.Control processor that enables to add event listeners for the capture phase.
 *
 * Originally was implemented to work around Boostrap's multiselect which stops event propagation.
 *
 * @param el
 * @param event
 * @param selector
 * @param funcName
 * @param controller
 * @returns {Function}
 *
 * ```
 *      <button>Click</button>
 *
 *      let MyControl = can.Control.extend({
 *          'button click capture': function(){
 *              console.log('button click capture', arguments);
 *          },
 *          '{document} click capture': function(){
 *              console.log('{document} click capture', arguments);
 *          }
 *      });
 *      new MyControl('#app');
 * ```
 *
 * Note: currently event delegation is not supported. Checkout https://github.com/canjs/can-util/blob/master/dom/events/delegate/delegate.js#L73
 * or https://craig.is/riding/gators if you want to add it to this processor.
 */
Control.processors.capture = function (el, event, selector, funcName, controller) {
  var parts = selector.split(" "),
    pureSelector = parts[0],
    eventName = parts[1],

    // "{document} click capture" gets landed to "el":
    delegate = el;

  // regular selector like "button click capture":
  if (pureSelector){
    // el is Control's jquery-wrapped element:
    let element = el && el[0] || el;
    // TODO: use querySelectorAll.
    delegate = element && element.querySelector && element.querySelector(pureSelector);
  }

  var handler = function(ev){
    controller[funcName](delegate, ev)
  };
  delegate.addEventListener(eventName, handler, true);

  return function(){
    delegate.removeEventListener(eventName, handler, true);
  }
};
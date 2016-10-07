/* eslint-env browser */
export function dispatchEvent(eventName, data) {
    if(typeof window === 'undefined') {
        return;
    }
    let ev = null;
    if('initEvent' in Event.prototype) {
        ev = document.createEvent('Event');
        ev.initEvent(eventName, true, true);
    } else {
        ev = new Event(eventName);
    }
    ev.data = data;
    document.dispatchEvent(ev);
}

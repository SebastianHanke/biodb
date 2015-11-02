import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';


/*
*
* create jsdom versions of the document and window objects,
* then put them on the global object
*
*/

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

// make immutable accessible to chai

chai.use(chaiImmutable);
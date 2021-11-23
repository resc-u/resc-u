const hbs = require('hbs')

hbs.registerHelper('ifIn', function(elem, list, options) {

    if(list.includes(elem)) {
        return options.fn(this)       // true
    }
    return options.inverse(this)      // false

});
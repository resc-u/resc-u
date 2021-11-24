const hbs = require('hbs')

hbs.registerHelper('ifIn', function(elem, list, options) {

    if(list.includes(elem)) {
        return options.fn(this)       // true
    }
    return options.inverse(this)      // false

});

hbs.registerHelper("formatDate", function(datetime, format) {
    console.log("======>", datetime)

    let newDate = new Date(datetime)
    return newDate.toLocaleDateString("en-US")
  });
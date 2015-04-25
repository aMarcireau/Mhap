var mhap = require('./../');
var path = require('path');
var util = require('util');

mhap.compute(
    require(path.resolve(__dirname, 'testCities')).map(function(city) {
        return new mhap.locatedObject(city.location);
    }), 
    {xl: -5, xr: 10, yt: 41.5, yb: 51.5}, 
    function(locatedObject) {
        console.log(util.inspect(locatedObject, {showHidden: false, depth: null}));
    }
);

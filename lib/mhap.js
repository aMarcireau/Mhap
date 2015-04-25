var voronoi = require('voronoi');


module.exports = {
    /**
     * Represent a located object
     *
     * @param:
     *     location: {lattitude: <float>, longitude: <float>}
     * 
     */
    locatedObject: function(location) {
        this.location = location;
    },

    /**
     * Compute the Voronoï diagram for the given locatedObjects, within the given box
     *
     * @param: 
     *     locatedObjects: [locatedObject...]
     *     box: {xl: <float>, xr: <float>, yt: <float>, yb: <float>}
     *         xl < xr
     *         yt < yb
     *     callback: function(computedLocatedObject)
     *         computedLocatedObject: locatedObject U {}
     * 
     */
    compute: function(locatedObjects, box, callback) {
        var voronoiComputation = new voronoi();

        var result = voronoiComputation.compute(
            locatedObjects.map(function(locatedObject) {
                return {x: locatedObject.location.longitude, y: locatedObject.location.latitude};
            }),
            box
        );

        locatedObjects.forEach(function(locatedObject) {
            result.cells.every(function(cell, index) {
                if (locatedObject.location.latitude == cell.site.y && locatedObject.location.longitude == cell.site.x) {
                    
                    locatedObject.vertices = [];
                    cell.halfedges.forEach(function(halfedge) {
                        verticePosition = halfedge.getStartpoint();
                        locatedObject.vertices.push(
                            new module.exports.locatedObject({latitude: verticePosition.y, longitude: verticePosition.x})
                        );
                    });

                    result.cells.splice(index, 1);
                    return false;
                }

                return true;
            });

            callback(locatedObject);
        });
    },
};

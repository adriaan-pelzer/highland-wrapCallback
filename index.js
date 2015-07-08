var H = require ( 'highland' );

module.exports = function ( prnt, funcName ) {
    return H.wrapCallback ( function ( options, callBack ) {
        prnt[funcName] ( options, callBack );
    } );
};

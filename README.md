# highland-wrapCallback

## A method-specific replacement for highland.js' wrapCallback function

This module addresses a common issue with [Highland.js](http://highlandjs.org/), in particular with highland's *wrapCallback* function, when used on a method of an object, which needs to access its parent object.

### The Symptom

When trying to use it in its simplest form:

```
    H.wrapCallback ( someObject.someFunction )( theInputParameters )
        .errors ( function ( error ) {
            console.error ( error );
        } )
        .each ( console.log );
```

one encounters errors along the lines of:

```
    return this.makeRequest(method, params, callback);
                ^
    TypeError: undefined is not a function
```

This happens when the function needs to access its parent, which gets lost in the process of passing it as a parameter into *wrapCallback*.

### The Usual Workaround

Usually, you then have to resort to the following, slightly verbose way of dealing with it:

```
    H.wrapCallback ( function ( parms, callBack ) {
        someObject.someFunction ( parms, callBack );
    } )( theInputParameters )
        .errors ( function ( error ) {
            console.error ( error );
        } )
        .each ( console.log );
```

### The Solution

This is solved by *highland-wrapCallback*, by adding an additional parameter, which is the parent of the function, and supplying the function name as a string:

```
    var wrapCallback = require ( 'highland-wrapcallback' );

    wrapCallback ( someObject, 'someFunction' )( theInputParameters )
        .errors ( function ( error ) {
            console.error ( error );
        } )
        .each ( console.log );
```

That's it!

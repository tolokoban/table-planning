"use strict";

var $ = require( "dom" );

/**
 * @class Mix6
 */
var Mix6 = function ( opts ) {
    var elem = $.elem( this, 'div', 'mix6' );

    var arr = [
      [ "ABC", [ 1, 2, 3 ] ],
      [ "ACB", [ 0, 4, 5 ] ],
      [ "BAC", [ 0, 1, 3 ] ],
      [ "BCA", [ 2, 4, 5 ] ],
      [ "CAB", [ 0, 1, 5 ] ],
      [ "CBA", [ 2, 3, 4 ] ]
    ];

    window.setTimeout(
        recurse.bind( null, elem, arr )
    );
};

function recurse( table, arr, cols, row ) {
    if ( typeof cols === 'undefined' ) {
        cols = [ 0 ];
        row = $.div();
        $.add( row, $.div( [ arr[ 0 ][ 0 ] ] ) );
        $.add( table, row );
    }
    if ( cols.length > 5 ) {
        // We found a solution.
        $.add( row, $.div( [
          $.tag( 'span', 'grey', [ arr[ cols[ 5 ] ][ 0 ] ] ),
          $.tag( 'span', 'good', [
            cols.map( function ( idx ) {
                    return arr[ idx ][ 0 ];
                } ).join( '' )
          ] ),
          $.tag( 'span', 'grey', [ arr[ cols[ 0 ] ][ 0 ] ] ),
        ] ) );
        return;
    }
    var lastItem = arr[ cols[ cols.length - 1 ] ];
    lastItem[ 1 ].forEach( function ( idxNextItem ) {
        if ( cols.indexOf( idxNextItem ) > -1 ) return;
        if ( cols.length == 5 ) {
            var nextAvailable = arr[ idxNextItem ][ 1 ];
            if ( nextAvailable.indexOf( 0 ) == -1 ) {
                return;
            }
        }
        $.add( row, $.div( [ arr[ idxNextItem ][ 0 ] ] ) );
        cols.push( idxNextItem );
        recurse( table, arr, cols, row );
        cols.pop();
        if ( row.textContent.trim().length > 0 ) {
            console.info( "row.textContent=\"" + row.textContent + "\"" );
            $.add( table, row );
            row = $.div();
        } else {
            // This is an empty row: resuse it!
            $.clear( row );
        }
        var k = cols.length;
        while ( k-- > 0 ) {
            $.add( row, $.div() );
        }
    } );
}

module.exports = Mix6;
function dir( ele, dir ) {
    var matched = [];
    while( ele = ele[dir] ) {
        if( ele.nodeType === 1 ) {
            matched.push( ele );
        }
    }
    return matched;
}


Mat3 = {};

Mat3.makeIdentity = function() {
    return new Float32Array([
        1, 0, 0, 
        0, 1, 0, 
        0, 0, 1]);
}

Mat3.makeTranslation = function(tx, ty) {
    return new Float32Array([
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        tx,  ty,  1.0]);
}

Mat3.makeScale = function(sx, sy) {
    return new Float32Array([
        sx,  0.0, 0.0,
        0.0, sy,  0.0,
        0.0, 0.0, 1.0]);
}

Mat3.makeRotation = function(rad) {
    var sin = Math.sin(rad);
    var cos = Math.cos(rad);
    return new Float32Array([
        cos, -sin, 0.0,
        sin,  cos, 0.0,
        0.0,  0.0, 1.0]);
}

Mat3.multiplyTwo = function(a, b) {
    var res = new Float32Array(9);
        
    res[0] = a[0] * b[0] + a[3] * b[1] + a[6] * b[2];
    res[3] = a[0] * b[3] + a[3] * b[4] + a[6] * b[5];
    res[6] = a[0] * b[6] + a[3] * b[7] + a[6] * b[8];
    
    res[1] = a[1] * b[0] + a[4] * b[1] + a[7] * b[2];
    res[4] = a[1] * b[3] + a[4] * b[4] + a[7] * b[5];
    res[7] = a[1] * b[6] + a[4] * b[7] + a[7] * b[8];
    
    res[2] = a[2] * b[0] + a[5] * b[1] + a[8] * b[2];
    res[5] = a[2] * b[3] + a[5] * b[4] + a[8] * b[5];
    res[8] = a[2] * b[6] + a[5] * b[7] + a[8] * b[8];
        
    return res;
}

Mat3.transformPoint = function(m, x, y) {
    var res = new Float32Array(2);
    
    res[0] = m[0] * x + m[3] * y + m[6];
    res[1] = m[1] * x + m[4] * y + m[7];
    
    return res;
}

Mat3.multiply = function() {
    if (arguments.length < 2) {
        throw 'Matrix multiply function needs two or more parameters';
    }
    var res = Mat3.multiplyTwo(arguments[0], arguments[1]);
    for (var i = 2; i < arguments.length; i++) {
        res = Mat3.multiplyTwo(res, arguments[i]);
    }
    return res;
}

Mat3.transpose = function(a) {
    var res = new Float32Array(9);
        
    res[0] = a[0];
    res[1] = a[3];
    res[2] = a[6];
    
    res[3] = a[1];
    res[4] = a[4];
    res[5] = a[7];
    
    res[6] = a[2];
    res[7] = a[5];
    res[8] = a[8];
    
    return res;
}

Mat3.determinant = function(a) {
    // http://www.cg.info.hiroshima-cu.ac.jp/~miyazaki/knowledge/teche23.html
    
    return a[0] * a[4] * a[8] +
           a[1] * a[5] * a[6] +
           a[2] * a[3] * a[7] -
           a[0] * a[5] * a[7] -
           a[2] * a[4] * a[6] -
           a[1] * a[3] * a[8];
}

Mat3.invert = function(a) {
    // http://www.cg.info.hiroshima-cu.ac.jp/~miyazaki/knowledge/teche23.html
    
    var d = Mat3.determinant(a);
    if (d == 0.0) {
        throw 'Matrix is not invertible';
    }
    
    var s = 1.0 / d;
    var res = new Float32Array(9);
    
    res[0] = s * (a[4] * a[8] - a[7] * a[5]);
    res[3] = s * (a[6] * a[5] - a[3] * a[8]);
    res[6] = s * (a[3] * a[7] - a[6] * a[4]);
    
    res[1] = s * (a[7] * a[2] - a[1] * a[8]);
    res[4] = s * (a[0] * a[8] - a[6] * a[2]);
    res[7] = s * (a[6] * a[1] - a[0] * a[7]);
    
    res[2] = s * (a[1] * a[5] - a[4] * a[2]);
    res[5] = s * (a[3] * a[2] - a[0] * a[5]);
    res[8] = s * (a[0] * a[4] - a[3] * a[1]);
    
    return res;
}

Mat3.toString = function(m) {
    var str = '';
    str += '[' + m[0] + ', ' + m[3] + ', ' + m[6] + ']\n';
    str += '[' + m[1] + ', ' + m[4] + ', ' + m[7] + ']\n';
    str += '[' + m[2] + ', ' + m[5] + ', ' + m[8] + ']\n';
    return str
}

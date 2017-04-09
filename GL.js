//
// GL namespace
//
GL = {};

//
// GL Program
//
GL.Program = function(gl, vertexShaderCode, fragmentShaderCode) {
    this._uniforms = {};
    this._attributes = {};
    this._gl = gl;
    this._vertexShader = this._createShader(vertexShaderCode, gl.VERTEX_SHADER);
    this._fragmentShader = this._createShader(fragmentShaderCode, gl.FRAGMENT_SHADER);
    this._program = gl.createProgram();
    gl.attachShader(this._program, this._vertexShader);
    gl.attachShader(this._program, this._fragmentShader);
    gl.linkProgram(this._program);
    if (!gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
        throw gl.getProgramInfoLog(this._program);
    }
}

GL.Program.prototype = {

    constructor: GL.Program,
    
    _createShader: function(code, type) {
        var gl = this._gl;
        var shader = gl.createShader(type);
        gl.shaderSource(shader, code);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw gl.getShaderInfoLog(shader);
        }
        return shader;
    },
    
    _findUniform: function(name) {
        if (!(name in this._uniforms)) {
            this._uniforms[name] = this._gl.getUniformLocation(this._program, name);
            if (!this._uniforms[name]) {
                throw 'Invalid uniform: ' + name;
            }
        }
        return this._uniforms[name];
    },
    
    _findAttribute: function(name) {
        if (!(name in this._attributes)) {
            this._attributes[name] = this._gl.getAttribLocation(this._program, name);
            if (!this._attributes[name] < 0) {
                throw 'Invalid attribute: ' + name;
            }
        }
        return this._attributes[name];
    },
    
    inUse: function() {
        return (this._gl.getParameter(this._gl.CURRENT_PROGRAM) == this._program);
    },
    
    use: function() {
        if (!this.inUse()) {
            this._gl.useProgram(this._program);
        }
    },
    
    getAttributeLocation: function(name) {
        return this._findAttribute(name);
    },
    
    setUniform1f: function(name, value) {
        this._gl.uniform1f(this._findUniform(name), value);
    },
    
    setUniform2f: function(name, x, y) {
        this._gl.uniform2f(this._findUniform(name), x, y);
    },
    
    setUniform3f: function(name, x, y, z) {
        this._gl.uniform3f(this._findUniform(name), x, y, z);
    },
    
    setUniform4f: function(name, x, y, z, w) {
        this._gl.uniform4f(this._findUniform(name), x, y, z, w);
    },
    
    setUniform1i: function(name, value) {
        this._gl.uniform1i(this._findUniform(name), value);
    },
    
    setUniformMatrix3fv: function(name, value) {
        this._gl.uniformMatrix3fv(this._findUniform(name), false, value);
    },
}

//
// Make a quad with texture coordinates
//
GL.makeQuad = function(x, y, w, h, texW, texH) {
    return [x, y, 0, 0,               // 0-2
            x, y + h, 0, texH,        // |/
            x + w, y, texW, 0,        // 1
            x, y + h, 0, texH,        //   2
            x + w, y + h, texW, texH, //  /|
            x + w, y, texW, 0];       // 0-1
}

// HelloPoint1.js
// Vertex shader program
// 本节介绍如何将数据从JS 传递到shader
var VSHADER_SOURCE =
'attribute vec4 a_Position;\n'+
'attribute float a_PointSize;\n'+
'void main() {\n' +
' gl_Position = a_Position;\n' + // Coordinates
' gl_PointSize = a_PointSize;\n' + // Set the point size
'}\n';

// Fragment shader program
var FSHADER_SOURCE =
'void main() {\n' +
' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the color
'}\n';

function main() {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);   // 为了适配不同的浏览器，抽象了这个方法
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders');
        return;
    }
    
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }


    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, n);
}


function initVertexBuffers(gl) {
    var verticesSizes = new Float32Array([
        // Vertex coordinates and size of point
        0.0, 0.5, 10.0,
        -0.5, -0.5, 20.0,
        0.5, -0.5, 30.0
    ]);
    var FSIZE = verticesSizes.BYTES_PER_ELEMENT;
    var n = 3;
    var vertexSizeBuffer = gl.createBuffer();

    if (!vertexSizeBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0);
    gl.enableVertexAttribArray(a_Position);


    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if(a_PointSize < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);
    gl.enableVertexAttribArray(a_PointSize);

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return n;
}



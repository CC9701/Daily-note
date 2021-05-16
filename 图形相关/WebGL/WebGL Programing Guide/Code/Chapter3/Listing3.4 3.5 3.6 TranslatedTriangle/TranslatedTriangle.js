// HelloPoint1.js
// Vertex shader program
// 练习在顶点着色器中进行平移、旋转、缩放
var VSHADER_SOURCE =
'attribute vec4 a_Position;\n'+
'uniform vec4 u_Translation;\n' +  
'uniform mat4 u_Rotation;\n' +
'uniform mat4 u_Scale;\n' +
'void main() {\n' +

' gl_Position = a_Position + u_Translation;\n' + // 位移
' gl_Position = u_Rotation * gl_Position;\n' + // 旋转
' gl_Position = u_Scale * gl_Position;\n' + // 缩放
'}\n';

// Fragment shader program
var FSHADER_SOURCE =
'void main() {\n' +
' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the color
'}\n';

// The translation distance for x, y, and z direction
var Tx = 0.5, Ty = 0.5, Tz = 0.0;

// Rotation angle
var ANGLE = 90.0;

// Scale
var scaleX = 0.2;
var scaleY = 0.2;
var scaleZ = 0.2;


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

    
    // Set the positions of vertices
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    // Pass the translation distance to the vertex shader
    var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
    gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0);
    // Pass the Rotate matrix
    var radian = Math.PI * ANGLE / 180.0;
    var cosB = Math.cos(radian), sinB = Math.sin(radian);

    var xRotateMatrix = new Float32Array([
        cosB, sinB, 0.0, 0.0,
        -sinB, cosB, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);

    var u_Rotation = gl.getUniformLocation(gl.program, 'u_Rotation');
    gl.uniformMatrix4fv(u_Rotation, false, xRotateMatrix);

    // Pass the Scale matrix 
    var scale = new Float32Array([
        scaleX, 0.0, 0.0, 0.0,
        0.0, scaleY, 0.0, 0.0,
        0.0, 0.0, scaleZ, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);

    var u_Scale = gl.getUniformLocation(gl.program, 'u_Scale');
    gl.uniformMatrix4fv(u_Scale, false, scale);


    // Set the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
    0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = 3; // The number of vertices
    
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object ');
        return -1;
    }
    
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
    
    return n;
} 
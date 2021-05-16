// HelloPoint1.js
// Vertex shader program
// 本节介绍如何将数据从JS 传递到shader
var VSHADER_SOURCE =
'attribute vec4 a_Position;\n'+
'void main() {\n' +
' gl_Position = a_Position;\n' + // Coordinates
' gl_PointSize = 10.0;\n' + // Set the point size
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
    // get the storage location of attribute variable
    // 通过getAttribLocation 获取shader中的变量地址
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return
    }

    // Pass vertex position to attribute variable
    gl.vertexAttrib4f(a_Position, 0.0, 0.0, 0.0, 1.0);


    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}


/* 本节主要熟悉给Shader中传值的这几个函数
gl.vertexAttrib1f(a_Position, 0.0);
gl.vertexAttrib2f(a_Position, 0.0, 0.0);
gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0,);
gl.vertexAttrib4f(a_Position, 0.0, 0.0, 0.0, 1.0);

以及 从顶点着色器中获取Attribute属性的地址
 gl.getAttribLocation(gl.program, 'a_Position');
*/
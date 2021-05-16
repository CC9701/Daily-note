// HelloPoint1.js
// Vertex shader program
// 本节练习将多个数据传到 Attribute 型变量的地址中
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


    // 给canvas 添加点击响应事件
    canvas.onmousedown = function(ev) { click(ev, gl, canvas, a_Position); };


    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}

var g_points = [];
function click(ev, gl, canvas, a_Position) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    // 将鼠标点击的位置坐标映射到[-1, 1]
    x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
    g_points.push(x); g_points.push(y);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = g_points.length;

    for (var i = 0; i < len; i+=2) {
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
    

}

/* 下节主要熟悉给片段着色器中传值的这几个函数
gl.uniform1f(location, v0)
gl.uniform2f(location, v0, v1)
gl.uniform3f(location, v0, v1, v2)
gl.uniform4f(location, v0, v1, v2, v3)

以及 从顶点着色器中获取Attribute属性的地址
  gl.getUniformLocation(gl.program, 'u_FragColor');

*/
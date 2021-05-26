var VSHADER_SOURCE =
'attribute vec4 a_Position;\n'+
'attribute vec2 a_TexCoord;\n'+
'varying vec2 v_TexCoord;\n'+
'void main() {\n' +
' gl_Position = a_Position;\n' + // Coordinates
' v_TexCoord = a_TexCoord;\n' + 
'}\n';

// Fragment shader program
var FSHADER_SOURCE =
'#ifdef GL_ES\n' +
'precision mediump float;\n' + 
'#endif\n' +
'uniform sampler2D u_Sampler;\n' +
'varying vec2 v_TexCoord;\n'+
'void main() {\n' +
'gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' + // Set the color
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
    if (!initTextures(gl, n)) {
        console.log("Failed to intialize the texture");
        return;
    }
}


function initVertexBuffers(gl) {
    var verticesTexCoords = new Float32Array([
        // Vertex coordinates and texture coordinate
        -0.5,  0.5,   0.0, 1.0,
        -0.5, -0.5,   0.0, 0.0,
         0.5,  0.5,   1.0, 1.0,
         0.5, -0.5,   1.0, 0.0,
    ]);
    var n = 4;    // the number of vertices
    // Create the buffer object
    var vertexTexCoordBuffer = gl.createBuffer();

    if (!vertexTexCoordBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

    var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;


    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
    gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object
  
    // Get the storage location of a_TexCoord
    var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    if (a_TexCoord < 0) {
      console.log('Failed to get the storage location of a_TexCoord');
      return -1;
    }

    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
    gl.enableVertexAttribArray(a_TexCoord);  // Enable the assignment of the buffer object

    return n;
}

function initTextures(gl, n) {
    // Create a texture object 
    var texture = gl.createTexture();
    if (!texture) {
        console.log('Failed to create the texture object');
        return false;
      }
    // get the storage location of u_Sampler
    var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
    if (!u_Sampler) {
        console.log('Failed to get the storage location of u_Sampler');
        return false;
    }
    var image = new Image();  // Create the image object
    image.crossOrigin = "anonymous";
    if (!image) {
        console.log('Failed to create the image object');
        return false;
      }
    // Register the event handler to be called on loading an image
    image.onload = function(){ loadTexture(gl, n, texture, u_Sampler, image); };
    // Tell the browser to load an image
    image.src = 'sky.jpg';
    // tell the browser to load image
    return true;
}

function loadTexture(gl, n, texture, u_Sampler, image){
    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1); // Flip the image's y axis
    gl.activeTexture(gl.TEXTURE0); // Enable texture unit0
    gl.bindTexture(gl.TEXTURE_2D, texture); // Bind the texture object to the target

    // Set the texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // Set the texture image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    // Set the texture unit 0 to the sampler
    gl.uniform1i(u_Sampler, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
};




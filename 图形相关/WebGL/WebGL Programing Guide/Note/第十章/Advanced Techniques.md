### 

# 内容索引

```
本章内容
3. HUD
4. 雾效
5. 利用fragment shader 画一个圆
7. 变换shader
8. 将已经绘制的画面存入一张Texture中(涉及FBO的使用)
```



# 正文

## 3.HUD

#### 实现思路

```
在HTML 中准备两个canvas，一个使用webGL的API，另一个使用绘制2D图形的API

```



## 4.雾效（近处清晰远处较模糊）

#### 实现的思路

Step1： 计算权重因子，取值范围[0, 1], 这个例子里采用权重大小随距离做线性变化，另外也可以自己设计非线性的变化公式

![Equation10.1](.\Images\Equation10.1.png)

#### 

```
end point : 用于表示完全消失处的深度值
start point ： 用于表示从哪个深度开始逐渐消失
distance from eye point 的值 介于前两者之前  或需要使用clamp做处理
```

Step2： 对fragment color 做加权和

![Equation10.2](.\Images\Equation10.2.png)



## 5.画一个圆

```
step(length(uv), 0.5);
可用smoothstep 替代step 来消除锯齿
```



## 7.变换shader

在一段代码里面使用多个shader

示例步骤

```
1. 准备两个shader
2. 分别为两段shader使用createProgram
3. 在调用draw函数之前，使用gl.Program()设置指定的shader
```



## 8.将已经绘制的画面存入一张Texture中

```
1.WebGL 支持两种类型的Object 来绘制对象
texture object 在texture 中的content 可以被直接以texture使用 
renderbuffer object renderbuffer 中则可以存放更多类型的数据
```

```
2. 使用framebufferobject 的八个步骤
（1）创建framebuffer对象
gl.createFramebuffer()

创建完framebuffer 之后需要将一个带有颜色信息的texture object 和一个带有深度信息的renderbuffer object关联到framebuffer上（对应2， 3 步）

```



```
（2）创建texture对象，并设置相关的参数
gl.createTexture()
gl.bindTexture(),
gl.texImage2D()
gl.Parameteri()
这里 texture 的大小需要比canvas小一些， make the drawing process faster. 
```



```
（3）创建renderbuffer对象
gl.createRenderbuffer()

这里renderbuffer 被用来当作depth buffer
```

```
创建完renderbuffer 之后，需要将器与GPU中指定的存储空间做绑定
gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer)

参数：
para1 ： target   必须是gl.RENDERBUFFER （声明存储空间的buffer类型）
pata2 ： renderbuffer object 

gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);


参数：
para1 ： target   必须是gl.RENDERBUFFER （声明存储空间的buffer类型）
pata2 ： internalformat 设置renderbuffer 数据的格式 这里介绍了了两种类型
    gl.DEPTH_COMPONENT16
    gl.STENCIL_COMPONENT16
    gl.RGBA4 
    gl.RGB5_A1
    gl.RGB565
para3： 宽度
para4： 高度
```



```

（4）创建framebuffer对象
gl.createFramebuffer()

```



```
（5）将纹理对象与帧缓冲对象中的颜色部分（color attachment）联系
gl.bindFramebuffer(), 

gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
参数
para1： 声明framebuffer 在内存中的buffer类型  Must be gl.FRAMEBUFFER.

一但将framebuffer 与target 绑定， 就可以将texture object 写到一个famebufferobject 中
gl.framebufferTexture2D()


gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

参数：
para1： target
para2： 附着的信息buffer  
gl.COLOR_ATTACHMENT0 for colorbuffer
gl.DEPTH_ATTACHMENT  for depthbuffer

para3： textarget 参数可以是
gl.TEXTURE_2D
gl.CUBE_MAP_TEXTURE

para4： 待绑定的texture object
para5： 使用的texture的mipmap等级
```



```
（6）将renderbuffer Object 关联到 framebuffer object 上
gl.framebufferRenderbuffer() 
gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, 
gl.RENDERBUFFER, depthBuffer);

参数：
para1：target
para2： 附着的信息buffer  
gl.COLOR_ATTACHMENT0 for colorbuffer
gl.DEPTH_ATTACHMENT  for depthbuffer
gl.STENCIL_ATTACHMENT for stencilbuffer

para3：renderbuffertarget Must be gl.RENDERBUFFER

para4： 待传入的renderbuffer 对象
```

```
（7）检查framebuffer对象是否被正确构建
gl.checkFramebufferStatus()


参数
para1： 检测的类型
gl.FRAMEBUFFER_COMPLETE   framebufer object 
    是否被正确构建
gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT 
    One of the framebuffer attachment pointsis incomplete.
gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS  
    textureobject 或 renderbufferobject 的宽高是否是不同的
gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT
    framebuffer 是否一个有效attachment 都不包含


```

```
（8）使用framebuffer object进行绘制
gl.bindFramebuffer()
```


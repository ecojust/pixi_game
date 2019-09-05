# pixi_game
pixi.js、vue、TypeScript




### Date:19-09-01      
#### 1.将之前已经写好的功能用ts实现
###### &nbsp;&nbsp;&nbsp;&nbsp;interface:task、interface:tasklist、class:keyboard
###### &nbsp;&nbsp;&nbsp;&nbsp;任务队列、动画元素(人物)按键绑定、动画元素(小松鼠)定时随机调整运动方向

![avatar](/public/quickphoto/190901.jpeg)

### Date:19-09-05     
#### 1.interface优化
###### &nbsp;&nbsp;&nbsp;&nbsp;interface:task————添加成员变量 sprite:any 这样的话，为pixi的精灵类添加自定义属性就不会报成员属性不存在的error了

#### 2.键盘P键撒网来抓小松鼠
###### &nbsp;&nbsp;&nbsp;&nbsp;通过计算两个精灵类距离实现抓捕（<10:抓到了；<15:差一点；<20：加油）

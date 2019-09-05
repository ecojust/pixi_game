<template>
  <div id="index">
    <div class="menu">
          <span class="key">name:</span>
          <span class="value">{{name}}</span>
          <span class="key">grade:</span>
          <span class="value">{{grade}}</span>
          <span class="key">⬆️:上</span>
          <span class="key">⬇️:下</span>
          <span class="key">⬅️:左</span>
          <span class="key">➡️:右</span>

      </div>
      <div class="person" v-show="panel.show" :style="{'top':panel.top + 'px','left':panel.left + 'px'}">

      </div>
      <div class="skill">
        <div class="keyboard" v-for="i in 1" :key="i">
          <img src="/images/net9.png" alt="">
          <span class="key">p</span>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import * as PIXI from 'pixi.js'
import {task,tasklist,keyboard} from '../tsfile/interface'

import { Component, Prop, Vue, Watch,Model } from "vue-property-decorator";


@Component
export default class Home extends Vue {

    private name: string = '桔子桑';
    private grade: number = 12;
    private panel: any = {
      top:12,
      left:12,
      show:false
    };


  

  @Watch('msg')
  public onMsgWatch(newV: any, oldV: any) {
    console.log(newV)

  };
  // 生命周期
  created():void{
    // console.error('created');
    
  };
  mounted(){
    // console.error('mounted')
    this.init();

  //
  };
  // 方法
  private init(){
            const win = this;
            //新建一个pixi的实例，并加以配置
            const width = 960,height = 520;
            let app = new PIXI.Application({width: width, height: height});
            app.renderer.backgroundColor = 0x061639;
            app.renderer.view.style.position = "absolute";
            app.renderer.view.style.display = "block";
            app.renderer.autoResize = true;
            app.renderer.resize(width,height);
            //将该实例append到页面中用于展示
            var dom:HTMLElement|null = document.getElementById('index');
            if(dom){
              dom.appendChild(app.view);
            }

            // //全局定义常用的pixi常量和方法
            let  Loader = app.loader,
                Resources = Loader.resources;

                // 树
                var task1:task = {
                  sprite:'',
                  run(list:tasklist){
                      var vm = this;
                      Loader.add("tree","/images/tree.png").load(function(){
                        list.run();
                        for (var i = 0; i < 6; i++) {
                            vm.sprite = new PIXI.Sprite(
                                Resources.tree.texture
                            );
                            vm.sprite.x = (i%8)*128;
                            vm.sprite.y = ~~(i/8 + 2)*64;
                            vm.sprite.scale.x = 0.1;
                            vm.sprite.scale.y = 0.1;
                            vm.sprite.buttonMode = true;
                            vm.sprite.interactive = true;
                            vm.sprite.on('pointerdown', function(){
                                console.log(vm.sprite.texture.textureCacheIds[0])
                            });
                            app.stage.addChild(vm.sprite);
                        }
                    });
                  }
                }
                // 水
                var task2:task = {
                  sprite:'',
                  run(list:tasklist){
                    var vm = this;
                    Loader.add("water","/images/water.png").load(function(){
                        list.run();
                        for (var i = 0; i < 16; i++) {
                            //利用orange图片贴图生成精灵
                            vm.sprite = new PIXI.Sprite(
                                Resources.water.texture
                            );
                            vm.sprite.x = (i%8+22)*32;
                            vm.sprite.y = ~~(i/8 + 6)*64;
                            vm.sprite.buttonMode = true;
                            vm.sprite.interactive = true;
                            vm.sprite.on('pointerdown', function(){
                                console.log(vm.sprite.texture.textureCacheIds[0])                              
                            });
                            app.stage.addChild(vm.sprite);
                        }
                    });
                  }
                }
                // 地面
                var task3:task = {
                  sprite:'',
                  run(list:tasklist){
                    var vm = this;
                    Loader.add("ground","/images/ground.png").load(function(){
                        list.run();                        
                        for (var i = 0; i < 136; i++) {
                            //利用orange图片贴图生成精灵
                            vm.sprite = new PIXI.Sprite(
                                Resources.ground.texture
                            );
                            vm.sprite.x = (i%8)*128;
                            vm.sprite.y = ~~(i/8)*32;
                            // sprite.buttonMode = true;
                            vm.sprite.interactive = true;
                            vm.sprite.on('pointerdown', function(){
                                console.log(vm.sprite.texture.textureCacheIds[0])
                            });
                            app.stage.addChild(vm.sprite);
                        }
                    });
                  }
                }
                // 人
                var task4:task = {
                  sprite:'',
                  run(list:tasklist){
                    var vm = this;
                    Loader.add("person","/images/person.png").load(function(){
                        list.run();        
                        function createface(line:number,base:any):PIXI.Texture[]{
                            //第1个纹理
                            let texture0 = new PIXI.Texture(base);
                            texture0.frame = new PIXI.Rectangle(0, line * 450/4, 300/4, 450/4);
                            //第2个纹理
                            let texture1 = new PIXI.Texture(base);
                            texture1.frame = new PIXI.Rectangle(75, line * 450/4, 300/4, 450/4);
                            //第3个纹理
                            let texture2 = new PIXI.Texture(base);
                            texture2.frame = new PIXI.Rectangle(150, line * 450/4, 300/4, 450/4);
                            //第4个纹理
                            let texture3 = new PIXI.Texture(base);
                            texture3.frame = new PIXI.Rectangle(225, line * 450/4, 300/4, 450/4);

                            let textures = [texture0, texture1, texture2,texture3];
                            return textures;
                        };
                        var textop:PIXI.Texture[],
                            texbottom:PIXI.Texture[],
                            texleft:PIXI.Texture[],
                            texright:PIXI.Texture[];
                        let base:PIXI.Texture = Resources.person.texture;
                        textop = createface(3,base);
                        texbottom = createface(0,base);
                        texleft = createface(1,base);
                        texright = createface(2,base);

                        //创建动画精灵
                        vm.sprite = new PIXI.AnimatedSprite(texright); 
                        //设置动画精灵的速度
                        vm.sprite.animationSpeed = 0.1;
                        vm.sprite.x = 100;
                        vm.sprite.y = 10;
                        vm.sprite.buttonMode = true;
                        vm.sprite.interactive = true;
                        vm.sprite.vx = 0;
                        vm.sprite.vy = 0;
                        vm.sprite.scale.x = 0.4;
                        vm.sprite.scale.y = 0.4;
                        vm.sprite.on('pointerdown', function(){
                                var pos = vm.sprite.position;
                                win.panel.left = pos.x + 50;
                                win.panel.top = pos.y + 100;
                                win.panel.show = !win.panel.show;
                                console.log(vm.sprite.position);
                                console.log(vm.sprite.textures[0].baseTexture.textureCacheIds[0])
                        });

                        //把动画精灵添加到舞台
                        app.stage.addChild(vm.sprite);
                        //播放动画精灵
                        app.ticker.add(gameLoop);

                        var state = {
                            isrun:false
                        }
                        function gameLoop(){
                            vm.sprite.x += vm.sprite.vx;
                            vm.sprite.y += vm.sprite.vy;
                            vm.sprite.x = vm.sprite.x < 0?0:vm.sprite.x;
                            vm.sprite.y = vm.sprite.y < 0?0:vm.sprite.y;
                            if(state.isrun){
                                console.log(vm.sprite.x)
                            }
                        }

                        var left = new keyboard(37);
                        left.setPress(() => {
                            vm.sprite.textures = texleft;
                            vm.sprite.vx = -1;
                            vm.sprite.play();
                            state.isrun = true;
                        });
                        left.setRelease(() => {
                            vm.sprite.gotoAndStop(2)
                            vm.sprite.vx = 0;
                            state.isrun = false;
                        })

                        var right = new keyboard(39);
                        right.setPress(() => {
                            vm.sprite.textures = texright;
                            vm.sprite.vx = 1;
                            vm.sprite.play();
                            state.isrun = true;
                        });
                        right.setRelease(() => {
                            vm.sprite.gotoAndStop(2)
                            vm.sprite.vx = 0;
                            state.isrun = false;
                        })

                        var up = new keyboard(38);
                        up.setPress(() => {
                            vm.sprite.textures = textop;
                            vm.sprite.vy = -1;
                            vm.sprite.play();
                            state.isrun = true;
                        });
                        up.setRelease(() => {
                            vm.sprite.gotoAndStop(2)
                            vm.sprite.vy = 0;
                            state.isrun = false;
                        })

                        var down = new keyboard(40);
                        down.setPress(() => {
                            vm.sprite.textures = texbottom;
                            vm.sprite.vy = 1;
                            vm.sprite.play();
                            state.isrun = true;
                        });
                        down.setRelease(() => {
                            vm.sprite.gotoAndStop(2)
                            vm.sprite.vy = 0;
                            state.isrun = false;
                        })
                    });
                  }
                }
                // 小松鼠
                var task5:task = {
                  sprite:'',
                  run(list:tasklist){
                    var vm = this;
                    Loader.add("bear","/images/bear.png").load(run);
                      function createface(line:number,base:any){
                          //第1个纹理
                          let texture0 = new PIXI.Texture(base);
                          texture0.frame = new PIXI.Rectangle(0, line * 256/4, 192/3, 256/4);
                          //第2个纹理
                          let texture1 = new PIXI.Texture(base);
                          texture1.frame = new PIXI.Rectangle(64, line * 256/4, 192/3, 256/4);
                          //第3个纹理
                          let texture2 = new PIXI.Texture(base);
                          texture2.frame = new PIXI.Rectangle(128, line * 256/4, 192/3, 256/4);

                          let textures = [texture0, texture1, texture2];
                          return textures;
                      }
                      var textop:PIXI.Texture[],
                        texbottom:PIXI.Texture[],
                        texleft:PIXI.Texture[],
                        texright:PIXI.Texture[];
                      function run() {  
                          list.run();
                          //获取纹理
                          let base = Resources.bear.texture;
                          textop = createface(0,base);
                          texbottom = createface(2,base);
                          texleft = createface(3,base);
                          texright = createface(1,base);

                          //创建动画精灵
                          vm.sprite = new PIXI.AnimatedSprite(texright); 
                          //设置动画精灵的速度
                          vm.sprite.animationSpeed = 0.1;
                          vm.sprite.x = 100;
                          vm.sprite.y = 100;
                          vm.sprite.buttonMode = true;
                          vm.sprite.interactive = true;
                          vm.sprite.vx = 0.1;
                          vm.sprite.vy = 0;
                          vm.sprite.run = true;
                          vm.sprite.scale.x = 0.4;
                          vm.sprite.scale.y = 0.4;
                          vm.sprite.on('pointerdown', function(){
                              console.log(vm.sprite.textures[0].baseTexture.textureCacheIds[0])
                          });

                          //把动画精灵添加到舞台
                          app.stage.addChild(vm.sprite);
                          vm.sprite.play();
                          //播放动画精灵
                          app.ticker.add(gameLoop);
                      }
                      function turnwhere(where:number){
                          vm.sprite.gotoAndStop(2);
                          vm.sprite.vx = 0;
                                  vm.sprite.vy = 0;
                          switch (where){
                              case 1:
                                  vm.sprite.textures = textop;
                                  vm.sprite.vx = 0;
                                  if(vm.sprite.run){
                                    vm.sprite.vy = -0.1;
                                  }
                                  vm.sprite.play();
                                  break;
                              case 2:
                                  vm.sprite.textures = texbottom;
                                  vm.sprite.vx = 0;
                                  if(vm.sprite.run){
                                    vm.sprite.vy = 0.2;
                                  }
                                  vm.sprite.play();
                                  break;

                              case 3:
                                  vm.sprite.textures = texleft;
                                  if(vm.sprite.run){
                                  vm.sprite.vx = -0.2;

                                  }
                                  vm.sprite.vy = 0;
                                  vm.sprite.play();
                                  break;

                              case 4:
                                  vm.sprite.textures = texright;
                                  if(vm.sprite.run){
                                    vm.sprite.vx = 0.1;

                                  }
                                  vm.sprite.vy = 0;
                                  vm.sprite.play();
                                  break;
                          }
                          
                      }
                    var state = {
                        isrun:false
                    }                     
                    setInterval(()=>{
                        var int = randomNum(1,4);
                        console.log(int)
                        turnwhere(int);                        
                    },3000)
                    function gameLoop():void{
                        vm.sprite.x += vm.sprite.vx;
                        vm.sprite.y += vm.sprite.vy;
                        vm.sprite.x = vm.sprite.x < 0?0:vm.sprite.x;
                        vm.sprite.y = vm.sprite.y < 0?0:vm.sprite.y;

                        if(state.isrun){
                            console.log(vm.sprite.x)
                        }
                    }                      
                    
                  }
                }

                // 渔网
                var task6:task = {
                  sprite:'',
                  run(list:tasklist,flag:boolean){
                      var vm = this;
                      Loader.add("net","/images/net9.png").load(function(){
                        if(flag){
                          list.run();
                        }
                        for (var i = 0; i < 1; i++) {
                            vm.sprite = new PIXI.Sprite(
                                Resources.net.texture
                            );
                            vm.sprite.visible = false;
                            vm.sprite.x = 100;
                            vm.sprite.y = 100;
                            vm.sprite.scale.x = 0.07;
                            vm.sprite.scale.y = 0.07;
                            vm.sprite.buttonMode = true;
                            vm.sprite.interactive = true;
                            vm.sprite.on('pointerdown', function(){
                                console.log(vm.sprite.texture.textureCacheIds[0])
                                console.log(task6)
                            });
                            app.stage.addChild(vm.sprite);
                        }
                    });
                  }
                }

                var list:tasklist = {
                  data:[task3,task5,task1,task2,task4,task6],
                  run(){
                    console.log('run')
                    var curtask=this.data.shift();
                    if(curtask){
                      curtask.run(list,true);
                    }
                  }
                }
                list.run();
                // setTimeout(()=>{
                //   task6.run(list,false)
                // },4000)


                var p = new keyboard(80);
                p.setPress(() => {
                  if(task5.sprite.run){
                    var pos = task4.sprite.position;
                    var xrange = randomNum(~~(pos.x - 50),~~(pos.x + 82));
                    var yrange = randomNum(~~(pos.y - 50),~~(pos.y + 82));
                    xrange = xrange<0?0:xrange;
                    yrange = yrange<0?0:yrange;
                    task6.sprite.x = ~~xrange;
                    task6.sprite.y = ~~yrange;
                    task6.sprite.visible = !task6.sprite.visible;
                    //task6.sprite.visible = true
                    if(task6.sprite.visible){
                      var task6pos = task6.sprite.position;
                      var task5pos = task5.sprite.position;
                      var task6center = [task6pos.x+10,task6pos.y+10];
                      var task5center = [task5pos.x+5,task5pos.y+10];
                      var distance = Math.sqrt(Math.pow(Math.abs(task6center[0]-task5center[0]),2)+Math.pow(Math.abs(task6center[1]-task5center[1]),2));
                      console.log(distance)
                      if(distance < 10){
                        task5.sprite.run = false;
                        alert('抓到啦~~')
                      }else if(distance < 15){
                        alert('还差一点~~')
                      }else if(distance < 20){
                        alert('加油~~')
                      }
                    }
                  }
                });
                p.setRelease(() => {
                  //task6.sprite.visible = false;
                })




                function randomNum(minNum:any, maxNum:any):number {
                        switch (arguments.length) {
                            case 1:
                              return parseInt(Math.random() * minNum + 1+'', 10);
                              break;
                            case 2:
                              return parseInt(Math.random() * ( maxNum - minNum + 1 ) + minNum +'', 10);
                              break;
                            default:
                              return 0;
                              break;
                        }
                    } 

            
      }

}
</script>


<style lang="less">
#index{
    position:relative;
    width:960px;
    height:540px;
    box-shadow: 2px 2px 5px 2px rgb(73, 63, 128);
    .menu{
        background: rgba(95, 93, 93, 0.795);
        width:100%;
        height:20px;
        text-align:left;
        >span{
            display:inline-block;
            height:20px;
            line-height: 20px;
            vertical-align: top;
        }
        .key{
            color:rgb(0, 217, 255);
            margin-left:20px;
            font-size:12px;

        }
        .value{
            color:white;
            font-size:12px;
        }
    }
    .person{
      width:200px;
      height:300px;
      border:1px solid rgb(46, 109, 151);
      border-radius:4px;
      position:absolute;
      z-index:99;
    }
    .skill{
      width:600px;
      height:40px;
      position:absolute;
      left:0;
      right:0;
      margin:0 auto;
      bottom:0;
      border:1px solid rgba(46, 109, 151,0);
      border-radius:4px;
      z-index:100;
      .keyboard{
        display:inline-block;
        width:40px;
        height:40px;
        border:1px solid rgb(151, 46, 119);
        border-radius:4px;
        position:relative;
        margin:0 1px;
        background:#b88b60;
        >img{
          width:40px;
        }
        >.key{
          position:absolute;
          text-align:right;
          width:15px;
          height:15px;
          right:0;
          bottom:0px;
          font-size:12px;
          font-weight:900;
        }
      }
    }
}
</style>

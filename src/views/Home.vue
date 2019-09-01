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
                  run(list:tasklist){
                      Loader.add("tree","/images/tree.png").load(function(){
                        list.run();
                        for (var i = 0; i < 6; i++) {
                            let sprite = new PIXI.Sprite(
                                Resources.tree.texture
                            );
                            sprite.x = (i%8)*128;
                            sprite.y = ~~(i/8 + 2)*64;
                            sprite.scale.x = 0.1;
                            sprite.scale.y = 0.1;
                            sprite.buttonMode = true;
                            sprite.interactive = true;
                            sprite.on('pointerdown', function(){
                                console.log(sprite.texture.textureCacheIds[0])
                            });
                            app.stage.addChild(sprite);
                        }
                    });
                  }
                }
                // 水
                var task2:task = {
                  run(list:tasklist){
                    Loader.add("water","/images/water.png").load(function(){
                        list.run();
                        for (var i = 0; i < 16; i++) {
                            //利用orange图片贴图生成精灵
                            let sprite = new PIXI.Sprite(
                                Resources.water.texture
                            );
                            sprite.x = (i%8+22)*32;
                            sprite.y = ~~(i/8 + 6)*64;
                            sprite.buttonMode = true;
                            sprite.interactive = true;
                            sprite.on('pointerdown', function(){
                                console.log(sprite.texture.textureCacheIds[0])                              
                            });
                            app.stage.addChild(sprite);
                        }
                    });
                  }
                }
                // 地面
                var task3:task = {
                  run(list:tasklist){
                    Loader.add("ground","/images/ground.png").load(function(){
                        list.run();                        
                        for (var i = 0; i < 136; i++) {
                            //利用orange图片贴图生成精灵
                            let sprite = new PIXI.Sprite(
                                Resources.ground.texture
                            );
                            sprite.x = (i%8)*128;
                            sprite.y = ~~(i/8)*32;
                            // sprite.buttonMode = true;
                            sprite.interactive = true;
                            sprite.on('pointerdown', function(){
                                console.log(sprite.texture.textureCacheIds[0])
                            });
                            app.stage.addChild(sprite);
                        }
                    });
                  }
                }
                // 人
                var task4:task = {
                  run(list:tasklist){
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
                        var person = new PIXI.AnimatedSprite(texright); 
                        //设置动画精灵的速度
                        person.animationSpeed = 0.1;
                        person.x = 100;
                        person.y = 10;
                        person.buttonMode = true;
                        person.interactive = true;
                        person.vx = 0;
                        person.vy = 0;
                        person.scale.x = 0.4;
                        person.scale.y = 0.4;
                        person.on('pointerdown', function(){
                                console.log(person.textures[0].baseTexture.textureCacheIds[0])
                        });

                        //把动画精灵添加到舞台
                        app.stage.addChild(person);
                        //播放动画精灵
                        app.ticker.add(gameLoop);

                        var state = {
                            isrun:false
                        }
                        function gameLoop(){
                            person.x += person.vx;
                            person.y += person.vy;
                            person.x = person.x < 0?0:person.x;
                            person.y = person.y < 0?0:person.y;
                            if(state.isrun){
                                console.log(person.x)
                            }
                        }

                        var left = new keyboard(37);
                        left.setPress(() => {
                            person.textures = texleft;
                            person.vx = -1;
                            person.play();
                            state.isrun = true;
                        });
                        left.setRelease(() => {
                            person.gotoAndStop(2)
                            person.vx = 0;
                            state.isrun = false;
                        })

                        var right = new keyboard(39);
                        right.setPress(() => {
                            person.textures = texright;
                            person.vx = 1;
                            person.play();
                            state.isrun = true;
                        });
                        right.setRelease(() => {
                            person.gotoAndStop(2)
                            person.vx = 0;
                            state.isrun = false;
                        })

                        var up = new keyboard(38);
                        up.setPress(() => {
                            person.textures = textop;
                            person.vy = -1;
                            person.play();
                            state.isrun = true;
                        });
                        up.setRelease(() => {
                            person.gotoAndStop(2)
                            person.vy = 0;
                            state.isrun = false;
                        })

                        var down = new keyboard(40);
                        down.setPress(() => {
                            person.textures = texbottom;
                            person.vy = 1;
                            person.play();
                            state.isrun = true;
                        });
                        down.setRelease(() => {
                            person.gotoAndStop(2)
                            person.vy = 0;
                            state.isrun = false;
                        })

                    
                        
                    });
                  }
                }
                // 小松鼠
                var task5:task = {
                  run(list:tasklist){
                    Loader.add("animal","/images/bear.png").load(run);
                      var bear:PIXI.AnimatedSprite;
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
                          let base = Resources.animal.texture;
                          textop = createface(0,base);
                          texbottom = createface(2,base);
                          texleft = createface(3,base);
                          texright = createface(1,base);

                          //创建动画精灵
                          bear = new PIXI.AnimatedSprite(texbottom); 
                          //设置动画精灵的速度
                          bear.animationSpeed = 0.1;
                          bear.x = 100;
                          bear.y = 100;
                          bear.buttonMode = true;
                          bear.interactive = true;
                          bear.vx = 0;
                          bear.vy = 0;
                          bear.scale.x = 0.4;
                          bear.scale.y = 0.4;
                          bear.on('pointerdown', function(){
                              console.log(bear.textures[0].baseTexture.textureCacheIds[0])
                          });

                          //把动画精灵添加到舞台
                          app.stage.addChild(bear);
                          //播放动画精灵
                          app.ticker.add(gameLoop);
                      }
                      function turnwhere(where:number){
                          bear.gotoAndStop(2);
                          bear.vx = 0;
                                  bear.vy = 0;
                          switch (where){
                              case 1:
                                  bear.textures = textop;
                                  bear.vx = 0;
                                  bear.vy = -0.1;
                                  bear.play();
                                  break;
                              case 2:
                                  bear.textures = texbottom;
                                  bear.vx = 0;
                                  bear.vy = 0.2;
                                  bear.play();
                                  break;

                              case 3:
                                  bear.textures = texleft;
                                  bear.vx = -0.2;
                                  bear.vy = 0;
                                  bear.play();
                                  break;

                              case 4:
                                  bear.textures = texright;
                                  bear.vx = 0.1;
                                  bear.vy = 0;
                                  bear.play();
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
                        bear.x += bear.vx;
                        bear.y += bear.vy;
                        bear.x = bear.x < 0?0:bear.x;
                        bear.y = bear.y < 0?0:bear.y;

                        if(state.isrun){
                            console.log(bear.x)
                        }
                    }                      
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

                var list:tasklist = {
                  data:[task3,task1,task2,task5,task4],
                  run(){
                    var curtask=this.data.shift();
                    if(curtask){
                      curtask.run(list);
                    }
                  }
                }
                list.run();
            
      }

}
</script>


<style lang="less">
#index{
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
}
</style>

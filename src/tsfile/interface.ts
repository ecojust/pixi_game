interface task {
    run(list:tasklist): void
}

interface tasklist{
    data:Array<task>;
    run():void;
}

class keyboard {
    private key:any;
    constructor(keyCode:number){
        this.key = {
            code : keyCode,
            isDown : false,
            isUp : true,
            downHandler:(event:any)=>{
              if (event.keyCode === this.key.code) {
                if (this.key.isUp && this.key.press){
                    this.key.press();
                    this.key.isDown = true;
                    this.key.isUp = false;
                }
              }
              event.preventDefault();
            },
            upHandler :(event:any) => {
              if (event.keyCode === this.key.code) {
                if (this.key.isDown && this.key.release){
                    this.key.release();
                    this.key.isDown = false;
                    this.key.isUp = true;
                }
              }
              event.preventDefault();
            }
        };
        var vm = this;
        //Attach event listeners
        window.addEventListener(
            "keydown", vm.key.downHandler.bind(vm.key), false
        );
        window.addEventListener(
            "keyup", vm.key.upHandler.bind(vm.key), false
        );
    }
    setPress(foo:Function){
        this.key.press = foo;
    }
    setRelease(foo:Function){
        this.key.release = foo;
    }
    
    //return key;
}


export {task,tasklist,keyboard}
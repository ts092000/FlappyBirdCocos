import { _decorator, Component, Node, Prefab, instantiate, Vec3, Canvas, Sprite, EventKeyboard, KeyCode, input, Input, tween} from 'cc';
const { ccclass, property } = _decorator;
import { Game, GameStatus } from './Game' 

@ccclass('Pipe')
export class Pipe extends Component {
    @property({type:Prefab})
        pipePrefab: Prefab = null

    pipe: Node[] = [null];

    static positionPipeX: number;
    static positionPipeY: number;
    static PipeX: number;
    static PipeY: number;

    start() {
        // if (this.Game.gameStatus !== GameStatus.Game_Playing) {
        //     return;
        // }
        // this.Game.createPipe();

        // create pipes
        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i] = instantiate(this.pipePrefab);
            this.node.addChild(this.pipe[i]);

            let pipeX = this.pipe[i].position.x;
            let pipeY = this.pipe[i].position.y;
            pipeX = 170 + 200 * i;
            let minY = -120;
            let maxY = 120;
            pipeY = minY + Math.random() * (maxY - minY);
            Pipe.positionPipeX  = this.pipe[i].position.x;
            Pipe.positionPipeY  = this.pipe[i].position.y;
            return Pipe.positionPipeX, Pipe.positionPipeY;
        }
    }

    update(deltaTime: number) {
        
        for (let i = 0; i < this.pipe.length; i++) {
            let pipeX = this.pipe[i].position.x;
            let pipeY = this.pipe[i].position.y;
            Pipe.PipeX = pipeX;
            Pipe.PipeY = pipeY;
            Pipe.PipeX -= 1.0;
            if (Pipe.PipeX <= -170) {
                Pipe.PipeX = 220;
                
                let minY = -120;
                let maxY = 120;
                Pipe.PipeY = minY + Math.random() * (maxY - minY);
            }
            Pipe.positionPipeX  = this.pipe[i].position.x;
            Pipe.positionPipeY  = this.pipe[i].position.y;
            
            input.on(Input.EventType.KEY_DOWN, this.dashSkillKeyDown, this);
            input.on(Input.EventType.KEY_UP, this.dashSkillKeyUp, this);
            // if (input.on(Input.EventType.KEY_UP, this.dashSkillKeyUp, this)) {
            //     Pipe.PipeX -= 1.0;
            // }

            this.pipe[i].position = new Vec3(Pipe.PipeX, Pipe.PipeY, 0);
            // console.log('pipePos: ', this.pipe[i].position);
            return Pipe.positionPipeX, Pipe.positionPipeY, Pipe.PipeX, Pipe.PipeY;
        }
        // input.on(Input.EventType.KEY_UP, this.dashSkillKeyUp, this);
    }

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.dashSkillKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.dashSkillKeyUp, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.dashSkillKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.dashSkillKeyUp, this);
    }
    
    dashSkillKeyDown(event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_D:
                Pipe.PipeX -= 150.0;
                let movePipe = tween(this.pipe[0]).to(1.0 ,{position: new Vec3(Pipe.PipeX - 150.0, Pipe.PipeY, 0)});
                movePipe.start();
                // if (Pipe.PipeX <= -170) {
                //     Pipe.PipeX = 220;
                    
                //     let minY = -120;
                //     let maxY = 120;
                //     Pipe.PipeY = minY + Math.random() * (maxY - minY);
                // }
                // Pipe.positionPipeX  = this.pipe[0].position.x;
                // Pipe.positionPipeY  = this.pipe[0].position.y;
                // this.pipe[0].position = new Vec3(Pipe.PipeX, Pipe.PipeY, 0);
                // this.pipe[0].position = new Vec3(Pipe.PipeX, Pipe.PipeY, 0);
            break;
        }
    }

    dashSkillKeyUp(event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_D:
                Pipe.PipeX -= 1.0;
                console.log('release');
                console.log('releaseX', Pipe.PipeX);
                // this.pipe[0].position = new Vec3(Pipe.PipeX, Pipe.PipeY, 0);
            break;
        }
    }
}
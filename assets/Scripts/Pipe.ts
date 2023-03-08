import { _decorator, Component, Node, Prefab, instantiate, Vec3, Canvas, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import { Game, GameStatus } from './Game' 

@ccclass('Pipe')
export class Pipe extends Component {
    @property({type:Prefab})
        pipePrefab: Prefab = null

    @property({type:Game})
        Game: Game 

    pipe: Node[] = [null];

    static positionPipeX: number;
    static positionPipeY: number;

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
            pipeX -= 1.0;
            if (pipeX <= -170) {
                pipeX = 220;
                
                let minY = -120;
                let maxY = 120;
                pipeY = minY + Math.random() * (maxY - minY);
            }
            Pipe.positionPipeX  = this.pipe[i].position.x;
            Pipe.positionPipeY  = this.pipe[i].position.y;
            this.pipe[i].position = new Vec3(pipeX, pipeY, 0);
            return Pipe.positionPipeX, Pipe.positionPipeY;
        }
    }
}
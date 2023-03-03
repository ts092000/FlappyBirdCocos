import { _decorator, Component, Node, Prefab, instantiate, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends Component {
    @property({type:Prefab})
        pipePrefab: Prefab = null

    pipe: Node[] = [null];
    static positionPipeX: number;
    static positionPipeY: number;

    start() {
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
        }
    }

    update(deltaTime: number) {
        // move pipes
        for (let i = 0; i < this.pipe.length; i++) {
            let pipeX = this.pipe[i].position.x;
            let pipeY = this.pipe[i].position.y;
            pipeX -= 1.0;
            if (pipeX <= -170) {
                pipeX = 230;
                
                let minY = -120;
                let maxY = 120;
                pipeY = minY + Math.random() * (maxY - minY);
            }
            this.pipe[i].position = new Vec3(pipeX, pipeY, 0);
            Pipe.positionPipeX  = this.pipe[i].position.x;
            Pipe.positionPipeY  = this.pipe[i].position.y;
            // console.log('Pipe position', Pipe.positionPipe);
            return Pipe.positionPipeX, Pipe.positionPipeY;
        }
    }
}



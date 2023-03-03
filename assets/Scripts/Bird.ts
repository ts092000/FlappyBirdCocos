import { _decorator, Component, Node, input, Input, EventTouch, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { Game, GameStatus } from './Game' 

@ccclass('Bird')
export class Bird extends Component {
    static positionBirdY: number;
    speed: number = 0;
    static angle: number;
    static speed: number;

    @property({type:Game})
        Game: Game
    
    start() {

    }

    onLoad() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onDestroy () {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    update(deltaTime: number) {
        // If game status is not playing, stop movement of bird, and return
        if (this.Game.gameStatus != GameStatus.Game_Playing) {
            return;
        }

        this.speed -= 0.05;
        let positionY = this.node.position.y;
        positionY += this.speed;

        let angle = (this.speed / 2) * 30;
        if (angle >= 30) {
            angle = 30;
        }

        this.node.angle = angle;
        this.node.position = new Vec3(0, positionY, 0);
        Bird.positionBirdY = this.node.position.y;
        // console.log('Bird position: ', Bird.positionBird);
        return Bird.positionBirdY, angle, Bird.speed;
    }

    onTouchStart (event: EventTouch) {
        this.speed = 2;
    }

}



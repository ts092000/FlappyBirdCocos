import { _decorator, Component, Node, input, Input, EventTouch, Vec3, AudioSource, Canvas } from 'cc';
const { ccclass, property } = _decorator;
import { Game, GameStatus } from './Game'
import { SoundType } from './Audio';

@ccclass('Bird')
export class Bird extends Component {
    static positionBirdY: number = 0;
    speed: number = 0;
    static angle: number = 0;

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
            Bird.positionBirdY = 0
            Bird.angle = 0
            this.speed = 0
            this.node.position = new Vec3(0, Bird.positionBirdY, 0);
            this.node.angle = Bird.angle;
            return;
        }

        this.speed -= 0.05;
        let positionY = this.node.position.y;
        positionY += this.speed;

        let angle = (this.speed / 2) * 30;
        if (angle >= 30) {
            angle = 30;
        }

        this.node.position = new Vec3(0, positionY, 0);
        this.node.angle = angle;
        Bird.positionBirdY = this.node.position.y;
        return Bird.positionBirdY, angle;
    }

    onTouchStart (event: EventTouch) {
        this.speed = 2;
        this.Game.Fly.play(SoundType.E_Sound_Fly);
    }
}
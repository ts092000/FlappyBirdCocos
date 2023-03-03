import { _decorator, Component, Node, Sprite, Vec3, Button, Label, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;
import { Bird } from './Bird'
import { Pipe } from './Pipe'

export enum GameStatus {
    Game_Ready = 0,
    Game_Playing,
    Game_Over
}

@ccclass('Game')
export class Game extends Component {
    @property({type:Sprite})
        Bg: Sprite [] = [null, null];

    // @property({type:Prefab})
    //     pipePrefab: Prefab = null

    // Pipe node
    pipe: Node[] = [null];

    // Game state
    gameStatus: GameStatus = GameStatus.Game_Ready

    // Score Label Node
    @property({type:Label})
        scoreLabel: Label = null

    @property({type:Sprite})
        GameOver: Sprite

    @property({type:Button})
        playBtn: Button = null

    @property({type:Button})
        restartBtn: Button = null

    @property({type:Sprite})
        ScoreResult: Sprite

    @property({type:Label})
        ScoreResultLabel: Label
    // Record score
    gameScore: number = 0;
    gameScoreResult: number = 0;

    

    start() {
        
    }

    onLoad() {
        this.GameOver.node.active = false;
        this.restartBtn.node.active = false;
        this.ScoreResult.node.active = false;
        this.ScoreResultLabel.node.active = false;
        // this.restartBtn.node.active = false;
        this.playBtn.node.on(Node.EventType.TOUCH_END, this.touchPlayBtn, this);
    }
    
    update(deltaTime: number) {
        if (this.gameStatus !== GameStatus.Game_Playing) {
            return;
        }
        
        for (let i = 0; i < this.Bg.length; i++) {
            let positionX = this.Bg[i].node.position.x;
            positionX = positionX - 1;
            if (positionX <= -288) {
                positionX = 288;
            }
            this.Bg[i].node.position = new Vec3(positionX, this.Bg[i].node.position.y, 0);
        }
        this.checkCollision();
    }

    checkCollision() {
        // console.log('birdx:', Bird.positionBird.x);
        console.log('birdY:', Bird.positionBirdY);
        console.log('pipex', Pipe.positionPipeX);
        console.log('pipeY', Pipe.positionPipeY);

        let delta = 60;
        let birdY = Bird.positionBirdY;
        let pipeX = Pipe.positionPipeX;
        let pipeY = Pipe.positionPipeY;
        // console.log('pipeY', Pipe.positionPipe.y);
        if (((pipeX > -26 && pipeX < 26) && ((birdY > pipeY + delta) || (birdY < pipeY - delta)))) 
        {
            console.log('hit');
            this.gameOver()
            Bird.speed = 0;
        }
        else if (birdY > 288 && birdY < -288) 
        {
            console.log('hit');
            this.gameOver();
            Bird.speed = 0;

        }
        else if (pipeX == 30) {
            console.log('no hit');
            this.gameScore++;
            this.scoreLabel.string = this.gameScore.toString();
        }
    }

    touchPlayBtn() {
        // Hide start button
        this.playBtn.node.active = false;
        // Set game status to playing
        this.gameStatus = GameStatus.Game_Playing;

        // Hide GameOver node
        this.GameOver.node.active = false;
        this.ScoreResult.node.active = false;
        this.ScoreResultLabel.node.active = false;
    }

    touchRestarButton() {
        this.restartBtn.node.active = false;

        this.gameStatus = GameStatus.Game_Playing;

        this.GameOver.node.active = false;
        this.scoreLabel.node.active = true;
        this.ScoreResult.node.active = false;
        this.ScoreResultLabel.node.active = false;
        // // Reset position of all pipes
        // for (let i = 0; i < this.pipe.length; i++) {
            //     let pipeX = this.pipe[i].position.x;
            //     let pipeY = this.pipe[i].position.y;
            //     pipeX = 170 + 200 * i;
            //     let minY = -120;
            //     let maxY = 120;
            //     pipeY = minY + Math.random() * (maxY - minY);
        // }

        // Reset angle and position of bird
        let birdY = Bird.positionBirdY
        let BirdAngle = Bird.angle;
        birdY = 0;
        BirdAngle = 0;

        // Reset score when restart game
        this.gameScore = 0;
        this.scoreLabel.string = this.gameScore.toString();
    }

    gameOver() {
        this.GameOver.node.active = true;
        // When the game is over, show the play button
        // this.playBtn.node.active = true;       
        this.restartBtn.node.active = true;
        this.scoreLabel.node.active = false;
        this.ScoreResult.node.active = true;
        this.ScoreResultLabel.node.active = true;
        // Change the game status to game over
        this.gameStatus = GameStatus.Game_Over
        this.ScoreResultLabel.string = this.gameScore.toString();
        this.restartBtn.node.on(Node.EventType.TOUCH_END, this.touchRestarButton, this);
    }
    
}



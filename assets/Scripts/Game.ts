import { _decorator, Component, Node, Sprite, Vec3, Button, Label, instantiate, AudioSource, sys, director, Scene, Slider } from 'cc';
import { SoundType } from './Audio';
const { ccclass, property } = _decorator;
import { Bird } from './Bird'
import { Pipe } from './Pipe'
import { Audio } from './Audio';
import { Enemy } from './Enemy';

export enum GameStatus {
    Game_Ready = 0,
    Game_Playing,
    Game_Over
}

@ccclass('Game')
export class Game extends Component {
    @property({type:Sprite})
        Bg: Sprite [] = [null, null];

    // // Pipe node
    pipe: Node[] = [null];

    @property({type: Pipe})
        Pipe: Pipe

    @property({type:Enemy})
        Enemy: Enemy;

    // Game state
    gameStatus: GameStatus = GameStatus.Game_Ready

    // Score Label Node
    @property({type:Label})
        scoreLabel: Label = null

    @property({type:Sprite})
        GameOver: Sprite

    @property({type:Sprite})
        BirdYellow: Sprite

    @property({type:Sprite})
        BirdGreen: Sprite

    @property({type:Sprite})
        BirdRed: Sprite

    @property({type:Button})
        playBtn: Button = null

    @property({type:Button})
        restartBtn: Button = null

    @property({type:Sprite})
        ScoreResult: Sprite

    @property({type:Label})
        ScoreResultLabel: Label

    @property({type:Label})
        HighScoreLabel: Label

    @property({type:AudioSource})
        Fly: Audio

    @property({type:AudioSource})
        Score: Audio
    
    @property({type:AudioSource})
        Hit: Audio

    @property({type:AudioSource})
        Die: Audio

    @property({type:Button})
        SettingBtn: Button

    @property({type:Sprite})
        MenuPopup: Sprite

    @property({type:Button})
        CloseMenuPopup: Button

    @property({type:Button})
        ResumeBtn: Button

    @property({type:Button})
        YellowBird: Button

    @property({type:Button})
        GreenBird: Button

    @property({type:Button})
        RedBird: Button
        
    // Record score
    gameScore: number = 0;
    gameScoreResult: number = 0;
    gameHighScore: number = 0;
    gameHighScoreArray: number[] = [];

    

    start() {
        this.MenuPopup.node.active = false;
        let gameHighScore1 = localStorage.getItem('gameHighScoreArray');
        if (gameHighScore1) {
            this.gameHighScoreArray = JSON.parse(gameHighScore1);
        }
        console.log(gameHighScore1);
    }
    
    onLoad() {
        this.BirdYellow.node.active = true;
        this.BirdGreen.node.active = false;
        this.BirdRed.node.active = false;
        this.GameOver.node.active = false;
        this.restartBtn.node.active = false;
        this.ScoreResult.node.active = false;
        this.ScoreResultLabel.node.active = false;
        this.Pipe[0].node.active = false;
        this.Enemy.node.active = false;
        this.HighScoreLabel.node.active = false;
        console.log('1', this.Pipe[0].node.active);
        // this.restartBtn.node.active = false;
        this.playBtn.node.on(Node.EventType.TOUCH_END, this.touchPlayBtn, this);
        this.SettingBtn.node.on(Node.EventType.TOUCH_END, this.touchSettingBtn, this);
        this.CloseMenuPopup.node.on(Node.EventType.TOUCH_END, this.touchCloseSettingBtn, this);
        this.ResumeBtn.node.on(Node.EventType.TOUCH_END, this.touchResumeBtn, this);
        this.YellowBird.node.on(Node.EventType.TOUCH_END, this.touchYellowBird, this);
        this.GreenBird.node.on(Node.EventType.TOUCH_END, this.touchGreenBird, this);
        this.RedBird.node.on(Node.EventType.TOUCH_START, this.touchRedBird, this);
        console.log(this.GreenBird.node.active);
        console.log(this.YellowBird.node.active);
        console.log(this.RedBird.node.active);
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
    
    createPipe() {
        // create pipes
        for (let i = 0; i < this.pipe.length; i++) {
            this.Pipe[i].node = instantiate(this.Pipe[i].node);
            this.node.addChild(this.Pipe[i].node);
            
            let pipeX = this.Pipe[i].node.position.x;
            let pipeY = this.Pipe[i].node.position.y;
            pipeX = 170 + 200 * i;
            let minY = -120;
            let maxY = 120;
            pipeY = minY + Math.random() * (maxY - minY);
            Pipe.positionPipeX  = this.Pipe[i].node.position.x;
            Pipe.positionPipeY  = this.Pipe[i].node.position.y;
        }
    }
    
    checkCollision() {
        let delta1 = 65;
        let angle = Bird.angle;
        let birdY = Bird.positionBirdY;
        let pipeX = Pipe.positionPipeX;
        let pipeY = Pipe.positionPipeY;
        let enemyX = Enemy.positionEnemyX;
        let enemyY = Enemy.positionEnemyY;
        // console.log('pipeY', Pipe.positionPipe.y);
        if (((pipeX > -26 && pipeX < 26) && ((birdY  > pipeY + delta1) || (birdY < pipeY - delta1)))) 
        {
            // this.Pipe[0].node.position = new Vec3(420, 0, 0);
            this.Hit.play(SoundType.E_Sound_Hit);
            this.Die.play(SoundType.E_Sound_Die);
            this.gameHighScoreArray.push(this.gameScore);
            this.gameOver();
        }
        else if ((enemyX > -50 && enemyX < 50) && (birdY  <= enemyY + 20 && birdY >= enemyY - 20))
        {
            // this.Pipe[0].node.position = new Vec3(420, 0, 0);
            this.Hit.play(SoundType.E_Sound_Hit);
            this.Die.play(SoundType.E_Sound_Die);
            this.gameHighScoreArray.push(this.gameScore);
            this.gameOver();
        }
        else if (birdY > 260 || birdY < -260) 
        {
            // this.Pipe[0].node.position = new Vec3(420, 0, 0);
            this.Hit.play(SoundType.E_Sound_Hit);
            this.Die.play(SoundType.E_Sound_Die);
            this.gameHighScoreArray.push(this.gameScore);
            this.gameOver();
            
        }
        else if (pipeX == 5) {
            this.Score.play(SoundType.E_Sound_Score);  
            console.log(this.gameHighScoreArray);
            console.log(this.gameScore);
            this.gameScore++;
            this.scoreLabel.string = this.gameScore.toString();
            this.gameStatus == GameStatus.Game_Playing
            console.log(this.gameHighScore);
            console.log(this.Pipe[0].node.position);
            return this.gameScore;
        }
    }

    addPoint() {
        this.gameScore++;
        this.gameHighScore = this.gameScore;
        return this.gameHighScore;
    }

    touchPlayBtn() {
        this.GreenBird.node.active = false;
        this.YellowBird.node.active = false;
        this.RedBird.node.active = false;
        // Hide start button
        director.resume();
        this.playBtn.node.active = false;

        this.MenuPopup.node.active = false;

        // this.restartBtn.node.active = false;

        // Set game status to playing
        this.gameStatus = GameStatus.Game_Playing;

        this.Pipe[0].node.active = true;
        this.Enemy.node.active = true;

        // Hide GameOver node
        this.GameOver.node.active = false;
        this.ScoreResult.node.active = false;
        this.ScoreResultLabel.node.active = false;
        this.HighScoreLabel.node.active = false;
    }

    touchRestarButton() {
        director.loadScene("Game");
        director.reset();
        this.MenuPopup.node.active = false;
        
        // Hide start button
        this.restartBtn.node.active = false;

        // Set game status to playing
        this.gameStatus = GameStatus.Game_Playing;

        // this.Pipe[0].node.active = true;
        Bird.positionBirdY = 0
        Bird.angle = 0;
        this.Bg[0].node.position = new Vec3(0, 0, 0);
        this.Bg[1].node.position = new Vec3(288, 0, 0);
        // this.Pipe[0].node.position = new Vec3(420, Pipe.positionPipeY, 0);

        // Hide GameOver node
        this.GameOver.node.active = false;
        this.ScoreResult.node.active = false;
        this.ScoreResultLabel.node.active = false;
        this.scoreLabel.node.active = true;
        // this.Pipe[0].node.active = true;
        console.log('Pipe position', this.Pipe[0].node.position);
        

        // Reset score when restart game
        this.gameScore = 0;
        this.scoreLabel.string = this.gameScore.toString();
        
    }

    touchSettingBtn() {
        this.MenuPopup.node.active = true;
        director.pause();
        // console.log(this.MenuPopup.node.active);
        this.CloseMenuPopup.node.on(Node.EventType.TOUCH_START, this.touchCloseSettingBtn, this);
        this.ResumeBtn.node.on(Node.EventType.TOUCH_START, this.touchResumeBtn, this);
        // if (this.MenuPopup.node.active == true) {
        //     this.MenuPopup.node.active = false;
        //     this.SettingBtn.node.on(Node.EventType.TOUCH_END, this.touchCloseSettingBtn, this);
        // }
    }

    touchCloseSettingBtn() {
        this.MenuPopup.node.active = false;
        director.resume();
    }
    
    touchResumeBtn() {
        this.MenuPopup.node.active = false;
        director.resume();
    }

    touchYellowBird() {
        console.log('yellow', this.BirdYellow.node.active);
        console.log('green', this.BirdGreen.node.active);
        console.log('red', this.BirdRed.node.active);
        this.BirdYellow.node.active = true;
        this.BirdGreen.node.active = false;
        this.BirdRed.node.active = false;
    }

    touchGreenBird() {
        console.log('yellow', this.BirdYellow.node.active);
        console.log('green', this.BirdGreen.node.active);
        console.log('red', this.BirdRed.node.active);
        this.BirdGreen.node.active = true;
        this.BirdYellow.node.active = false;
        this.BirdRed.node.active = false;
    }

    touchRedBird() {
        console.log('yellow', this.BirdYellow.node.active);
        console.log('green', this.BirdGreen.node.active);
        console.log('red', this.BirdRed.node.active);
        this.BirdRed.node.active = true;
        this.BirdYellow.node.active = false;
        this.BirdGreen.node.active = false;
    }

    gameOver() {
        this.BirdYellow.node.active = false;
        this.BirdGreen.node.active = false;
        // this.BirdRed.node.active = false;
        this.GameOver.node.active = true;
        // When the game is over, show the play button
        // this.playBtn.node.active = true;
        this.restartBtn.node.active = true;
        this.scoreLabel.node.active = false;
        this.ScoreResult.node.active = true;
        this.ScoreResultLabel.node.active = true;
        this.HighScoreLabel.node.active = true;
        this.MenuPopup.node.active = false;
        // this.Pipe[0].node.active = false;

        // Change the game status to game over
        this.gameStatus = GameStatus.Game_Over

        // this.Die.play(SoundType.E_Sound_Die);

        // console.log(this.Pipe[0].node.position)
        director.pause();
        
        this.ScoreResultLabel.string = this.gameScore.toString();
        localStorage.setItem('gameHighScoreArray', JSON.stringify(this.gameHighScoreArray));
        this.HighScoreLabel.string = (Math.max(...this.gameHighScoreArray)).toString();
        
        this.restartBtn.node.on(Node.EventType.TOUCH_END, this.touchRestarButton, this);
    }
}
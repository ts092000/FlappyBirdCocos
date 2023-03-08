import { _decorator, Component, Node, AudioSource, assert, Slider, AudioClip} from 'cc';
const { ccclass, property } = _decorator;
import { Game } from './Game'

// sound type enum
export enum SoundType {
    E_Sound_Fly = 0,
    E_Sound_Score,
    E_Sound_Hit,
    E_Sound_Die
}

@ccclass('Audio')
export class Audio extends Component {
    @property({type:AudioClip})
        flySound: AudioClip = null;

    @property({type:AudioClip})
        scoreSound: AudioClip = null;

    @property({type:AudioClip})
        hitSound: AudioClip = null;

    @property({type:AudioClip})
        dieSound: AudioClip = null;

    @property({type:Slider})
        Volume: Slider

    @property({type:Game})
        Game: Game

    VolumeNumb: number;
    // VolumeProgress: Number;
    VolumeControl: number[] = [];

    onLoad() {
        assert(this.flySound);
        assert(this.scoreSound);
        assert(this.hitSound);
        assert(this.dieSound);
    }


    start() {
        let VolumeNumber = localStorage.getItem('VolumeControl');
        if (VolumeNumber) {
            this.VolumeControl = JSON.parse(VolumeNumber);
        }
        console.log(VolumeNumber);
    }

    play(type: SoundType , volume: number = this.VolumeControl.pop()) {
        if (type == SoundType.E_Sound_Fly) {
            assert(this.flySound);
        }
        else if (type == SoundType.E_Sound_Score) {
            assert(this.scoreSound);
        }
        else if (type == SoundType.E_Sound_Hit) {
            assert(this.hitSound);
        }
        else if (type == SoundType.E_Sound_Die) {
            assert(this.dieSound);
        }

        this.Game.Fly.getComponent(AudioSource).volume = volume;
        this.Game.Score.getComponent(AudioSource).volume = volume;
        this.Game.Score.getComponent(AudioSource).volume = volume;
        this.Game.Die.getComponent(AudioSource).volume = volume;
        this.Volume.progress = volume;
    }

    volumeSetup() {
        this.Game.Fly.getComponent(AudioSource).volume = this.Volume.progress;
        this.Game.Score.getComponent(AudioSource).volume = this.Volume.progress;
        this.Game.Hit.getComponent(AudioSource).volume = this.Volume.progress;
        this.Game.Die.getComponent(AudioSource).volume = this.Volume.progress;
        // this.flySound.volume = this.Volume.progress;
        // this.scoreSound.volume = this.Volume.progress;
        // this.hitSound.volume = this.Volume.progress;
        // this.dieSound.volume = this.Volume.progress;
        

        this.flySound.getVolume();
        this.flySound.setVolume(this.Volume.progress);
        this.scoreSound.getVolume();
        this.scoreSound.setVolume(this.Volume.progress);
        this.hitSound.getVolume();
        this.hitSound.setVolume(this.Volume.progress);
        this.dieSound.getVolume();
        this.dieSound.setVolume(this.Volume.progress);
        
        // this.VolumeControl.push(this.Volume.progress);
        this.VolumeControl.push(this.Volume.progress);
        localStorage.setItem('VolumeControl', JSON.stringify(this.VolumeControl));
        // this.VolumeControl.pop();
        console.log('Volume', this.Volume.progress);
        this.VolumeNumb = this.VolumeControl.pop();
        console.log('VolumeNumb', this.VolumeNumb);
        return this.VolumeNumb;
        
        // console.log('Volume Last element', this.VolumeControl.pop());
    }

    update(deltaTime: number) {

    }
}



import { _decorator, Component, Node, Prefab, input, Input, EventKeyboard, instantiate, Vec3, tween, KeyCode } from 'cc';
const { ccclass, property } = _decorator;
import { Bird } from './Bird'

@ccclass('Bullet')
export class Bullet extends Component {

    // @property({type:ObjectPool})
    //     ObjectPool: ObjectPool

    @property({type:Prefab})
        bulletPrefab: Prefab

    @property({type:Bird})
        Bird: Bird

    start() {

    }

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.moveBulletKeyDown, this);
    }
    
    onDestroy () {
        input.off(Input.EventType.KEY_DOWN, this.moveBulletKeyDown, this);
    }
    
    update(deltaTime: number) {
        input.on(Input.EventType.KEY_DOWN, this.moveBulletKeyDown, this);
        // console.log(this.node.position);
        // console.log('object', Object.position);
        // console.log('bullet: ', this.node.position);
    }

    moveBulletKeyDown(event: EventKeyboard) {
        // let Object =  this.ObjectPool.GetPooledOjects();
        // let positionX = Object.position.x;
        
        // if (positionX > 240) {
            //     Object.active = false;
            //     console.log('123');
            //     console.log('objX: ', positionX);
            // }
            
            switch(event.keyCode) {
                case KeyCode.SPACE:
                let newBullet = instantiate(this.bulletPrefab);
                newBullet.setPosition(new Vec3(0, Bird.positionBirdY, 0));
                this.node.addChild(newBullet);
                // newBullet.setPosition(new Vec3(this.node.position.x + 240, Bird.positionBirdY, 0));
        
                // let Object =  this.ObjectPool.GetPooledOjects();
                // Object.setPosition(new Vec3(0, Bird.positionBirdY,0));
                // console.log('obj: ', Object);
                let moveBullet = tween(newBullet).to(1.0 ,{position: new Vec3(this.node.position.x + 240, this.node.position.y + Bird.positionBirdY, 0)});
                moveBullet.removeSelf().start();
                let bulletPos = newBullet.getPosition();
                bulletPos.x += 240;
                bulletPos.y = this.node.position.y + Bird.positionBirdY;
                console.log(bulletPos);
                // Object.setPosition(new Vec3(0, Bird.positionBirdY,0));
                // // console.log('Objectpos1',Object.getPosition());
                //     let moveBullet = tween(Object.position).to(1.0, new Vec3(Object.position.x + 241, Bird.positionBirdY, 0), {                        
                //         onUpdate : (target:Vec3, ratio:number)=>{                        
                //             Object.setPosition(new Vec3(target));
                //             if (Object.position.x > 240) {
                //                 // Object.setPosition(new Vec3(0, Bird.positionBirdY, 0));
                //                 Object.active = false;
                //                 console.log('false');
                //             }                               
                //         }})
                //         if (Object != null)
                //         {
                //             Object.active = true;
                //             moveBullet.start();

                //             console.log(moveBullet);
                //             console.log('Objecttruefalse1',Object.active);
                //             this.node.setPosition(Object.position);
                //             console.log('Objectpos2',this.node.position);
                //             // Object.setPosition(new Vec3(240, Object.position.y + Bird.positionBirdY, 0));
                            // console.log('Objectpos3',Object.getPosition());
            
                            // console.log('456', Object.position);
                            // Object.position = new Vec3(Object.position.x + 240, this.node.position.y + Bird.positionBirdY, 0);
                        // }
            }
        }
}



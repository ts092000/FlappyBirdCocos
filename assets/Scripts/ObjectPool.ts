import { _decorator, Component, Node, instantiate, director, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ObjectPool')
export class ObjectPool extends Component {
    // public static instance: ObjectPool;
    // private pooledObjects: Node[] = [];
    // private amountToPool: number = 10;

    // @property({type:Prefab}) 
    //     bulletPrefab: Prefab;

    
    start() {
        // for (let i = 0; i < this.amountToPool; i++){
        //     const node = instantiate(this.bulletPrefab);
        //     node.parent = director.getScene().getChildByName('Canvas');
        //     node.active = false;
        //     this.pooledObjects.push(node);
        // }
    }

    // public GetPooledOjects(){
    //     for(let i = 0; i < this.pooledObjects.length; i++){
    //         if (!this.pooledObjects[i].active) {
    //             return this.pooledObjects[i];
    //         }
    //     }
    //     return null;
    // }

    update() {
        // let count = 0;
        // for(let i = 0; i < this.pooledObjects.length; i++){     
        //     if (!this.pooledObjects[i].active){
        //         return this.pooledObjects[i];
        //     }
        // console.log(count);
        // }
    }
}
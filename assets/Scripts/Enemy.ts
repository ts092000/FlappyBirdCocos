import { _decorator, Component, Node, Prefab, NodePool, instantiate, input, Input, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property({type:Prefab})
        EnemyPrefab: Prefab

    // static enemyPool: NodePool;

    enemy: Node[] = [null];

    static positionEnemyX: number;
    static positionEnemyY: number;
    
    start() {
        this.createEnemy();
    }

    
    onLoad() {

    }
    
    onDestroy() {
        // input.off(Input.EventType.TOUCH_START, this.createEnemy, this);
        
    }
    
    update(deltaTime: number) {
        this.updateEnemy();
    }
    
    createEnemy() {
        for (let i = 0; i < this.enemy.length; i++) {
            this.enemy[i] = instantiate(this.EnemyPrefab);
            this.node.addChild(this.enemy[i]);

            let enemyX = this.enemy[i].position.x;
            let enemyY = this.enemy[i].position.y;
            enemyX = 170 + 200 * i;
            let minY = -120;
            let maxY = 120;
            enemyY = minY + Math.random() * (maxY - minY);
            Enemy.positionEnemyX  = this.enemy[i].position.x;
            Enemy.positionEnemyY  = this.enemy[i].position.y;
            // console.log('X', Enemy.positionEnemyX);
            // console.log('Y', Enemy.positionEnemyY);
            return Enemy.positionEnemyX, Enemy.positionEnemyY;
        }
    }

    updateEnemy() {
        for (let i = 0; i < this.enemy.length; i++) {
            let enemyX = this.enemy[i].position.x;
            let enemyY = this.enemy[i].position.y;
            enemyX -= 1.0;
            if (enemyX <= -160) {
                enemyX = 160;               
                let minY = -100;
                let maxY = 100;
                enemyY = minY + Math.random() * (maxY - minY);
            }
            Enemy.positionEnemyX  = this.enemy[i].position.x;
            Enemy.positionEnemyY  = this.enemy[i].position.y;
            this.enemy[i].position = new Vec3(enemyX, enemyY, 0);
            // console.log('position', this.enemy[i].position);
            return Enemy.positionEnemyX, Enemy.positionEnemyY;
        }
    }
    
    // createEnemy(parentNode) {
    //     let enemy = null;
    //     if (Enemy.enemyPool.size() > 0) { // use size method to check if there're nodes available in the pool
    //         enemy = Enemy.enemyPool.get();
    //     } else { // if not enough node in the pool, we call cc.instantiate to create node
    //         enemy = instantiate(this.EnemyPrefab);
    //         this.node.addChild(enemy);
    //     }
    //     enemy.parent = parentNode; // add new enemy node to the node tree
    //     enemy.init(); //initialize enemy
    // }

    // onEnemyKilled(enemy) {
    //     // enemy should be a cc.Node instance
    //     Enemy.enemyPool.put(enemy); // using the same put method as inistalizing node pool, this will also call removeFromParent for the node
    // }
}



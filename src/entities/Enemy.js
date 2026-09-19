class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type = 'patrol', speed = 80) {
        super(scene, x, y, 'enemy');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.type = type;
        this.speed = speed;
        this.direction = 1;
        this.patrolDistance = 150;
        this.startX = x;
        this.health = 50;
        
        this.setCollideWorldBounds(false);
        this.setBounce(1, 0);
        
        this.createAnimations();
    }
    
    createAnimations() {
        const scene = this.scene;
        
        if (!scene.anims.exists('enemy-walk')) {
            scene.anims.create({
                key: 'enemy-walk',
                frames: scene.anims.generateFrameNumbers('enemy', { start: 0, end: 2 }),
                frameRate: 8,
                repeat: -1
            });
        }
        
        if (!scene.anims.exists('enemy-attack')) {
            scene.anims.create({
                key: 'enemy-attack',
                frames: scene.anims.generateFrameNumbers('enemy', { start: 3, end: 5 }),
                frameRate: 10
            });
        }
        
        this.play('enemy-walk');
    }
    
    update(player) {
        if (this.type === 'patrol') {
            this.patrol();
        } else if (this.type === 'chaser') {
            this.chase(player);
        }
    }
    
    patrol() {
        this.setVelocityX(this.speed * this.direction);
        
        // تغيير الاتجاه عند الوصول لنهاية الدورية
        if (Math.abs(this.x - this.startX) > this.patrolDistance) {
            this.direction *= -1;
            this.setFlipX(this.direction === -1);
        }
    }
    
    chase(player) {
        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
        
        if (distance < 300) {
            const direction = this.x < player.x ? 1 : -1;
            this.setVelocityX(this.speed * 1.5 * direction);
            this.setFlipX(direction === -1);
        } else {
            this.patrol();
        }
    }
    
    takeDamage(amount = 10) {
        this.health -= amount;
        
        this.setTint(0xff6666);
        this.scene.time.delayedCall(100, () => {
            this.clearTint();
        });
        
        return this.health > 0;
    }
}

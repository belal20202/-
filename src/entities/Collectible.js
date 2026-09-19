class Collectible extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type = 'coin') {
        super(scene, x, y, type);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.type = type;
        this.collected = false;
        
        this.setGravityY(0); // لا توجد جاذبية للعملات
        this.setBounce(0.5);
        
        this.createAnimations();
    }
    
    createAnimations() {
        const scene = this.scene;
        
        if (!scene.anims.exists('coin-spin')) {
            scene.anims.create({
                key: 'coin-spin',
                frames: scene.anims.generateFrameNumbers('coins', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        }
        
        this.play('coin-spin');
    }
    
    collect(player) {
        if (!this.collected) {
            this.collected = true;
            
            // تأثير جمع العملة
            const particles = this.scene.add.particles(0xffff00);
            const emitter = particles.createEmitter({
                speed: { min: -200, max: 200 },
                angle: { min: 240, max: 300 },
                scale: { start: 1, end: 0 },
                lifespan: 600,
                gravityY: -300
            });
            
            emitter.emitParticleAt(this.x, this.y, 10);
            this.scene.time.delayedCall(650, () => particles.destroy());
            
            // صوت جمع العملة
            this.scene.sound.play('coin');
            
            // إضافة العملات للاعب
            player.addCoins(GAME_CONFIG.COIN_VALUE);
            
            this.destroy();
        }
    }
}

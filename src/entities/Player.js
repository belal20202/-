class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        
        this.speed = GAME_CONFIG.PLAYER_SPEED;
        this.jumpForce = GAME_CONFIG.PLAYER_JUMP_FORCE;
        this.isJumping = false;
        this.dashCooldown = 0;
        this.currentOutfit = 'default';
        this.coins = parseInt(localStorage.getItem('coins')) || 0;
        this.health = 100;
        
        this.createAnimations();
        this.setupControls(scene);
    }
    
    createAnimations() {
        const scene = this.scene;
        
        // حركة الركض (يمين)
        if (!scene.anims.exists('run-right')) {
            scene.anims.create({
                key: 'run-right',
                frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        }
        
        // حركة الركض (يسار)
        if (!scene.anims.exists('run-left')) {
            scene.anims.create({
                key: 'run-left',
                frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
                frameRate: 10,
                repeat: -1
            });
        }
        
        // حركة القفز
        if (!scene.anims.exists('jump')) {
            scene.anims.create({
                key: 'jump',
                frames: [{ key: 'player', frame: 8 }],
                frameRate: 10
            });
        }
        
        // حركة السقوط
        if (!scene.anims.exists('fall')) {
            scene.anims.create({
                key: 'fall',
                frames: [{ key: 'player', frame: 9 }],
                frameRate: 10
            });
        }
    }
    
    setupControls(scene) {
        this.keys = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.W,
            dash: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            pause: Phaser.Input.Keyboard.KeyCodes.P
        });
        
        // أيضاً أسهم لوحة المفاتيح
        scene.input.keyboard.on('keydown', (event) => {
            if (event.key === 'ArrowLeft') this.keys.left.isDown = true;
            if (event.key === 'ArrowRight') this.keys.right.isDown = true;
            if (event.key === 'ArrowUp') {
                this.jump();
                event.preventDefault();
            }
        });
    }
    
    update() {
        // الحركة الأفقية
        if (this.keys.left.isDown) {
            this.setVelocityX(-this.speed);
            if (!this.isJumping) {
                this.play('run

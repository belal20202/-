class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    
    init(data) {
        this.currentLevel = data.level || 1;
    }
    
    create() {
        // خلفية
        this.add.image(400, 300, 'background').setScale(1.2);
        
        // الحصول على تكوين المرحلة
        let levelConfig;
        if (LEVEL_CONFIG[this.currentLevel]) {
            levelConfig = LEVEL_CONFIG[this.currentLevel];
        } else {
            levelConfig = generateLevelConfig(this.currentLevel);
        }
        
        // إنشاء مجموعات الفيزياء
        this.platforms = this.physics.add.staticGroup();
        this.enemies = this.physics.add.group();
        this.coins = this.physics.add.group();
        
        // إضافة المنصات
        levelConfig.platforms.forEach(platform => {
            const plat = this.add.rectangle(platform.x, platform.y, platform.width, platform.height, 0x333333);
            plat.setStrokeStyle(2, 0xffffff);
            this.physics.add.existing(plat, true);
            this.platforms.add(plat);
        });
        
        // إنشاء اللاعب
        this.player = new Player(this, levelConfig.spawnPoint.x, levelConfig.spawnPoint.y);
        
        // إضافة الأعداء
        levelConfig.enemies.forEach(enemyConfig => {
            const enemy = new Enemy(this, enemyConfig.x, enemyConfig.y, enemyConfig.type, enemyConfig.speed);
            this.enemies.add(enemy);
        });
        
        // إضافة العملات
        levelConfig.coins.forEach(coinConfig => {
            const coin = new Collectible(this, coinConfig.x, coinConfig.y, 'coins');
            this.coins.add(coin);
        });
        
        // إنشاء نقطة النهاية (الهدف)
        this.goal = this.add.rectangle(levelConfig.goalPoint.x, levelConfig.goalPoint.y, 40, 40, 0xffff00);
        this.goal.setStrokeStyle(3, 0xff0000);
        this.physics.add.existing(this.goal, true);
        
        // إضافة الحدود العالمية
        this.physics.world.setBounds(0, 0, 800, 600);
        this.player.setCollideWorldBounds(true);
        
        // إضافة التصادمات
        this.physics.add.collider(this.player, this.platforms, () => {
            this.player.setTouchingGround(true);
        });
        
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.coins, this.platforms);
        
        // تصادم اللاعب مع الأعداء
        this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
            if (!player.takeDamage()) {
                this.handlePlayerDeath();
            }
        });
        
        // تصادم اللاعب مع العملات
        this.physics.add.overlap(this.player, this.coins, (player, coin) => {
            coin.collect(player);
        });
        
        // تصادم اللاعب مع الهدف
        this.physics.add.overlap(this.player, this.goal, () => {
            this.levelComplete();
        });
        
        // إعادة تعيين الاتصال بالأرضية
        this.physics.world.on('worldbounds', () => {
            if (this.player.y > 600) {
                this.handlePlayerDeath();
            }
        });
        
        // إنشاء واجهة المستخدم
        this.createUI();
        
        // تشغيل الموسيقى الخلفية
        if (!this.sound.isPlaying('bgm-level')) {
            this.sound.play('bgm-level', { loop: true, volume: 0.5 });
        }
        
        // إضافة اختبار الاتصال بالأرضية
        this.time.addEvent({
            delay: 100,
            callback: () => {
                if (!this.physics.overlap(this.player, this.platforms)) {
                    this.player.setTouchingGround(false);
                }
            },
            loop: true
        });
        
        // الكاميرا تتابع اللاعب
        this.cameras.main.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.player);
    }
    
    update() {
        // تحديث اللاعب
        if (this.player.active) {
            this.player.update();
        }
        
        // تحديث الأعداء
        this.enemies.children.entries.forEach(enemy => {
            if (enemy.active) {
                enemy.update(this.player);
            }
        });
    }
    
    createUI() {
        // عرض رقم المرحلة
        this.levelText = this.add.text(400, 20, `المرحلة: ${this.currentLevel}`, {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(100);
        
        // عرض الصحة
        this.healthText = this.add.text(20, 20, `الصحة: 100`, {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ff0000',
            fontStyle: 'bold'
        }).setScrollFactor(0).setDepth(100);
        
        // عرض العملات
        this.coinsText = this.add.text(780, 20, `العملات: 0`, {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffff00',
            fontStyle: 'bold'
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(100);
        
        // زر الإيقاف المؤقت
        const pauseButton = this.add.rectangle(750, 560, 50, 40, 0x4488ff);
        pauseButton.setStrokeStyle(2, 0xffffff);
        pauseButton.setInteractive();
        pauseButton.setScrollFactor(0).setDepth(100);
        
        const pauseText = this.add.text(750, 560, 'إيقاف', {
            fontSize: '12px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(100);
        
        let isPaused = false;
        pauseButton.on('pointerdown', () => {
            isPaused = !isPaused;
            if (isPaused) {
                this.physics.pause();
                pauseText.setText('استئناف');
            } else {
                this.physics.resume();
                pauseText.setText('إيقاف');
            }
        });
        
        // تحديث واجهة المستخدم
        this.time.addEvent({
            delay: 100,
            callback: () => {
                this.healthText.setText(`الصحة: ${this.player.health}`);
                this.coinsText.setText(`العملات: ${this.player.coins}`);
            },
            loop: true
        });
    }
    
    handlePlayerDeath() {
        this.scene.start('GameOverScene', { level: this.currentLevel });
    }
    
    levelComplete() {
        // تحديث المراحل المكتملة
        const completed = parseInt(localStorage.getItem('completedLevels')) || 0;
        if (this.currentLevel > completed) {
            localStorage.setItem('completedLevels', this.currentLevel);
        }
        
        // الانتقال للمرحلة التالية
        if (this.currentLevel < GAME_CONFIG.TOTAL_LEVELS) {
            this.scene.start('GameScene', { level: this.currentLevel + 1 });
        } else {
            this.showV
    showVictoryScreen() {
        this.physics.pause();
        
        const victoryBg = this.add.rectangle(400, 300, 800, 600, 0x000000);
        victoryBg.setAlpha(0.7).setScrollFactor(0).setDepth(200);
        
        const victoryText = this.add.text(400, 200, 'مبروك! 🎉', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ffff00',
            fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(201);
        
        const coinsEarned = this.add.text(400, 280, `العملات المكتسبة: ${this.player.coins}`, {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(201);
        
        const nextButton = this.add.rectangle(400, 380, 200, 50, 0x44ff44);
        nextButton.setStrokeStyle(3, 0xffffff).setInteractive();
        nextButton.setScrollFactor(0).setDepth(201);
        
        const nextText = this.add.text(400, 380, 'المرحلة التالية', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(201);
        
        nextButton.on('pointerdown', () => {
            if (this.currentLevel < GAME_CONFIG.TOTAL_LEVELS) {
                this.scene.start('GameScene', { level: this.currentLevel + 1 });
            } else {
                this.scene.start('MenuScene');
            }
        });
        
        const homeButton = this.add.rectangle(400, 450, 200, 50, 0x4488ff);
        homeButton.setStrokeStyle(3, 0xffffff).setInteractive();
        homeButton.setScrollFactor(0).setDepth(201);
        
        const homeText = this.add.text(400, 450, 'الصفحة الرئيسية', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(201);
        
        homeButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

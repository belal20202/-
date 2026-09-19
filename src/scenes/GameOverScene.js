class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }
    
    init(data) {
        this.currentLevel = data.level || 1;
    }
    
    create() {
        // خلفية
        const bgOverlay = this.add.rectangle(400, 300, 800, 600, 0x000000);
        bgOverlay.setAlpha(0.8);
        
        // رسالة الخسارة
        this.add.text(400, 150, 'انتهت اللعبة', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        this.add.text(400, 220, 'لم تتمكن من الوصول إلى النهاية', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        this.add.text(400, 280, `المرحلة: ${this.currentLevel}`, {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffff00',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // زر إعادة المحاولة
        const retryButton = this.add.rectangle(400, 380, 200, 50, 0xff6600);
        retryButton.setStrokeStyle(3, 0xffffff);
        retryButton.setInteractive();
        
        const retryText = this.add.text(400, 380, 'إعادة المحاولة', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        retryButton.on('pointerover', () => {
            retryButton.setScale(1.05);
        });
        
        retryButton.on('pointerout', () => {
            retryButton.setScale(1);
        });
        
        retryButton.on('pointerdown', () => {
            this.scene.start('GameScene', { level: this.currentLevel });
        });
        
        // زر اختيار المرحلة
        const selectButton = this.add.rectangle(400, 460, 200, 50, 0x4488ff);
        selectButton.setStrokeStyle(3, 0xffffff);
        selectButton.setInteractive();
        
        const selectText = this.add.text(400, 460, 'اختيار المرحلة', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        selectButton.on('pointerover', () => {
            selectButton.setScale(1.05);
        });
        
        selectButton.on('pointerout', () => {
            selectButton.setScale(1);
        });
        
        selectButton.on('pointerdown', () => {
            this.scene.start('LevelSelectScene');
        });
        
        // زر الصفحة الرئيسية
        const homeButton = this.add.rectangle(400, 540, 200, 50, 0x44ff44);
        homeButton.setStrokeStyle(3, 0xffffff);
        homeButton.setInteractive();
        
        const homeText = this.add.text(400, 540, 'الصفحة الرئيسية', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        homeButton.on('pointerover', () => {
            homeButton.setScale(1.05);
        });
        
        homeButton.on('pointerout', () => {
            homeButton.setScale(1);
        });
        
        homeButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

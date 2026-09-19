class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super('LevelSelectScene');
    }
    
    create() {
        // خلفية
        this.add.image(400, 300, 'background').setScale(1.2);
        
        // العنوان
        this.add.text(400, 50, 'اختر المرحلة', {
            fontSize: '40px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // الحصول على أعلى مرحلة مكتملة
        const completedLevels = parseInt(localStorage.getItem('completedLevels')) || 0;
        
        // إنشاء شبكة من أزرار المراحل (10 صفوف × 10 أعمدة = 100 مرحلة)
        let levelNumber = 1;
        const levelButtons = [];
        
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const x = 80 + col * 70;
                const y = 120 + row * 45;
                
                const isUnlocked = levelNumber <= completedLevels + 1;
                const button = this.createLevelButton(x, y, levelNumber, isUnlocked);
                
                levelButtons.push(button);
                levelNumber++;
            }
        }
        
        // زر العودة
        this.createButton(50, 580, 'العودة', () => {
            this.scene.start('MenuScene');
        });
        
        // عرض معلومات المراحل
        this.add.text(750, 580, `مكتمل: ${completedLevels}/100`, {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffff00'
        }).setOrigin(1, 1);
    }
    
    createLevelButton(x, y, level, isUnlocked) {
        const button = this.add.rectangle(x, y, 60, 40, isUnlocked ? 0x44ff44 : 0x888888);
        button.setStrokeStyle(2, 0xffffff);
        button.setInteractive();
        
        const buttonText = this.add.text(x, y, level.toString(), {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: isUnlocked ? '#000000' : '#cccccc',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        if (isUnlocked) {
            button.on('pointerover', () => {
                button.setScale(1.1);
                buttonText.setScale(1.1);
            });
            
            button.on('pointerout', () => {
                button.setScale(1);
                buttonText.setScale(1);
            });
            
            button.on('pointerdown', () => {
                this.scene.start('GameScene', { level: level });
            });
        } else {
            buttonText.setText('🔒');
        }
        
        return button;
    }
    
    createButton(x, y, text, callback) {
        const button = this.add.rectangle(x, y, 100, 40, 0x4488ff);
        button.setStrokeStyle(2, 0xffffff);
        button.setInteractive();
        
        const buttonText = this.add.text(x, y, text, {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        button.on('pointerover', () => {
            button.setScale(1.05);
        });
        
        button.on('pointerout', () => {
            button.setScale(1);
        });
        
        button.on('pointerdown', callback);
        
        return button;
    }
}

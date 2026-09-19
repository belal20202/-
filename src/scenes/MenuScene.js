class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    
    create() {
        // خلفية القائمة الرئيسية
        this.add.image(400, 300, 'background').setScale(1.2);
        
        // عنوان اللعبة
        const titleText = this.add.text(400, 100, 'لعبة الشخصية العربية', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        
        // شرح اللعبة
        const descriptionText = this.add.text(400, 180, 'انطلق في مغامرة مثيرة واجمع العملات', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffff00',
            align: 'center'
        }).setOrigin(0.5);
        
        // زر البدء
        const playButton = this.createButton(400, 300, 'ابدأ اللعبة', () => {
            this.scene.start('LevelSelectScene');
        });
        
        // زر المتجر
        const shopButton = this.createButton(400, 380, 'المتجر', () => {
            this.scene.start('ShopScene');
        });
        
        // زر الإعدادات
        const settingsButton = this.createButton(400, 460, 'الإعدادات', () => {
            this.showSettings();
        });
        
        // عرض عدد العملات الحالية
        const coins = parseInt(localStorage.getItem('coins')) || 0;
        this.add.text(400, 550, `العملات: ${coins}`, {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffff00',
            align: 'center'
        }).setOrigin(0.5);
    }
    
    createButton(x, y, text, callback) {
        // خلفية الزر
        const button = this.add.rectangle(x, y, 200, 50, 0x4488ff);
        button.setStrokeStyle(3, 0xffffff);
        button.setInteractive();
        
        // نص الزر
        const buttonText = this.add.text(x, y, text, {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // أحداث الزر
        button.on('pointerover', () => {
            button.setFillStyle(0x5599ff);
            button.setScale(1.05);
            buttonText.setScale(1.05);
        });
        
        button.on('pointerout', () => {
            button.setFillStyle(0x4488ff);
            button.setScale(1);
            buttonText.setScale(1);
        });
        
        button.on('pointerdown', callback);
        
        return button;
    }
    
    showSettings() {
        const settingsText = this.add.text(400, 300, 'الإعدادات', {
            fontSize: '40px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(100);
        
        const soundText = this.add.text(400, 350, 'الصوت: قيد التشغيل', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffff00'
        }).setOrigin(0.5).setDepth(100);
        
        this.time.delayedCall(3000, () => {
            settingsText.destroy();
            soundText.destroy();
        });
    }
}

class ShopScene extends Phaser.Scene {
    constructor() {
        super('ShopScene');
    }
    
    create() {
        // خلفية
        this.add.image(400, 300, 'background').setScale(1.2);
        
        // العنوان
        this.add.text(400, 40, 'المتجر', {
            fontSize: '40px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // عرض العملات الحالية
        const coins = parseInt(localStorage.getItem('coins')) || 0;
        this.coinsText = this.add.text(400, 90, `العملات: ${coins}`, {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffff00',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // إنشاء قائمة الملابس
        this.createOutfitItems();
        
        // زر العودة
        this.createButton(400, 550, 'العودة', () => {
            this.scene.start('MenuScene');
        });
    }
    
    createOutfitItems() {
        const outfitKeys = Object.keys(OUTFITS);
        let yPosition = 150;
        
        outfitKeys.forEach((key, index) => {
            const outfit = OUTFITS[key];
            const coins = parseInt(localStorage.getItem('coins')) || 0;
            
            // خلفية العنصر
            const itemBg = this.add.rectangle(400, yPosition, 600, 80, 0x333333);
            itemBg.setStrokeStyle(2, 0xffffff);
            
            // اسم الزي
            this.add.text(120, yPosition - 15, outfit.name, {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: '#ffffff',
                fontStyle: 'bold'
            });
            
            // السعر أو حالة الامتلاك
            let statusText = '';
            let statusColor = '#ff0000';
            
            if (outfit.owned) {
                statusText = 'مملوك ✓';
                statusColor = '#00ff00';
            } else {
                statusText = `السعر: ${outfit.price}`;
                statusColor = coins >= outfit.price ? '#ffff00' : '#ff0000';
            }
            
            this.add.text(120, yPosition + 15, statusText, {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: statusColor
            });
            
            // زر الشراء أو الاستخدام
            const button = this.add.rectangle(650, yPosition, 120, 60, 0x4488ff);
            button.setStrokeStyle(2, 0xffffff);
            button.setInteractive();
            
            let buttonText = '';
            if (outfit.owned) {
                buttonText = 'استخدام';
            } else {
                buttonText = 'شراء';
            }
            
            const buttonTextObj = this.add.text(650, yPosition, buttonText, {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            button.on('pointerover', () => {
                button.setScale(1.05);
            });
            
            button.on('pointerout', () => {
                button.setScale(1);
            });
            
            button.on('pointerdown', () => {
                this.handleOutfitAction(key, outfit, coins);
            });
            
            yPosition += 90;
        });
    }
    
    handleOutfitAction(key, outfit, coins) {
        if (outfit.owned) {
            // استخدام الزي
            OUTFITS[key].inUse = true;
            localStorage.setItem('currentOutfit', key);
            
            this.add.text(400, 300, 'تم اختيار الزي! ✓', {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: '#00ff00',
                fontStyle: 'bold'
            }).setOrigin(0.5).setDepth(100);
            
            this.time.delayedCall(1500, () => {
                this.scene.restart();
            });
        } else if (coins >= outfit.price) {
            // شراء الزي
            const newCoins = coins - outfit.price;
            localStorage.setItem('coins', newCoins);
            OUTFITS[key].owned = true;
            
            this.add.text(400, 300, 'تم الشراء بنجاح! ✓', {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: '#00ff00',
                fontStyle: 'bold'
            }).setOrigin(0.5).setDepth(100);
            
            this.time.delayedCall(1500, () => {
                this.scene.restart();
            });
        } else {
            // عملات غير كافية
            this.add.text(400, 300, 'عملات غير كافية!', {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: '#ff0000',
                fontStyle: 'bold'
            }).setOrigin(0.5).setDepth(100);
            
            this.time.delayedCall(1500, () => {
                this.scene.restart();
            });
        }
    }
    
    createButton(x, y, text, callback) {
        const button = this.add.rectangle(x, y, 150, 45, 0x4488ff);
        button.setStrokeStyle(2, 0xffffff);
        button.setInteractive();
        
        const buttonText = this.add.text(x, y, text, {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
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

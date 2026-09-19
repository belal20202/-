class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    
    preload() {
        // تحميل الصور (يمكنك استخدام صور من الإنترنت مؤقتاً)
        this.load.image('player', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMjUiIGZpbGw9IiMzMzMzZmYiLz48L3N2Zz4=');
        this.load.image('enemy', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMjUiIGZpbGw9IiNmZjMzMzMiLz48L3N2Zz4=');
        this.load.image('coins', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiNmZmYwMDAiLz48L3N2Zz4=');
        this.load.image('platform', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjAiIGZpbGw9IiMzMzMzMzMiLz48L3N2Zz4=');
        this.load.image('background', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzY2ZGVlZiIvPjwvc3ZnPg==');
        
        // تحميل ملفات الصوت (استخدم ملفات صوتية مجانية)
        this.load.audio('bgm-level', 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        this.load.audio('jump', 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
        this.load.audio('coin', 'https://assets.mixkit.co/active_storage/sfx/1111/1111-preview.mp3');
        
        this.cameras.main.setBackgroundColor('#222');
    }
    
    create() {
        this.scene.start('MenuScene');
    }
}

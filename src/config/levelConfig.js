// تكوين المراحل - نموذج
const LEVEL_CONFIG = {
    1: {
        name: 'المرحلة الأولى',
        platforms: [
            { x: 400, y: 550, width: 800, height: 50 }, // أرضية رئيسية
            { x: 200, y: 450, width: 200, height: 20 },
            { x: 600, y: 450, width: 200, height: 20 },
            { x: 300, y: 350, width: 150, height: 20 },
            { x: 550, y: 300, width: 150, height: 20 }
        ],
        enemies: [
            { x: 400, y: 400, type: 'patrol', speed: 80 }
        ],
        coins: [
            { x: 250, y: 420 },
            { x: 650, y: 420 },
            { x: 400, y: 320 }
        ],
        spawnPoint: { x: 100, y: 500 },
        goalPoint: { x: 700, y: 450 }
    },
    2: {
        name: 'المرحلة الثانية',
        platforms: [
            { x: 400, y: 550, width: 800, height: 50 },
            { x: 150, y: 450, width: 180, height: 20 },
            { x: 650, y: 450, width: 180, height: 20 },
            { x: 400, y: 350, width: 160, height: 20 },
            { x: 200, y: 250, width: 140, height: 20 },
            { x: 600, y: 250, width: 140, height: 20 }
        ],
        enemies: [
            { x: 300, y: 400, type: 'patrol', speed: 100 },
            { x: 600, y: 350, type: 'patrol', speed: 100 }
        ],
        coins: [
            { x: 200, y: 420 },
            { x: 700, y: 420 },
            { x: 400, y: 320 },
            { x: 250, y: 220 },
            { x: 650, y: 220 }
        ],
        spawnPoint: { x: 100, y: 500 },
        goalPoint: { x: 700, y: 150 }
    }
    // ... إضافة 98 مرحلة أخرى بنفس الطريقة
};

// دالة لتوليد المراحل تلقائياً
function generateLevelConfig(levelNumber) {
    const difficultyMultiplier = Math.pow(GAME_CONFIG.DIFFICULTY_MULTIPLIER, levelNumber - 1);
    
    return {
        name: `المرحلة ${levelNumber}`,
        platforms: generatePlatforms(levelNumber, difficultyMultiplier),
        enemies: generateEnemies(levelNumber, difficultyMultiplier),
        coins: generateCoins(levelNumber),
        spawnPoint: { x: 100, y: 500 },
        goalPoint: { x: 700, y: 50 + (levelNumber % 10) * 30 }
    };
}

function generatePlatforms(level, difficulty) {
    const platforms = [
        { x: 400, y: 550, width: 800, height: 50 } // الأرضية الرئيسية
    ];
    
    const platformCount = 3 + Math.floor(level / 10);
    for (let i = 0; i < platformCount; i++) {
        platforms.push({
            x: 100 + Math.random() * 600,
            y: 450 - i * 100,
            width: 150,
            height: 20
        });
    }
    
    return platforms;
}

function generateEnemies(level, difficulty) {
    const enemies = [];
    const enemyCount = 1 + Math.floor(level / 15);
    
    for (let i = 0; i < enemyCount; i++) {
        enemies.push({
            x: 200 + i * 200,
            y: 400 - i * 80,
            type: 'patrol',
            speed: 80 * difficulty
        });
    }
    
    return enemies;
}

function generateCoins(level) {
    const coins = [];
    const coinCount = 3 + Math.floor(level / 5);
    
    for (let i = 0; i < coinCount; i++) {
        coins.push({
            x: 150 + Math.random() * 500,
            y: 450 - Math.random() * 300
        });
    }
    
    return coins;
}

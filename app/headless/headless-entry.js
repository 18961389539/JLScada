const path = require('path');
const fs = require('fs');
const os = require('os');
const { fork } = require('child_process');

/**
 * JLScada Headless Entry Point
 * 
 * This script is the entry point for standalone binaries.
 * It ensures the project data directory exists in the user's home folder
 * and then launches the JLScada server.
 */

async function bootstrap() {
    console.log('JLScada Headless starting...');

    // 1. Determine the user data directory (similar to Electron app)
    const homeDir = os.homedir();
    const dataDir = path.join(homeDir, 'JLScada-headless-data');
    const legacyDataDir = path.join(homeDir, 'fuxa-headless-data');
    
    // 2. Ensure the directory exists (Electron-style)
    if (!fs.existsSync(dataDir)) {
        if (fs.existsSync(legacyDataDir)) {
            console.log(`Migrating existing data from ${legacyDataDir} to ${dataDir}`);
            try {
                fs.cpSync(legacyDataDir, dataDir, { recursive: true, errorOnExist: false });
            } catch (err) {
                console.error(`Failed to migrate data directory: ${err.message}`);
                process.exit(1);
            }
        } else {
            console.log(`Creating initial data directory: ${dataDir}`);
        }
        try {
            fs.mkdirSync(dataDir, { recursive: true });
        } catch (err) {
            console.error(`Failed to create data directory: ${err.message}`);
            process.exit(1);
        }
    } else {
        console.log(`Using existing data directory: ${dataDir}`);
    }

    // 3. Resolve the server path
    const serverPath = path.join(__dirname, 'server', 'main.js');

    if (!fs.existsSync(serverPath)) {
        console.error(`Could not find JLScada server at: ${serverPath}`);
        process.exit(1);
    }

    // 4. Launch the server (fork like Electron does)
    console.log(`Launching JLScada server with userDir: ${dataDir}`);
    
    const serverProcess = fork(serverPath, [], {
        env: { ...process.env, userDir: dataDir },
        stdio: 'inherit'
    });

    serverProcess.on('error', (err) => {
        console.error(`Failed to start JLScada server: ${err.message}`);
        process.exit(1);
    });

    // Keep the process running
    process.on('SIGINT', () => {
        console.log('Shutting down JLScada server...');
        serverProcess.kill('SIGTERM');
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        console.log('Shutting down JLScada server...');
        serverProcess.kill('SIGTERM');
        process.exit(0);
    });
}

bootstrap();

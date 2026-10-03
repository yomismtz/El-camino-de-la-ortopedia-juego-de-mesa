'use strict';
const fs=require('fs');
const assert=require('assert');

const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
const cap=JSON.parse(fs.readFileSync('capacitor.config.json','utf8'));
const privacy=fs.readFileSync('privacy.html','utf8');
const workflow=fs.readFileSync('.github/workflows/playstore-aab.yml','utf8');
const native=fs.readFileSync('native/DentalBluetoothPlugin.java','utf8');
const bt=fs.readFileSync('step21-bluetooth-runtime.js','utf8');

assert.strictEqual(cap.appId,'com.uam.cientodentistas','El package Android debe conservar com.uam.cientodentistas');
assert.strictEqual(cap.appName,'El Camino Dental','El nombre de la aplicación debe ser El Camino Dental');
assert.strictEqual(pkg.version,'3.7.0','La versión fuente debe ser 3.7.0');
assert(workflow.includes("appId: 'com.uam.cientodentistas'") || workflow.includes("appId='com.uam.cientodentistas'"),'El workflow Play Store debe conservar el package oficial');
assert(workflow.includes('bundleRelease'),'El flujo Play Store debe generar AAB de release');
for(const file of ['step16-question-integrity.js','step17-study-runtime.js','step18-progress-unified.js','step19-specialty-stats.js','step20-clinical-cases.js','step21-bluetooth-runtime.js','step23-recovery-runtime.js']) assert(workflow.includes(file),`El AAB debe incluir ${file}`);
assert(workflow.includes('step21-bluetooth-runtime.js'),'El bundle Play Store debe incluir Bluetooth');
assert(workflow.includes('native/DentalBluetoothPlugin.java'),'El bundle Play Store debe incluir el puente Bluetooth');
assert(workflow.includes('versionCode 37')&&workflow.includes('versionName "3.7.0"'),'El flujo debe usar versionCode 37 / versionName 3.7.0');
assert(workflow.includes('targetSdkVersion = 36'),'El flujo debe fijar target SDK 36');
assert(privacy.includes('Bluetooth')&&privacy.includes('BLUETOOTH'),'La política debe documentar el uso de Bluetooth');
assert(native.includes('BLUETOOTH_SCAN')&&native.includes('BLUETOOTH_CONNECT'),'El puente debe declarar permisos Bluetooth modernos');
assert(bt.includes("registerPlugin('DentalBluetooth')"),'El runtime Bluetooth debe registrarse en la app');
console.log('✓ Play Console preflight: package, versión, AAB, target SDK, privacidad y Bluetooth OK');

const os = require('os');

const platform = os.platform();

if (platform === 'win32') {
  console.log(`Detected Windows OS: \'${platform}\'`);
  require('child_process').execSync('npm run start-windows', { stdio: 'inherit' });
} else {
  console.log(`Detected Unix-like OS: \'${platform}\'`);
  require('child_process').execSync('npm run start-unix', { stdio: 'inherit' });
}

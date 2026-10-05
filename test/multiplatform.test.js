const assert = require('assert');
const PlatformAdapter = require('../platforms/platform-adapter');
const { getContentProfile } = require('../platforms/content-profile');

function run() {
  const shorts = getContentProfile('youtubeShorts');
  assert.strictEqual(shorts.aspectRatio, '9:16');
  assert.strictEqual(shorts.width, 1080);
  assert.strictEqual(shorts.height, 1920);
  assert.strictEqual(shorts.requiresHumanApproval, true);

  const tiktok = getContentProfile('tiktok');
  assert.strictEqual(tiktok.publishingEnabled, false);
  assert.strictEqual(tiktok.requiresHumanApproval, true);

  assert.throws(() => getContentProfile('unknown'), /Unsupported platform/);
  assert.throws(() => new PlatformAdapter('invalid'), /abstract/);

  console.log('Multiplatform foundation tests passed');
}

if (require.main === module) run();
module.exports = run;

const assert = require('assert');
const { resolveRenderProfile, assertDurationAllowed } = require('../platforms/render-profile');
const { timelineScaleFilter } = require('../platforms/render-commands');

function run() {
  const classic = resolveRenderProfile();
  assert.strictEqual(classic.resolution, '1920x1080');

  const vertical = resolveRenderProfile('youtubeShorts');
  assert.strictEqual(vertical.resolution, '1080x1920');
  assert.strictEqual(vertical.aspectRatio, '9:16');

  const filter = timelineScaleFilter(0, { duration: 10 }, vertical);
  assert.ok(filter.includes('scale=1080:1920'));
  assert.ok(filter.includes('pad=1080:1920'));

  assert.doesNotThrow(() => assertDurationAllowed(60, vertical));
  assert.throws(() => assertDurationAllowed(181, vertical), /exceeds/);

  console.log('Render profile tests passed');
}

if (require.main === module) run();
module.exports = run;

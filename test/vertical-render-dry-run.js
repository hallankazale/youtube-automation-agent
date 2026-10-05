const fs = require('fs').promises;
const path = require('path');
const { runFFmpeg, checkFFmpeg } = require('../utils/ffmpeg');
const { resolveRenderProfile } = require('../platforms/render-profile');

async function run() {
  if (!(await checkFFmpeg())) throw new Error('FFmpeg is required for vertical dry-run');
  const profile = resolveRenderProfile('youtubeShorts');
  const outputDir = path.join(__dirname, '..', 'temp', 'validation');
  const output = path.join(outputDir, 'vertical-dry-run.mp4');
  await fs.mkdir(outputDir, { recursive: true });

  // Synthetic source only: validates the real encoder/container path without APIs or credentials.
  await runFFmpeg([
    '-y',
    '-f', 'lavfi',
    '-i', `color=c=black:s=${profile.width}x${profile.height}:r=30:d=1`,
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    output
  ]);

  const stat = await fs.stat(output);
  if (!stat.isFile() || stat.size < 1000) throw new Error('Vertical dry-run did not produce a usable MP4');
  const header = await fs.readFile(output);
  if (!header.subarray(0, 64).includes(Buffer.from('ftyp'))) throw new Error('Output is not an MP4 container');
  console.log(`Vertical dry-run passed: ${profile.resolution}, ${stat.size} bytes`);
  await fs.rm(outputDir, { recursive: true, force: true });
}

if (require.main === module) {
  run().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = run;

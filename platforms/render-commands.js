/**
 * Pure FFmpeg helpers. Kept separate so dimensions can be unit-tested without
 * launching FFmpeg or depending on a machine-specific binary.
 */
function timelineScaleFilter(index, segment, profile) {
  const duration = Number(segment.duration).toFixed(2);
  return `[${index}:v]scale=${profile.width}:${profile.height}:force_original_aspect_ratio=decrease,pad=${profile.width}:${profile.height}:(ow-iw)/2:(oh-ih)/2:black,fps=30,format=yuv420p,trim=duration=${duration},setpts=PTS-STARTPTS[v${index}]`;
}

module.exports = { timelineScaleFilter };

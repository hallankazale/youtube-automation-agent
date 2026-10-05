const { getContentProfile } = require('./content-profile');

/**
 * Resolves a safe render profile without exposing platform API details to the renderer.
 * Defaults to classic YouTube so existing upstream behavior remains unchanged.
 */
function resolveRenderProfile(platform = 'youtube') {
  const profile = getContentProfile(platform);
  return {
    platform: profile.id,
    width: profile.width,
    height: profile.height,
    aspectRatio: profile.aspectRatio,
    resolution: `${profile.width}x${profile.height}`,
    maxDurationSeconds: profile.maxDurationSeconds,
  };
}

function assertDurationAllowed(durationSeconds, renderProfile) {
  const duration = Number(durationSeconds);
  if (!Number.isFinite(duration) || duration <= 0) return;
  if (renderProfile.maxDurationSeconds && duration > renderProfile.maxDurationSeconds) {
    throw new Error(`Duration ${duration}s exceeds ${renderProfile.platform} limit of ${renderProfile.maxDurationSeconds}s`);
  }
}

module.exports = { resolveRenderProfile, assertDurationAllowed };

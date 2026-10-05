const PROFILES = Object.freeze({
  youtube: Object.freeze({
    id: 'youtube',
    aspectRatio: '16:9',
    width: 1920,
    height: 1080,
    maxDurationSeconds: null,
    requiresHumanApproval: true,
  }),
  youtubeShorts: Object.freeze({
    id: 'youtube-shorts',
    aspectRatio: '9:16',
    width: 1080,
    height: 1920,
    maxDurationSeconds: 180,
    requiresHumanApproval: true,
  }),
  tiktok: Object.freeze({
    id: 'tiktok',
    aspectRatio: '9:16',
    width: 1080,
    height: 1920,
    maxDurationSeconds: 180,
    requiresHumanApproval: true,
    publishingEnabled: false,
  }),
});

function getContentProfile(platform) {
  const profile = PROFILES[platform];
  if (!profile) throw new Error(`Unsupported platform: ${platform}`);
  return profile;
}

module.exports = { PROFILES, getContentProfile };

/**
 * Contract shared by publishing platforms.
 * Keeping platform-specific APIs behind this boundary prevents TikTok/YouTube
 * changes from leaking into the content-generation pipeline.
 */
class PlatformAdapter {
  constructor(name) {
    if (new.target === PlatformAdapter) throw new Error('PlatformAdapter is abstract');
    this.name = name;
  }

  validateContent() { throw new Error('validateContent() must be implemented'); }
  async publish() { throw new Error('publish() must be implemented'); }
  async getStatus() { throw new Error('getStatus() must be implemented'); }
}

module.exports = PlatformAdapter;

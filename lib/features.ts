/**
 * Feature flags: flip a value and rebuild.
 *
 * blog: when false, the blog pages (/blog/...) answer 404, the home cards are not clickable, and the footer and
 * sitemap do not list the blogs. Turn it on once the posts are ready to publish.
 */
export const features = {
  blog: false,
} as const;

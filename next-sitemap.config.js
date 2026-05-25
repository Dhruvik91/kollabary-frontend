/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://www.kollabary.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false, // This fixes the "Nested indexing" error by creating a single sitemap.xml
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: [
        '/admin', '/admin/**',
        '/overview', '/overview/**',
        '/settings', '/settings/**',
        '/profile', '/profile/**',
        '/messages', '/messages/**',
        '/earnings', '/earnings/**',
        '/collaborations', '/collaborations/**',
        '/auctions', '/auctions/**',
        '/influencer', '/influencer/**',
        '/influencers', '/influencers/**',
        '/my-influencers', '/my-influencers/**',
        '/orders', '/orders/**',
        '/referrals', '/referrals/**',
        '/top-up', '/top-up/**',
        '/brands', '/brands/**',
        '/pitch', '/pitch/**',
        '/api', '/api/**',
        '/auth', '/auth/**',
        '/server-sitemap.xml'
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin', '/admin/**',
                    '/overview', '/overview/**',
                    '/settings', '/settings/**',
                    '/profile', '/profile/**',
                    '/messages', '/messages/**',
                    '/earnings', '/earnings/**',
                    '/collaborations', '/collaborations/**',
                    '/auctions', '/auctions/**',
                    '/influencer', '/influencer/**',
                    '/influencers', '/influencers/**',
                    '/my-influencers', '/my-influencers/**',
                    '/orders', '/orders/**',
                    '/referrals', '/referrals/**',
                    '/top-up', '/top-up/**',
                    '/brands', '/brands/**',
                    '/pitch', '/pitch/**',
                    '/api', '/api/**',
                    '/auth', '/auth/**',
                    '/*?ref*',
                    '/*?utm*',
                    '/*?fbclid*',
                ],
            },
            {
                userAgent: 'facebookexternalhit',
                allow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            }
        ],
    },
    transform: async (config, path) => {
        // Custom transformation for priority paths
        const priorityPaths = ['/', '/about', '/solutions', '/pricing'];
        const isPriorityPage = priorityPaths.includes(path);

        return {
            loc: path,
            changefreq: isPriorityPage ? 'daily' : config.changefreq,
            priority: isPriorityPage ? 1.0 : config.priority,
            lastmod: new Date().toISOString(),
        }
    },
}
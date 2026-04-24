/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://www.kollabary.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false, // This fixes the "Nested indexing" error by creating a single sitemap.xml
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: [
        '/admin/**',
        '/overview/**',
        '/settings/**',
        '/profile/**',
        '/messages/**',
        '/earnings/**',
        '/collaborations/**',
        '/auctions/**',
        '/influencer/**',
        '/influencers/**',
        '/my-influencers/**',
        '/orders/**',
        '/referrals/**',
        '/top-up/**',
        '/brands/**',
        '/api/**',
        '/auth/**',
        '/server-sitemap.xml'
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/overview/',
                    '/settings/',
                    '/profile/',
                    '/messages/',
                    '/earnings/',
                    '/collaborations/',
                    '/auctions/',
                    '/influencer/',
                    '/influencers/',
                    '/my-influencers/',
                    '/orders/',
                    '/referrals/',
                    '/top-up/',
                    '/brands/',
                    '/api/',
                    '/auth/',
                    '/*?*',
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
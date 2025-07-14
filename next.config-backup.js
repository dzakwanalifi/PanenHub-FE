/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
  webpack: (config, { dev, isServer }) => {
    // Simple webpack fixes for development
    if (dev && !isServer) {
      // Ensure publicPath is set correctly
      config.output.publicPath = '/_next/';
      
      // Fix chunk loading issues
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          cacheGroups: {
            default: false,
            vendors: false,
          },
        },
      };
    }
    
    return config;
  },
          javascript: {
            ...config.module.parser?.javascript,
            strictExportPresence: false,
          }
        }
      };

      // Improve resolve configuration
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
        }
      };

      // Optimize split chunks for development
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            default: {
              minChunks: 1,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            }
          }
        }
      };
    }

    return config;
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' 'wasm-unsafe-eval' 'inline-speculation-rules'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' http://localhost:8080 https://api.panenhub.dev https://panenhub-backend-49479616918.us-central1.run.app https://*.supabase.co wss://*.supabase.co https://*.supabase.io wss://*.supabase.io",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;

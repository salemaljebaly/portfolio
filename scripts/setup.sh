#!/bin/bash

# Salem Aljebaly Portfolio - Project Setup Script
# This script creates all necessary directories and empty files

echo "🚀 Setting up Salem Aljebaly Portfolio Project Structure..."

# Create directories
echo "📁 Creating directories..."
mkdir -p src/app/{about,projects,certifications,contact,api,ar}
mkdir -p src/app/api/{contact,github,sitemap}
mkdir -p src/app/ar/{about,projects,certifications,contact}
mkdir -p src/components/{home,magicui,ui}
mkdir -p src/lib
mkdir -p public/certifications

# Create layout files
echo "📄 Creating layout files..."
touch src/app/layout.tsx
touch src/app/ar/layout.tsx

# Create page files
echo "📄 Creating page files..."
touch src/app/page.tsx
touch src/app/about/page.tsx
touch src/app/projects/page.tsx
touch src/app/certifications/page.tsx
touch src/app/contact/page.tsx

# Create Arabic page files
touch src/app/ar/page.tsx
touch src/app/ar/about/page.tsx
touch src/app/ar/projects/page.tsx
touch src/app/ar/certifications/page.tsx
touch src/app/ar/contact/page.tsx

# Create component files
echo "📄 Creating component files..."
touch src/components/Navigation.tsx
touch src/components/Footer.tsx
touch src/components/CookieBanner.tsx

# Create home components
touch src/components/home/HeroSection.tsx
touch src/components/home/HeroSectionAr.tsx
touch src/components/home/StatsSection.tsx
touch src/components/home/StatsSectionAr.tsx
touch src/components/home/FeaturedProjects.tsx
touch src/components/home/FeaturedProjectsAr.tsx
touch src/components/home/CertificationsCarousel.tsx
touch src/components/home/CertificationsCarouselAr.tsx
touch src/components/home/DevOpsAnimation.tsx
touch src/components/home/DevOpsAnimationAr.tsx

# Create API routes
echo "📄 Creating API routes..."
touch src/app/api/contact/route.ts
touch src/app/api/github/route.ts
touch src/app/api/sitemap/route.ts

# Create actions
echo "📄 Creating server actions..."
mkdir -p src/app/actions
touch src/app/actions/contact.ts

# Create lib files
echo "📄 Creating utility files..."
touch src/lib/structured-data.ts
touch src/lib/constants.ts
touch src/lib/metadata.ts

# Create public assets placeholders
echo "📄 Creating public asset placeholders..."
touch public/SalemAljebalyCV.pdf
touch public/og-image.png
touch public/og-image-ar.png
touch public/certifications/aws-sa-associate.png
touch public/certifications/aws-devops-pro.png
touch public/certifications/aws-sysops.png
touch public/certifications/aws-cloud-practitioner.png
touch public/certifications/github-actions.png

# Create config files if they don't exist
echo "📄 Creating config files..."
[ ! -f ".env.local" ] && touch .env.local
[ ! -f ".env.example" ] && cat > .env.example << 'EOF'
# Email configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=salem@docker.com.ly

# GitHub API
GITHUB_TOKEN=your-github-token

# Domain
NEXT_PUBLIC_DOMAIN=https://docker.com.ly
EOF

# Create robots.txt
cat > public/robots.txt << 'EOF'
User-agent: *
Allow: /
Sitemap: https://docker.com.ly/sitemap.xml
EOF

echo "✅ Project structure created successfully!"
echo ""
echo "Next steps:"
echo "1. Run 'npm install' to install dependencies"
echo "2. Run 'npx magicui-cli@latest init' to install MagicUI"
echo "3. Add MagicUI components as listed in the README"
echo "4. Add your content to the created files"
echo "5. Add Salem's CV and certification images to public folder"
echo ""
echo "Happy coding! 🎉"
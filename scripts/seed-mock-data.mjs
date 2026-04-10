import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding mock data...');

  // 1. Mock Case Study
  const caseStudy = await prisma.case_study.upsert({
    where: { id: 'mock-case-study-1' },
    update: {},
    create: {
      id: 'mock-case-study-1',
      title: 'Revolutionizing Mobile Banking',
      subtitle: 'A case study on user-centric design and performance optimization.',
      problem_statement: 'Users found the previous banking app slow and difficult to navigate, leading to a high churn rate.',
      description: 'We rebuilt the app from the ground up using Flutter, focusing on a clean UI and efficient state management.',
      solution: 'Implemented a modular architecture, integrated biometric authentication, and streamlined the transaction flow.',
      studyContent: 'Detailed breakdown of the development process, including wireframing, prototyping, and user testing phases.',
      conclusion: 'The new app saw a 40% increase in user retention and a 25% decrease in average transaction time.',
      images: [],
      is_public: true,
      category: 'FinTech',
      color: '#1E40AF',
      tech_stack: ['Flutter', 'Dart', 'Firebase'],
    },
  });
  console.log('Created mock case study:', caseStudy.title);

  // 2. Mock Projects
  const projectWithImages = await prisma.project.upsert({
    where: { id: 'project-with-images' },
    update: {},
    create: {
      id: 'project-with-images',
      title: 'EcoTrack',
      subtitle: 'Personal carbon footprint tracker',
      description: 'An app that helps users track and reduce their daily carbon emissions through smart suggestions.',
      isOngoing: false,
      techStack: ['React Native', 'Node.js', 'PostgreSQL'],
      images: [
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=400&fit=crop'
      ],
    },
  });
  console.log('Created project with images:', projectWithImages.title);

  const projectNoImages = await prisma.project.upsert({
    where: { id: 'project-no-images' },
    update: {},
    create: {
      id: 'project-no-images',
      title: 'SecurePass',
      subtitle: 'Local-first password manager',
      description: 'A highly secure, offline-first password manager built with security and privacy in mind.',
      isOngoing: true,
      techStack: ['Jetpack Compose', 'Kotlin', 'SQLDelight'],
      images: [],
    },
  });
  console.log('Created project without images:', projectNoImages.title);

  // 3. Mock Blog with Markdown
  const blogPost = await prisma.blog.upsert({
    where: { slug: 'exploring-the-future-of-mobile-dev' },
    update: {},
    create: {
      id: uuidv4(),
      blogTitle: 'Exploring the Future of Mobile Development',
      blogSubtitle: 'Why cross-platform frameworks are winning in 2024.',
      slug: 'exploring-the-future-of-mobile-dev',
      isPublic: true,
      blogText: `
# The Future is Here

Mobile development is evolving faster than ever. From the rise of **AI-driven interfaces** to the dominance of cross-platform frameworks like *Flutter* and *React Native*.

## Why Cross-Platform?

1.  **Code Reusability**: Write once, run anywhere.
2.  **Faster Time to Market**: Ship features simultaneously to iOS and Android.
3.  **Growing Ecosystem**: Vibrant communities and rich libraries.

### A Code Snippet

\`\`\`javascript
const greeting = "Hello, Mobile World!";
console.log(greeting);
\`\`\`

> "The best way to predict the future is to invent it." - Alan Kay

Check out this cool image:
![Developer working](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80)

Stay tuned for more updates!
      `,
      category: 'Technology',
      publishDate: new Date(),
    },
  });
  console.log('Created mock blog post:', blogPost.blogTitle);

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

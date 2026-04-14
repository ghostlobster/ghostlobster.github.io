import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { GitHubPreview } from '@/components/GitHubPreview';

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => ({
      slug: fileName.replace(/\.mdx$/, ''),
    }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const fullPath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { content, frontmatter } = await compileMDX<{ title: string, date: string }>({
    source: fileContents,
    components: { GitHubPreview },
    options: { parseFrontmatter: true }
  });

  return (
    <article className="max-w-3xl mx-auto py-8">
      <div className="mb-8 border-b-2 border-primary pb-4">
          <h1 className="text-3xl font-bold mb-2 title-text inline-block">{frontmatter.title}</h1>
          <div className="text-sm text-muted-foreground mt-2">TIMESTAMP: {frontmatter.date}</div>
      </div>
      <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-a:text-primary prose-a:font-bold hover:prose-a:underline prose-code:text-primary prose-code:bg-card prose-code:px-1 prose-code:py-0.5 prose-code:border-border prose-code:border">
        {content}
      </div>
      <div className="mt-12 pt-4 border-t border-border/50 text-sm">
          <a href="/" className="text-primary hover:underline flex items-center gap-2">
            <span>&lt;-</span> RETURN TO ROOT
          </a>
      </div>
    </article>
  );
}

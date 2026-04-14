import fs from 'fs';
import path from 'path';

export function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Basic frontmatter extraction (assuming standard format)
      const titleMatch = fileContents.match(/title:\s*["']?([^"'\n]+)["']?/);
      const dateMatch = fileContents.match(/date:\s*["']?([^"'\n]+)["']?/);
      const descriptionMatch = fileContents.match(/description:\s*["']?([^"'\n]+)["']?/);

      return {
        slug,
        title: titleMatch ? titleMatch[1] : slug,
        date: dateMatch ? dateMatch[1] : '',
        description: descriptionMatch ? descriptionMatch[1] : '',
      };
    })
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return posts;
}

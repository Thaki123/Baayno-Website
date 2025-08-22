import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  image?: string;
}

export interface PostData extends PostMeta {
  content: string;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const fileNames = await fs.readdir(postsDirectory);
  const posts: PostMeta[] = [];
  for (const fileName of fileNames) {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data } = matter(fileContents);
    posts.push({ slug, ...(data as Omit<PostMeta, 'slug'>) });
  }
  return posts;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const fileNames = await fs.readdir(postsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const htmlContent = await marked(content);
  return { slug, content: htmlContent, ...(data as Omit<PostData, 'slug' | 'content'>) };
}

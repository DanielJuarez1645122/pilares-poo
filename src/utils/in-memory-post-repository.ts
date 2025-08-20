import PostRepository from "./post-repository";
import { Post } from "./post";

export default class InMemoryPostRepository implements PostRepository {
  private posts: Array<{ id: string; post: Post }> = [];

  constructor() {
    this.posts = [];
  }

  public async save(post: Post): Promise<void> {
    const id = (Math.random() * 1000000).toFixed(0); 
    this.posts.push({ id, post });
  }

  public async getAll(): Promise<Post[]> {
    return this.posts.map(p => p.post);
  }

  public async update(id: string, updatedPost: Post): Promise<void> {
  const index = this.posts.findIndex(p => p.post.getEmail() === id);
  if (index === -1) throw new Error("Post not found");

  this.posts[index].post = updatedPost;
}
}

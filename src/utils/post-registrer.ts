import { Post } from "./post";
import PostRepository from "./post-repository";

export default class PostRegistrar {
  constructor(private repository: PostRepository) {}

  async register(post: Post): Promise<void> {
    await this.repository.save(post);
  }
}

import {Post} from "./post";

export default interface PostRepository {
  save(post: Post): Promise<void>;
  getAll(): Promise<Post[]>;
  update(id: string, post: Post): Promise<void>;
  delete(id: string): Promise<void>;
}

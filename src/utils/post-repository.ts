import {Post} from "./post";

export default interface PostRepository {
  save(post: Post): Promise<void>;
  getAll(): Promise<Post[]>;
}

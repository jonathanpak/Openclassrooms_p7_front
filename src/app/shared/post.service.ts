import { UserService } from './user.service';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[];

  constructor(private userService: UserService) {
    this.posts = [
      new Post(
        '001',
        '001',
        'This is my first post',
        this.userService.getUser(0),
        'Now'
      ),
      new Post(
        '002',
        '001',
        'This is my second post',
        this.userService.getUser(1),
        'Two hours ago'
      ),
    ];
  }

  getAllPosts() {
    return this.posts.slice();
  }

  getPostsByThreadId(id) {
    const posts = this.getAllPosts();

    const filteredPosts = posts.filter((post) => {
      return post.threadId === id;
    });

    return filteredPosts;
  }

  newPost(content: string, thread: string) {
    const newPost = new Post(
      '003',
      thread,
      content,
      new User(
        123,
        'Hiparque',
        'jon@hidid.ci',
        'President',
        'No Service',
        'fake'
      ),
      'now'
    );
    this.posts.push(newPost);
  }
}

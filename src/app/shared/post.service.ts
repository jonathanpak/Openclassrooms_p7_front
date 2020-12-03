import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[];
  private postsChanged = new Subject<any>();
  postChangedObservable = this.postsChanged.asObservable();

  constructor(private http: HttpClient) {}

  onPostsChanged() {
    this.postsChanged.next();
  }

  getAllPosts() {
    return this.http.get('http://localhost:3000/posts/');
  }

  getPostsByThreadId(threadId) {
    return this.http.get(
      'http://localhost:3000/threads/' + threadId + '/posts'
    );
  }

  getSinglePost(id: number) {
    return this.http.get('http://localhost:3000/posts/' + id + '/');
  }

  // newPost(content: string, thread: string) {
  //   const newPost = new Post(23, 'This is my third post', 28);
  //   this.posts.push(newPost);
  // }

  newPost(content: string, threadId: number) {
    const authorId = 23; // GET AUTHOR ID
    // const dateCreated = new Date().toISOString().slice(0, 10);

    const newPost = new Post(authorId, content, threadId);

    return this.http.post<Post>('http://localhost:3000/posts/', newPost);
  }

  deletePost(id: number) {
    return this.http.delete('http://localhost:3000/posts/' + id + '/');
  }

  updatePost(content: string, postId: number) {
    const updatedPost = {
      id: postId,
      content,
    };

    return this.http.put(
      'http://localhost:3000/posts/' + postId + '/',
      updatedPost
    );
  }
}

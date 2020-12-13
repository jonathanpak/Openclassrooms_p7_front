import { AuthService } from './auth.service';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private loggedInUserSubscription: Subscription;
  currentUserId: number;

  private posts: Post[];
  private postsChanged = new Subject<any>();
  postChangedObservable = this.postsChanged.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getUserId();
  }

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

  newPost(content: string, threadId: number) {
    const authorId = this.currentUserId;
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

  getUserId() {
    (this.loggedInUserSubscription = this.authService
      .getUserId()
      .subscribe((userId) => {
        this.currentUserId = userId.id;
      })),
      (err) => console.log(err),
      () => this.loggedInUserSubscription.unsubscribe();
  }

  updateLike(postId) {
    return this.http.put('http://localhost:3000/posts/likes/' + postId);
  }

  updateThreadLike(threadId) {
    return this.http.put('http://localhost:3000/threads/likes/' + threadId);
  }

  getLikes(postId) {
    return this.http.get('http://localhost:3000/posts/likes/' + postId);
  }

  getThreadLikes(postId) {
    return this.http.get('http://localhost:3000/threads/likes/' + postId);
  }
}

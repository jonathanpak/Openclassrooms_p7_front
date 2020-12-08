import { AuthService } from './../shared/auth.service';
import { TopicService } from './../forum/topic.service';
import { Thread } from './../forum/thread.model';
import { Post } from './../shared/post.model';
import { PostService } from './../shared/post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
})
export class NewsfeedComponent implements OnInit, OnDestroy {
  private postsSubscription: Subscription;
  private threadsSubscription: Subscription;
  private userSubscription: Subscription; // Reuse

  username: string;
  imageUrl: string;

  recentPosts: Post[];
  recentThreads: Thread[];
  mergedArray = [];

  constructor(
    private postService: PostService,
    private topicService: TopicService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.threadsSubscription = this.topicService.getAllThreads().subscribe(
      (threads: Thread[]) => {
        this.recentThreads = threads;
      },
      (error) => console.log(error),
      () => {
        this.recentThreads.forEach((value) => {
          const newValue = value;
          this.authService.getUserById(value.authorId).subscribe((user) => {
            newValue.username = user.username;
            newValue.imageUrl = user.imageUrl;
          });

          this.mergedArray.push(newValue);
        });
      }
    );

    this.postsSubscription = this.postService.getAllPosts().subscribe(
      (posts: Post[]) => {
        this.recentPosts = posts;
      },
      (error) => console.log(error),
      () => {
        this.recentPosts.forEach((value) => {
          const newValue = value;
          this.authService.getUserById(value.authorId).subscribe((user) => {
            newValue.username = user.username;
            newValue.imageUrl = user.imageUrl;
          });
          this.mergedArray.push(newValue);
        });
      }
    );
  }

  onThread(post) {
    this.router.navigate(['forum', 'subcategory', post.id]);
  }

  onPost(post) {
    this.router.navigate(['forum', 'subcategory', post.threadId]);
  }
  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.threadsSubscription.unsubscribe();
    // this.userSubscription.unsubscribe();
  }
}

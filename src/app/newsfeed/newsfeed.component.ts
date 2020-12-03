import { TopicService } from './../forum/topic.service';
import { Thread } from './../forum/thread.model';
import { Post } from './../shared/post.model';
import { PostService } from './../shared/post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
})
export class NewsfeedComponent implements OnInit, OnDestroy {
  private postsSubscription: Subscription;
  private threadsSubscription: Subscription;

  recentPosts: Post[];
  recentThreads: Thread[];
  mergedArray = [];

  constructor(
    private postService: PostService,
    private topicService: TopicService
  ) {}

  ngOnInit(): void {
    this.threadsSubscription = this.topicService.getAllThreads().subscribe(
      (threads: Thread[]) => {
        this.recentThreads = threads;
      },
      (error) => console.log(error),
      () => {
        this.recentThreads.forEach((value) => {
          this.mergedArray.push(value);
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
          this.mergedArray.push(value);
          console.log(this.mergedArray);
        });
      }
    );
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.threadsSubscription.unsubscribe();
  }
}

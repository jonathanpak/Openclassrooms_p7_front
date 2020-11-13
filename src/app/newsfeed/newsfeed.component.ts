import { TopicService } from './../forum/topic.service';
import { Thread } from './../forum/thread.model';
import { Post } from './../shared/post.model';
import { PostService } from './../shared/post.service';
import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
})
export class NewsfeedComponent implements OnInit {
  recentPosts: Post[];
  recentThreads: Thread[];
  mergedArray = [];

  constructor(
    private postService: PostService,
    private topicService: TopicService
  ) {}

  ngOnInit(): void {
    this.recentPosts = this.postService.getAllPosts();
    this.recentThreads = this.topicService.getAllThreads();

    this.recentPosts.forEach((value) => {
      this.mergedArray.push(value);
    });
    this.recentThreads.forEach((value) => {
      this.mergedArray.push(value);
    });

    console.log(this.mergedArray);
  }
}

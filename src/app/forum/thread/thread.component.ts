import { PostService } from './../../shared/post.service';
import { Post } from './../../shared/post.model';
import { Thread } from './../thread.model';
import { TopicService } from './../topic.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  // posts: Post[];
  posts: any;
  thread: Thread;
  id;
  answerMode = false;

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(
      (params) => (this.id = params.id)
    );

    this.thread = this.topicService.getThread(this.id);
    this.posts = this.postService.getPostsByThreadId(this.id);
  }

  onAnswer() {
    this.answerMode = true;
  }
  onCancel() {
    this.answerMode = false;
  }

  onSubmit(form: NgForm) {
    this.postService.newPost(form.value.content, this.id);
    this.posts = this.postService.getPostsByThreadId(this.id);
    this.answerMode = false;
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}

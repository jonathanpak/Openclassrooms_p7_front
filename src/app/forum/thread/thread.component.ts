import { PostService } from './../../shared/post.service';
import { Post } from './../../shared/post.model';
import { Thread } from './../thread.model';
import { TopicService } from './../topic.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit, OnDestroy {
  private threadSubscription: Subscription;
  private postsSubscription: Subscription;
  private newPostSubscription: Subscription;
  private paramsSub: Subscription;

  posts: Post[];
  thread: Thread;
  id;
  answerMode = false;
  editMode = false;
  isThreadAuthor = true;

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(
      (params) => (this.id = params.id)
    );

    this.threadSubscription = this.topicService
      .getThread(this.id)
      .subscribe((thread: Thread) => {
        this.thread = thread[0];
      });

    this.getPosts();
  }

  onAnswer() {
    this.answerMode = true;
  }
  onCancel() {
    this.answerMode = false;
  }

  // onSubmit(form: NgForm) {
  //   this.postService.newPost(form.value.content, this.id);
  //   this.getPosts();
  //   this.answerMode = false;
  // }

  onSubmit(form: NgForm) {
    this.newPostSubscription = this.postService
      .newPost(form.value.content, this.id)
      .subscribe((data) => {
        console.log('Post created');
        this.getPosts();
      });

    this.answerMode = false;
  }

  onEditThread() {
    this.editMode = true;
  }

  onCancelEditThread() {
    this.editMode = false;
  }

  onUpdateThread(form: NgForm) {
    this.threadSubscription = this.topicService
      .updateThread(form.value.title, form.value.content, this.id)
      .subscribe((data) => {
        console.log(data);
      });

    this.editMode = false;
  }
  onDeleteThread() {
    // threadSubscription already used : is it right ?
    this.threadSubscription = this.topicService
      .deleteThread(this.id)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigate(['forum', 'subcategory'], {
      queryParams: { category: this.thread.categoryId },
    });
  }

  getPosts() {
    this.postsSubscription = this.postService
      .getPostsByThreadId(this.id)
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.threadSubscription.unsubscribe();
    this.paramsSub.unsubscribe();
    this.postsSubscription.unsubscribe();
    this.newPostSubscription.unsubscribe();
  }
}

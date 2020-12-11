import { AuthService } from './../../shared/auth.service';
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
  private postsChangedSubscription: Subscription;
  private userSubscription: Subscription;
  private userIdSubscription: Subscription;

  posts: Post[];
  thread: Thread;
  id;
  answerMode = false;
  editMode = false;
  isThreadAuthor = false;

  username: string;
  imageUrl: string;

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private postService: PostService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(
      (params) => (this.id = params.id)
    );

    this.threadSubscription = this.topicService
      .getThread(this.id)
      .subscribe((thread: Thread) => {
        this.thread = thread[0];

        this.userSubscription = this.authService
          .getUserById(this.thread.authorId)
          .subscribe((user) => {
            this.username = user.username;
            this.imageUrl = user.imageUrl;
          });
      });

    this.userIdSubscription = this.authService.getUserId().subscribe((id) => {
      if (id.id === this.thread.authorId) {
        this.isThreadAuthor = true;
      }
    });

    this.getPosts();

    this.postsChangedSubscription = this.postService.postChangedObservable.subscribe(
      (data) => {
        this.getPosts();
      }
    );
  }

  onAnswer() {
    this.answerMode = true;
  }
  onCancel() {
    this.answerMode = false;
  }

  onSubmit(form: NgForm) {
    this.newPostSubscription = this.postService
      .newPost(form.value.content, this.id)
      .subscribe(
        (data) => {
          console.log('Post created');
          this.getPosts();
        },
        (error) => console.log(error),
        () => {
          this.answerMode = false;
          this.newPostSubscription.unsubscribe();
        }
      );
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
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => console.log(error),
        () => {
          this.editMode = false;
          this.threadSubscription.unsubscribe();
        }
      );
  }
  onDeleteThread() {
    this.threadSubscription = this.topicService.deleteThread(this.id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(console.error),
      () => {
        this.router.navigate(['forum', 'subcategory'], {
          queryParams: { category: this.thread.categoryId },
        });
        this.threadSubscription.unsubscribe();
      }
    );
  }

  getPosts() {
    this.postsSubscription = this.postService
      .getPostsByThreadId(this.id)
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        },
        (error) => console.log(error)
      );
  }

  ngOnDestroy() {
    this.threadSubscription.unsubscribe();
    this.paramsSub.unsubscribe();
    this.postsChangedSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.userIdSubscription.unsubscribe();
  }
}

import { AuthService } from './../../shared/auth.service';
import { Thread } from './../thread.model';
import { TopicService } from './../topic.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css'],
})
export class SubcategoryComponent implements OnInit, OnDestroy {
  private paramsSubscription: Subscription;
  private threadSubscription: Subscription;
  private topicSubscription: Subscription;
  category: number;
  threads: Thread[] = [];
  displayThreads = [];
  newThread = false;
  username: string;

  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.queryParams.subscribe((params) => {
      if (params['category']) {
        const category = params['category'];
        this.category = category;
      } else {
        this.router.navigate(['/forum']);
      }
    });

    this.getThreads();
  }

  onThread(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onNewThread() {
    this.newThread = true;
  }

  onCancel() {
    this.newThread = false;
  }

  onSubmit(form: NgForm) {
    this.topicSubscription = this.topicService
      .newThread(form.value.title, form.value.content, this.category)
      .subscribe(
        () => {
          this.getThreads();
        },
        (err) => console.error(err),
        () => this.topicSubscription.unsubscribe()
      );

    this.newThread = false;
  }

  getThreads() {
    this.threadSubscription = this.topicService
      .getThreads(this.category)
      .subscribe(
        (threads: Thread[]) => {
          this.threads = threads;
        },
        (err) => console.log(err),
        () => {
          for (let thread of this.threads) {
            this.authService.getUserById(thread.authorId).subscribe((user) => {
              thread.username = user.username;
            });
          }
        }
      );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.threadSubscription.unsubscribe();
  }
}

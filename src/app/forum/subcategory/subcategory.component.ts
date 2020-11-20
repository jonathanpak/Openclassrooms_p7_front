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
  newThread = false;

  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.queryParams.subscribe((params) => {
      const category = params['category'];
      this.category = category;
    });

    this.threadSubscription = this.topicService
      .getThreads(this.category)
      .subscribe((threads: Thread[]) => {
        this.threads = threads;
      });
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
      .subscribe((data) => {
        console.log(data);
      });

    this.threadSubscription = this.topicService
      .getThreads(this.category)
      .subscribe((threads: Thread[]) => {
        console.log(threads);
        this.threads = threads;
      });
    this.newThread = false;
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.threadSubscription.unsubscribe();
    this.topicSubscription.unsubscribe();
  }
}

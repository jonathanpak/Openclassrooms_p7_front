import { Subscription } from 'rxjs';
import { Topic } from './topic.model';
import { TopicService } from './topic.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit, OnDestroy {
  private topicSubscription: Subscription;
  topics: Topic[];

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.topicSubscription = this.topicService
      .getTopics()
      .subscribe((topics) => {
        this.topics = topics;
      });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }
}

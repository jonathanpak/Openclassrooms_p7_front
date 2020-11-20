import { Thread } from './thread.model';
import { Topic } from './topic.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  //private topics: Topic[] = [];

  private threads: Thread[] = [];

  private threadsUrl = 'http://localhost:3000/threads/';

  constructor(private http: HttpClient) {}

  getTopics() {
    return this.http.get('http://localhost:3000/categories').pipe(
      map((topics: any) => {
        const topicsArray: Topic[] = [];
        // Create main categories
        for (const topic of topics) {
          if (topic.parent_id == 0) {
            topicsArray.push(new Topic(topic.category, [], topic.id));
          }
        }
        // Add subcategories to main categories
        for (const topic of topics) {
          const topicObject = { name: topic.category, id: topic.id };
          if (topic.parent_id !== 0) {
            const parentCategory = topicsArray.find(
              (parent) => parent.topic.id == topic.parent_id
            );
            parentCategory.topic.subCategories.push(topicObject);
          }
        }
        return topicsArray;
      })
    );
  }

  getAllThreads() {
    return this.threads.slice();
  }

  getThreads(subCategory: number) {
    return this.http.get('http://localhost:3000/threads/' + subCategory + '/');
  }

  getThread(id: number) {
    return this.http.get('http://localhost:3000/threads/single/' + id + '/');
  }

  deleteThread(id: number) {
    return this.http.delete('http://localhost:3000/threads/single/' + id + '/');
  }

  newThread(title: string, content: string, categoryId: number) {
    const authorId = 23; // GET AUTHOR ID
    const dateCreated = new Date().toISOString().slice(0, 10);

    const newThread = new Thread(
      authorId,
      title,
      content,
      dateCreated,
      categoryId
    );

    return this.http.post<Thread>(this.threadsUrl, newThread);
  }

  updateThread(title: string, content: string, threadId: number) {
    const updatedThread = {
      id: threadId,
      title,
      content,
    };

    return this.http.put(
      'http://localhost:3000/threads/single/' + threadId + '/',
      updatedThread
    );
  }
}

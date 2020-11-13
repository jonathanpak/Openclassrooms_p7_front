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
  private topics: Topic[] = [];

  // private topics: Topic[] = [
  //   new Topic(
  //     'Espace Professionnel',
  //     ['Ressources humaines', 'Comunication & Marketing', 'Informatique'],
  //     1
  //   ),
  //   new Topic('Espace Détente', ['Présentations', 'Afterwork'], 2),
  // ];

  private threads: Thread[] = [
    new Thread('Something fancy', 'Nothing new around here', 11, 5),
    new Thread('Something even fancier', 'Still nothings', 12, 5),
    new Thread('Something quiet', 'Calm it baby', 13, 7),
  ];

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
    // Filter WHERE subcategory = SubCategory
    return this.threads.slice();
  }

  getThread(id: number) {
    //return this.threads[id];
    // Filter WHERE ID = id
    return this.threads[0];
  }

  newThread(title: string, content: string, subcategory: number) {
    const newThread = new Thread(title, content, 14, subcategory);
    this.threads.push(newThread);
  }
}

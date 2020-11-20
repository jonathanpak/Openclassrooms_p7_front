import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PostService } from './../../shared/post.service';
import { Post } from './../../shared/post.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit, OnDestroy {
  @Input() post: Post;

  postSubscription: Subscription;
  isPostAuthor = true;
  editMode = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  onEditPost() {
    this.editMode = true;
  }

  onCancelEditPost() {
    this.editMode = false;
  }

  onUpdatePost(form: NgForm) {
    this.postSubscription = this.postService
      .updatePost(form.value.content, this.post.id)
      .subscribe((data) => {
        console.log(data);
      });

    this.editMode = false;
    this.postSubscription.unsubscribe();
  }

  onDeletePost() {
    this.postSubscription = this.postService
      .deletePost(this.post.id)
      .subscribe((response) => {
        console.log(response);
      });

    // Retrieve new list of posts
  }

  ngOnDestroy() {}
}

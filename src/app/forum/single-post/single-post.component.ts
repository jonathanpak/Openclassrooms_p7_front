import { AuthService } from './../../shared/auth.service';
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

  private userSubscription: Subscription;
  private userIdSubscription: Subscription;
  private postSubscription: Subscription;
  private likeSubscription: Subscription;

  isPostAuthor = false;
  editMode = false;
  userLikesPost = false;

  currentUserId: number;
  username: string;
  imageUrl: string;
  likesAmount: number;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService
      .getUserById(this.post.authorId)
      .subscribe((user) => {
        this.username = user.username;
        this.imageUrl = user.imageUrl;
      });

    this.userIdSubscription = this.authService.getUserId().subscribe(
      (id) => {
        if (id.id === this.post.authorId) {
          this.isPostAuthor = true;
          this.currentUserId = id.id;
        }
      },
      (err) => console.log(err),
      () => {
        this.likeSubscription = this.postService
          .getLikes(this.post.id)
          .subscribe((data) => {
            const likesString = data[0].usersLike;
            let likeArray = likesString.split(',').map((x) => +x);
            this.likesAmount = likeArray.length - 1;
            if (likeArray.includes(this.currentUserId)) {
              this.userLikesPost = true;
            }
          });
      }
    );
  }

  onEditPost() {
    this.editMode = true;
  }

  onCancelEditPost() {
    this.editMode = false;
  }

  onUpdatePost(form: NgForm) {
    this.postSubscription = this.postService
      .updatePost(form.value.content, this.post.id)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => console.log(error),
        () => {
          this.editMode = false;
          this.postService.onPostsChanged();
          this.postSubscription.unsubscribe();
        }
      );
  }

  onDeletePost() {
    this.postSubscription = this.postService.deletePost(this.post.id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error),
      () => {
        this.postService.onPostsChanged();
        this.postSubscription.unsubscribe();
      }
    );
  }

  onLike() {
    console.log('Hello like');
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.userIdSubscription.unsubscribe();
    this.likeSubscription.unsubscribe();
  }
}

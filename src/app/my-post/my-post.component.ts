import { Component, OnInit } from '@angular/core';
import {PostsService} from '../shared/posts.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {
  allDonaton: any;
  allGroupData = [];
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    this.postsService.fetchPosts().subscribe(data => {
      this.allDonaton = data.filter( (myData) => {
        return myData.userId === userData.id;
      }).map((myData) => {
        return myData;
      });
    });
    this.postsService.fetchBloodGroupPosts().subscribe(data => {
      this.allGroupData = data.filter( (myData) => {
        return myData.userId === userData.id;
      }).map((myData) => {
        return myData;
      });
    });
  }

  onDonationDelete(id) {
    this.postsService.deletePosts(id).subscribe(response => {
      this.allDonaton = this.allDonaton.filter( (myData) => {
        return myData.id !== id;
      }).map((myData) => {
        return myData;
      });
    });
  }

  onBloodDonationDelete(id) {
    this.postsService.deleteBllodGroupPosts(id).subscribe(response => {
      this.allGroupData = this.allGroupData.filter( (myData) => {
        return myData.id !== id;
      }).map((myData) => {
        return myData;
      });
    });
  }

}

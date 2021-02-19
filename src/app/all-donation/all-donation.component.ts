import { Component, OnInit } from '@angular/core';
import {PostsService} from "../shared/posts.service";

@Component({
  selector: 'app-all-donation',
  templateUrl: './all-donation.component.html',
  styleUrls: ['./all-donation.component.css']
})
export class AllDonationComponent implements OnInit {
  allDonaton: any;
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.fetchPosts().subscribe(data => {
      this.allDonaton = data;
    });
  }

}

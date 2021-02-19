import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostsService} from "../shared/posts.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-blood-group',
  templateUrl: './blood-group.component.html',
  styleUrls: ['./blood-group.component.css']
})
export class BloodGroupComponent implements OnInit {
  allGroupData = [];
  @ViewChild('postForm', { static: false }) donationForm: NgForm;
  constructor(private http: HttpClient, private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.fetchBloodGroupPosts().subscribe(fetchResponse => {
      this.allGroupData = fetchResponse;
    });
  }
  onFindBlood(bloodData: any){
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    this.postsService.onCreateBloodGroupPost(
      bloodData.blood_group,
      bloodData.contactNumber,
      bloodData.contact_name,
      bloodData.hospital_name,
      bloodData.details,
      userData.id).subscribe(response => {
      this.donationForm.reset();
        this.postsService.fetchBloodGroupPosts().subscribe(fetchResponse => {
          this.allGroupData = fetchResponse;
        });
    });
  }

}

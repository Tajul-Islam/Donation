import {Component, OnInit, ViewChild} from '@angular/core';
import {Post} from '../shared/post.model';
import {HttpClient} from '@angular/common/http';
import {PostsService} from '../shared/posts.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-post-donation',
  templateUrl: './post-donation.component.html',
  styleUrls: ['./post-donation.component.css']
})
export class PostDonationComponent implements OnInit {
  donationFileImage: any;
  @ViewChild('postForm', { static: false }) donationForm: NgForm;
  constructor(private http: HttpClient,
              private postsService: PostsService,
              private route: Router) { }

  ngOnInit(): void {
  }
  convertToBase64(event){
    const imageFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent) => {
      const srcData = fileLoadedEvent.target.result;
      this.donationFileImage = srcData;
    };
    fileReader.readAsDataURL(imageFile);
  }

  onCreatePost(postData: Post) {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    this.postsService.createAndStorePost(
      postData.title,
      postData.donationDetails,
      postData.phoneNumber,
      postData.pickup_address,
      this.donationFileImage,
      userData.id)
      .subscribe(
        responseData => {
          // alert('Successfully Upload');
          this.route.navigate(['/home']);
          this.donationForm.reset();
        },
        error => {
        }
      );
  }

}

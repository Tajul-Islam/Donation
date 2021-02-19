import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(
    donationTitle: string,
    details: string,
    ownerPhoneNumber: string,
    pickupAddress: string,
    pic: string,
    userId: any) {
    const postData: Post = {
      title: donationTitle,
      donationDetails: details,
      phoneNumber: ownerPhoneNumber,
      pickup_address: pickupAddress,
      donationPic: pic,
      userId: userId
    };
    return this.http
      .post<{ name: string }>(
        'https://donation-1d124-default-rtdb.firebaseio.com/donation.json',
        postData,
        {
          observe: 'response'
        }
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://donation-1d124-default-rtdb.firebaseio.com/donation.json'
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  deletePosts(id) {
    return this.http
      .delete('https://donation-1d124-default-rtdb.firebaseio.com/donation/' + id + '.json', {
        observe: 'events',
        responseType: 'text'
      })
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
          }
        })
      );
  }

  deleteBllodGroupPosts(id) {
    return this.http
      .delete('https://donation-1d124-default-rtdb.firebaseio.com/bloodGroup/' + id + '.json', {
        observe: 'events',
        responseType: 'text'
      })
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
          }
        })
      );
  }

  onCreateBloodGroupPost(
    bloodGroup,
    contactNumber,
    contactName,
    hospitalName,
    details: string,
    userId: any) {
    const bloodInfo = {
      bloodGroup: bloodGroup,
      contactNumber: contactNumber,
      contactName: contactName,
      hospitalName: hospitalName,
      details: details,
      userId: userId
    };
    return this.http
      .post<{ name: string }>(
        'https://donation-1d124-default-rtdb.firebaseio.com/bloodGroup.json',
        bloodInfo,
        {
          observe: 'response'
        }
      );
  }

  fetchBloodGroupPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://donation-1d124-default-rtdb.firebaseio.com/bloodGroup.json'
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Repo } from 'src/models/repo.model';
import { User } from 'src/models/user.model';
import { PaginationComponent } from '../pagination/pagination.component';
import { ReposListComponent } from '../repoList/repoList.component';
import { ApiService } from '../services/api.service';
import { SkeletonUserCardComponent } from '../skeleton-user-card/skeleton-user-card.component';
import { UserCardComponent } from '../userCard/userCard.component';
import { UserFormComponent } from '../userForm/userForm.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    UserFormComponent,
    ReposListComponent,
    FormsModule,
    UserCardComponent,
    PaginationComponent,
    SkeletonUserCardComponent,
  ],
  templateUrl: './userProfile.component.html',
})
export class UserProfileComponent {
  username: string = '';
  user!: User;
  repos: Repo[] = [];
  error: any;
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10;
  totalPagesArray: number[] = [];
  itemsPerPage: number = 10;
  isLoading: boolean = false;
  isProfileLoading: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  getUserProfile(username: string) {
    this.isProfileLoading = true;
    this.username = username;
    this.apiService.getUser(this.username).subscribe({
      next: (user) => {
        this.error = '';
        this.user = user;
        const totalRepos = user.publicRepos;
        this.totalPages = Math.ceil(totalRepos / this.perPage);
        this.totalPagesArray = Array.from(
          { length: this.totalPages },
          (_, i) => i + 1
        );
        this.getUserRepos();
        this.isProfileLoading = false;
      },
      error: (error) => {
        this.error = 'Can Not Find Any User With Given UserName.';
        this.isProfileLoading = false;
      },
    });
  }

  getUserRepos() {
    if (!this.user) {
      return;
    }
    this.isLoading = true;
    this.apiService
      .getRepos(this.username, this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (repos) => {
          this.repos = repos;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Error fetching user profile';
          console.log('error'); // Log the error for debugging
          this.isProfileLoading = false;
        },
      });
  }

  changePage(pageNum: number | string) {
    if (pageNum === '...') {
      return;
    }
    if (typeof pageNum === 'number') {
      this.currentPage = pageNum;
      this.getUserRepos();
    }
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.getUserRepos();
  }
}
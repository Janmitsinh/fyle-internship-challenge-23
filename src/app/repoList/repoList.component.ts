import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Repo } from 'src/models/repo.model';
import { RepoCardComponent } from '../card/card.component';
import { SkeletonRepoCardComponent } from '../skeleton-repo-card/skeleton-repo-card.component';

@Component({
  selector: 'app-repos-list',
  standalone: true,
  imports: [CommonModule, RepoCardComponent, SkeletonRepoCardComponent],
  templateUrl: './repoList.component.html',
})
export class ReposListComponent implements OnInit {
  @Input() repos: Repo[] = [];
  @Input() isLoading: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
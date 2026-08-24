import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-class-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section data-testid="class-detail-page">
      <h1>Character class details</h1>
      <p>
        Route identifier:
        <strong data-testid="class-id">{{ classId }}</strong>
      </p>

      <a routerLink="/classes">Return to classes</a>
    </section>
  `
})
export class ClassDetailComponent {
  public classId = '';

  constructor(private readonly route: ActivatedRoute) {
    this.classId = this.route.snapshot.paramMap.get('id') ?? '';
  }
}

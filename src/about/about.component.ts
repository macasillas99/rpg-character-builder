import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section>
      <h1 data-testid="about-title">{{ title }}</h1>
      <p>
        This application demonstrates routed Angular components, typed domain
        data, forms, services, and application state.
      </p>
    </section>
  `
})
export class AboutComponent {
  public title = '';

  constructor(private readonly route: ActivatedRoute) {
    this.title = this.route.snapshot.data['title'] ?? '';
  }
}

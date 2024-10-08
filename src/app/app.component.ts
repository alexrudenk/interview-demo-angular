import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SurveyFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'interview-project';
}

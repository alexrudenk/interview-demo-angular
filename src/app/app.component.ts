import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SurveyFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'interview-project';
}

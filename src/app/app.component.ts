import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'items-showcase';
}

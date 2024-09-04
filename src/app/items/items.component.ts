import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  // Import FormsModule


@Component({
  selector: 'app-items',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  httpClient = inject(HttpClient);
  public data: Array<any> = [];
  public filteredData: Array<any> = [];

  ngOnInit() {
    this.loadItems();  // Initial load of items
  }
   
  loadItems(filter: string = '') {
    let apiUrl = 'http://localhost:5000/getallitems';

    if (filter) {
      apiUrl = `http://localhost:5000/getitemsbyavailability?Availability=${filter}`;
    }

    this.httpClient.get(apiUrl)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.data = data;
          this.filteredData = data;  // Update filteredData with the fetched data
        }, 
        error: (err) => console.log(err)
      })
  }


  onToggleChange(event: Event, item: any) {
    const checkbox = event.target as HTMLInputElement;
    const updatedAvailability = checkbox.checked;

    // Prepare the request body
    const requestBody = {
      id: item._id,
      Availability: updatedAvailability
    };
    console.log(requestBody);
    
    // Send the PUT request
    this.httpClient.put('http://localhost:5000/updateAvailability', requestBody)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          console.log(typeof(response));

          console.log('Update successful', response);
          // Update the local data to reflect changes
          item.Availability = updatedAvailability;
          console.log(item);
        },
        error: (error) => {
          alert("Update failed");
          console.error('Update failed', error);
          // Optionally, revert the checkbox if the update fails
          checkbox.checked = !updatedAvailability;
        }
      });
  }

  
  onFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const filterValue = selectElement.value;

    this.loadItems(filterValue);
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:5000/importUser', formData).subscribe({
      next: (res: any) => {
        alert('File uploaded successfully!');
        this.fetchEmployees(); // Refresh data
      },
      error: (err) => {
        alert('Upload failed: ' + err.error?.message || err.message);
        console.error(err);
      }
    });
  }

  fetchEmployees(): void {
    this.http.get<any[]>('http://localhost:5000/users').subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error fetching employee data:', err);
      }
    });
  }
}


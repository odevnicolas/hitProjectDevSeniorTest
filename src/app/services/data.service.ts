import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResponse {
  status: string;
  data: {
    title: string;
    text: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://hitdigital.com.br/test.php';

  constructor(private http: HttpClient) {}

  getData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
}

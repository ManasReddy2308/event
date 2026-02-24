import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private api = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<any> {
  return this.http.get<any>(`${this.api}/${userId}`);
}
  updatePassword(data: any) {
    return this.http.put(`${this.api}/update-password`, data);
  }
}

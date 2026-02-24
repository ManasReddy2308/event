import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private api = `${environment.apiUrl}/registrations`;

  constructor(private http: HttpClient) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  registerEvent(data: any) {
    return this.http.post(this.api, data, this.headers());
  }

  getRegisteredEvents(userId: number): Observable<any[]> {
    return this.http.get<any>(`${this.api}/${userId}`, this.headers()).pipe(
      map((res: any) => {
        if (!res) return [];
        if (Array.isArray(res)) return res;
        if (res.$values) return res.$values;
        return [];
      })
    );
  }
}

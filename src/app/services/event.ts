import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  private api = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient, private zone: NgZone) {}

  private authHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  getEvents(): Observable<any[]> {
    return new Observable(observer => {
      this.http.get<any[]>(this.api).subscribe({
        next: (data) => {
          // 🔥 FORCE UI UPDATE ZONE
          this.zone.run(() => {
            observer.next(data);
            observer.complete();
          });
        },
        error: (err) => observer.error(err)
      });
    });
  }

  createEvent(data: any) {
    return this.http.post(this.api, data, this.authHeaders());
  }

  deleteEvent(id: number) {
    return this.http.delete(`${this.api}/${id}`, this.authHeaders());
  }
}

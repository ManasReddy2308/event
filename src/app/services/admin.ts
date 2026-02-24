import { HttpClient } from "@angular/common/http";
import { environment
 } from "../../environments/environment";
 import { Injectable } from "@angular/core";
 import { HttpHeaders } from "@angular/common/http";
@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  getUsers() {
    return this.http.get<any[]>(`${this.api}/users`, this.headers());
  }

  toggleBlock(id: number) {
    return this.http.put(`${this.api}/users/block/${id}`, {}, this.headers());
  }
  getStats() {
    return this.http.get<any>(`${this.api}/stats`, this.headers());
  }
}

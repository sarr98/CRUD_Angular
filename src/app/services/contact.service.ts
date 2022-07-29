import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IContact} from "../models/IContact";
import {catchError, Observable, throwError} from "rxjs";
import {IGroupe} from "../models/IGroupe";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private serverUrl: string = 'http://localhost:9000'; //json server url

  constructor(private httpClient: HttpClient) {
  }

  //Get All Contacts
  public getAllContacts(): Observable<IContact[]> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

  //GET Single Contact
  getContact(contactId: string): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
  }

  //Create Contact
  public createContact(contact: IContact): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL, contact).pipe(catchError(this.handleError));
  }

  //Update Contact
  public updateContact(contact: IContact, contactId: string): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataURL, contact).pipe(catchError(this.handleError));
  }

  //Delete Contact
  public deleteContact(contactId: string): Observable<{}> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));
  }

  //Get All Group
  public getAllGroups(): Observable<IGroupe[]> {
    let dataURL: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroupe[]>(dataURL).pipe(catchError(this.handleError));
  }

  //GET Single Group
  getGroup(contact: IContact): Observable<IGroupe> {
    let dataURL: string = `${this.serverUrl}/groups/${contact.groupeId}`;
    return this.httpClient.get<IGroupe>(dataURL).pipe(catchError(this.handleError));
  }

  //Error handling
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      //client error
      errorMessage = `Error : ${error.error.message}`;
    } else {
      //server error
      errorMessage = `Status : ${error.status} \n Message : ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

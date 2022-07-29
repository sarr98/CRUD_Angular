import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContactService} from "../../services/contact.service";
import {IContact} from "../../models/IContact";
import {IGroupe} from "../../models/IGroupe";

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public contactId: string | null = null;
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public group: IGroupe = {} as IGroupe;

  constructor(private activeRoute: ActivatedRoute, private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe((data) => {
        this.contact = data;
        this.loading = false;
        this.contactService.getGroup(data).subscribe((data) => {
          this.group = data;
        });
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }

  public isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }
}

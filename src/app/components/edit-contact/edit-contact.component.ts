import {Component, OnInit} from '@angular/core';
import {IContact} from "../../models/IContact";
import {IGroupe} from "../../models/IGroupe";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public contactId: string | null = null;
  public errorMessage: string | null = null;
  public groups: IGroupe[] = [] as IGroupe[];


  constructor(private activeRoute: ActivatedRoute, private contactService: ContactService, private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.activeRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe((data) => {
        this.contact = data;
        this.loading = false;
        this.contactService.getAllGroups().subscribe((data) => {
          this.groups = data;
        });
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }

  public submitUpadte() {
    if (this.contactId) {
      this.contactService.updateContact(this.contact, this.contactId).subscribe((data) => {
        this.router.navigate(['/']).then();
      }, (error) => {
        this.errorMessage = error;
        this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
      });
    }
  }

}

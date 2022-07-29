import {Component, OnInit} from '@angular/core';
import {IContact} from "../../models/IContact";
import {IGroupe} from "../../models/IGroupe";
import {ContactService} from "../../services/contact.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroupe[] = [] as IGroupe[];

  constructor(private contactService: ContactService, private router: Router) {
  }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data) => {
      this.groups = data;
    }, (error) => {
      this.errorMessage = error;
    });
  }

  public createSubmit() {
    this.contactService.createContact(this.contact).subscribe((data) => {
      this.router.navigate(['/']).then();
    }, (error) => {
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();
    });
  }

}

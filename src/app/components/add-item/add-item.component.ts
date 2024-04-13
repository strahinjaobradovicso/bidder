import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { ProfileComponent } from '../profile/profile.component';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule, ProfileComponent, NgStyle],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {


  files: File[] = [];

  addItemForm = new FormGroup({
    title: new FormControl(null, 
      [Validators.required]
    ),
    price: new FormControl(null,
      [Validators.required]
    ),
    description: new FormControl(null)
  });

  constructor(private itemService: ItemService, private router: Router){}

  onSubmit(){
    if(this.addItemForm.valid){
      const title = this.addItemForm.value.title!;
      const price = this.addItemForm.value.price!;
      const description = this.addItemForm.value.description;

      const item = {
        title: title,
        price: price,
        description: description,
        images: this.files
      }

      this.itemService.create(item).subscribe({
        error: (e) => {
          console.log(e);
        },
        next: (v) => {
          this.router.navigate(['/profile/store'])
        }
      })
    }
  }

  onFileChange(event: any){
    this.files.push(event.target.files[0]);
  }

}

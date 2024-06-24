import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileComponent } from '../../../profile/components/profile/profile.component';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { environment } from '../../../../environments/environment';
import { CreateItem } from '../../types/itemCreate.interface';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule, ProfileComponent, NgStyle, ErrorComponent],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {

  error: Error | null = null;
  
  titleMinLength = environment.MODEL_CONSTRAINTS.ITEM_TITLE_MIN_LENGTH;
  titleMaxLength = environment.MODEL_CONSTRAINTS.ITEM_TITLE_MAX_LENGTH;

  files: File[] = [];


  addItemForm = new FormGroup({
    title: new FormControl(null, 
      [Validators.required, Validators.minLength(this.titleMinLength), Validators.maxLength(this.titleMaxLength)]
    ),
    price: new FormControl(null,
      [Validators.required, Validators.min(0)]
    ),
    description: new FormControl(null)
  });

  constructor(private itemService: ItemService, private router: Router){}

  onSubmit(){
    this.error = null;
    if(this.addItemForm.valid){
      const title = this.addItemForm.value.title;
      const price = this.addItemForm.value.price;
      const description = this.addItemForm.value.description || '';

      if(!title || price == null){
        this.error = new Error('required values are missing');
        return;
      }

      const item: CreateItem = {
        title: title,
        price: price,
        description: description,
        images: this.files
      }

      this.itemService.create(item).subscribe({
        error: (e) => {
          this.error = e;
        },
        complete: () => {
          this.router.navigate(['/profile'])
        }
      })
    }
  }

  onFileChange(event: any){
    this.files.push(event.target.files[0]);
  }

}

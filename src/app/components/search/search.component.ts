import { Component, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  activeTerm: string | null = null;
  termChange = output<string>();

  searchForm = this.formBuilder.group({
    term:''
  })

  constructor(private formBuilder: FormBuilder){}

  onTermSubmit(): void {
    const inputTerm = this.searchForm.value.term;
    if(inputTerm){
      this.activeTerm = inputTerm;
      this.termChange.emit(inputTerm);
    }
  }

  onTermClear(){
    this.activeTerm = null;
    this.termChange.emit('');
  }

}

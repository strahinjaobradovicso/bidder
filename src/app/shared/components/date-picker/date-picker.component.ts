import { NgStyle } from '@angular/common';
import { Component, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {

  days?: Date[];
  date = new Date();
  dateInFocus = new Date();
  dateSelected = output<Date>();

  constructor(){
    this.date = new Date();
    this.days = this.getCalendarDays();
  }

  previousMonth(){
    this.date.setMonth(this.date.getMonth() - 1);
    this.days = this.getCalendarDays();
  }

  nextMonth(){
    this.date.setMonth(this.date.getMonth() + 1);
    this.days = this.getCalendarDays();
  }

  getCalendarDays(): Date[] { 
    const days: Date[] = [];

    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const firstDay = new Date(year, month, 1);

    const firstDayIndex: number = firstDay.getDay() - 1;

    if(firstDayIndex != 0){
      const weekStart = new Date(firstDay);
      weekStart.setDate(firstDay.getDate() - firstDayIndex);
      days.push(weekStart);

      const prevMonthDays = firstDay.getDay() - weekStart.getDay();
      for(let d = 1; d < prevMonthDays; d++){
        let day = new Date(weekStart);
        day.setDate(day.getDate() + d);
        days.push(day);
      }
    }

    let remainder = 42 - days.length;
    for (let d = 0; d < remainder; d++) {
      let day = new Date(firstDay);
      day.setDate(day.getDate() + d);
      days.push(day);      
    }

    return days;
  }

  selectDate(day: Date){
    this.dateInFocus = day;
    this.dateSelected.emit(day);
  }
  
  styleDate(date: Date): Object {
    let border = 'none';

    if(this.isDateSelected(date)){
      border = 'blue dashed';
    }

    if(this.isToday(date)){
      border = 'blue solid';
    }

    return {
      border: border,
      color: date.getMonth() != this.date.getMonth() ? 'grey': 'black'
    }
  }

  isDateSelected(date: Date): boolean {
    return date.getFullYear() === this.dateInFocus.getFullYear()
      && date.getMonth() === this.dateInFocus.getMonth()
      && date.getDate() === this.dateInFocus.getDate()
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getFullYear() === today.getFullYear()
      && date.getMonth() === today.getMonth()
      && date.getDate() === today.getDate()
  }

}

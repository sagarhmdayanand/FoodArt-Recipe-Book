import { Component, EventEmitter, Input, Output } from "@angular/core";
@Component({
  selector:'alert-app',
  templateUrl:'./alert.component.html',
  styleUrls:['./alert.component.css']
})
export class alertComponent{
   @Input() message!:string;
   @Output() close=new EventEmitter<void>();

   onClose(){
      this.close.emit();
   }
}
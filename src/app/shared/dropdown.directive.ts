import {Directive,HostListener,HostBinding} from '@angular/core';

@Directive({
   selector:'[appDropdown]'
})
export class dropDownComp{
   @HostBinding('class.open') isOpen=false;  

   @HostListener('click') handleClick(){
      this.isOpen=!this.isOpen;
   }
}  
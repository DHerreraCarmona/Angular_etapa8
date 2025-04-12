import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { ProductComponent } from "../../../products/components/product/product.component";

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required:true}) duration:  number = 0;
  @Input({required:true}) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor(){
    // no async methods
    //before rendered
    console.log('contructor')
    console.log('-'.repeat(10))
  }

  ngOnChanges(changes: SimpleChanges){
    //bedore and during render
    console.log('ngOnchanges')
    console.log('-'.repeat(10))
    console.log(changes)
    if(changes['duration']){  //detect if duration changed
      this.doSomething();
    }
  }

  ngOnInit(){
    //after render, just once
    //async, then, subs
    console.log('onInit');
    console.log('-'.repeat(10))
    console.log('duration=',this.duration);
    console.log('message=',this.message); 
    this.counterRef =  window.setInterval(()=>{ //save counter ref
      this.counter.update(statePrev => statePrev + 1);
    },1000)   
  }

  ngAfterViewInit(){
    // after childrem render 
    console.log('afterViewInit');
    console.log('-'.repeat(10))
  }

  ngOnDestroy(){
    //on destroy
    //usefull to aoid memory leaks
    console.log('Destroy');
    console.log('-'.repeat(10))
    window.clearInterval(this.counterRef) //clear counter
  }

  doSomething(){
    console.log('change duration')
  }  
}

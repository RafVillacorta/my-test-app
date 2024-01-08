import { Component } from '@angular/core';

@Component({
  selector: 'app-tap-counter',
  templateUrl: './tap-counter.component.html',
  styleUrls: ['./tap-counter.component.css']
})
export class TapCounterComponent {
  tapCount = 0

  handleClick() {
    this.tapCount += 1
  }

}


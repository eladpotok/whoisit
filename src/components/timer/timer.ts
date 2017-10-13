import { Component } from '@angular/core';

/**
 * Generated class for the TimerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var lapsNr = 1;


function format(ms) {
    var minutes = Math.floor(ms / (1000 * 60)),
        seconds = Math.floor((ms - minutes * 1000 * 60) / 1000),
        fract = Math.floor((ms - minutes * 1000 * 60 - seconds * 1000) / 10);

    return minutes + 'm ' + (seconds < 10 ? '0' : '') + seconds + 's.' + (fract < 10 ? '0' : '') + fract;
}


@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent {

    timer: number;
    timerSettings: any = {
        theme: 'ios',
        display: 'bottom',
        step: 0.01,
        mode: 'stopwatch',
        onReset: function () {
            document.getElementById('laps').innerHTML = "";
            lapsNr = 1;
        },
        onLap: function (event, inst) {
            var cont = document.getElementById('laps'),
                temp = document.createElement('tr');

            temp.innerHTML = '<td>#' + lapsNr + '</td><td> - ' + format(event.lap) + ' - </td><td>' + format(event.ellapsed) + '</td>';
            cont.appendChild(temp);

            lapsNr++;
        }
    };

  constructor() {
    console.log('Hello TimerComponent Component');
  }

}

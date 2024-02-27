import { animate, stagger, state, style, transition, trigger } from '@angular/animations';

export let dropdown = trigger('dropdown', [
    transition(':enter', [
        style({ height: '0' }),
        animate('0.2s ease-out')
    ]),
    transition(':leave', [
        animate('0.2s ease-in', style({ height: '0' }))
    ])
]);

export let fadein = trigger('fadein', [
    transition(':enter', [
        style({ opacity: '0', width: '400px' }),
        animate('0.3s 1s ease-out')
    ])
]);

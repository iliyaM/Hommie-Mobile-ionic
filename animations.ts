import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';

export const flyInAnimation = trigger('flyInAnimation', [
    transition(':enter', [
        animate(300, keyframes([
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
    ]),
    transition(':leave', [
        animate(300, keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
            style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
    ]),
]);


export const groupFlyInAnimation = trigger('groupFlyInAnimation', [
    transition('void => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', [stagger('300ms', [
            animate(300, keyframes([
                style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
                style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
            ]))
        ])],{ optional: true })
    ]),
    transition('* => void', [
        query(':leave', [stagger(300, [
            animate(300, keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
            ]))
        ])],{ optional: true })
    ])
]);

export const popUpAnimation = trigger('popUpAnimation', [
    transition(':enter', [
        animate(300, keyframes([
            style({ opacity: 1, transform: 'scale(0)', offset: 0 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 1 })
        ]))
    ]),
    transition(':leave', [
        animate(300, keyframes([
            style({ opacity: 1, transform: 'scale(1)', offset: 0.5 }),
            style({ opacity: 0, transform: 'scale(0)', offset: 1.0 })
        ]))
    ]),
]);


export const groupPopupAnimation = trigger('groupPopupAnimation', [
    transition('void => *', [
        query(':enter', style({ opacity: 0, transform: 'scale(0)' }), { optional: true }),

        query(':enter', [stagger('300ms', [
            animate(300, keyframes([
                style({ opacity: 1, transform: 'scale(0)', offset: 0 }),
                style({ opacity: 1, transform: 'scale(1)', offset: 1 })
            ]))
        ])])
    ]),
    transition('* => void', [
        query(':leave', [stagger(300, [
            animate(300, keyframes([
                style({ opacity: 1, transform: 'scale(1)', offset: 0.5 }),
                style({ opacity: 0, transform: 'scale(0)', offset: 1.0 })
            ]))
        ])
        ])
    ])
]);
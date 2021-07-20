import { Subject } from 'rxjs';


const subject = new Subject();


export const prizeService = {
    sendNumber: number => subject.next(number),
    clearNumber: () => subject.next(),
    onNumber: () => subject.asObservable()
};
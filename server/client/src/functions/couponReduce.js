import { Subject } from 'rxjs';
const subject = new Subject();
export const couponService = {
    sendCoupon: coupon => subject.next(coupon),
    clearCoupon: () => subject.next(),
    onCoupon: () => subject.asObservable()
};
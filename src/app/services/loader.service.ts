import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoaderState } from '../loader/loader';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class LoaderService {
    private loaderSubject = new Subject<LoaderState>();
    loaderState: Observable<LoaderState>;
    constructor() {
        this.loaderState = this.loaderSubject.asObservable().share();
    }
    show() {
        this.loaderSubject.next(<LoaderState>{ show: true });
    }
    hide() {
        this.loaderSubject.next(<LoaderState>{ show: false });
    }
}
import { ControlValueAccessor } from '@angular/forms';

export abstract class AbstractValueAccessor implements ControlValueAccessor {

    onChangeCallback: any = () => { };
    onTouchedCallback: any = () => { };

    protected _value: any = '';

    get value(): any {
        return this._value;
    };

    set value(value: any) {
        this._value = value;
        this.onChangeCallback(value);
    }

    writeValue(value: any) {
        if (value !== this._value) {
            this._value = value;
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
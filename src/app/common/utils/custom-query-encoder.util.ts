import {HttpUrlEncodingCodec} from '@angular/common/http';

export class CustomQueryEncoder extends HttpUrlEncodingCodec {
    public encodeKey(k: string): string {
        return this.encode(k);
    }

    public encodeValue(v: string): string {
        return this.encode(v);
    }

    public decodeKey(k: string): string {
        return this.decode(k);
    }

    public decodeValue(v: string): string {
        return this.decode(v);
    }

    private encode(v: string): string {
        return encodeURIComponent(v);
    }

    private decode(k: string): string {
        return decodeURIComponent(k);
    }
}


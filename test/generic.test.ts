describe('Generic Class', () => {
    class GenericData<T> {
        value: T;

        constructor(value: T) {
            this.value = value;
        }

        get(): T {
            return this.value;
        }

        set(value: T) {
            this.value = value;
        }
    }

    it('should support multiple data type', () => {
        const dataNumber = new GenericData<number>(123);
        // dataNumber.value = 'Ricid'; // error
        // dataNumber.value = true; // error
        expect(dataNumber.value).toBe(123);

        const dataString = new GenericData<string>('Ricid');
        // dataNumber.value = 123; // error
        // dataNumber.value = true; // error
        expect(dataString.value.toUpperCase()).toBe('RICID');
    });

    function create<T>(value: T): T {
        return value;
    }

    it('should support function generic', () => {
        const result: string = create<string>('Ricid');
        expect(result).toBe('Ricid');

        const result2: number = create<number>(123);
        expect(result2).toBe(123);
    });

    class Entry<K, V> { 
        constructor (public key: K, public value: V) {}
    }

    class Triple<K, V, T> { 
        constructor (public key: K, public value: V, public third: T) {}
    }

    it('should support multiple generic', () => {
        const entry = new Entry<number, string>(1, 'Hello');
        expect(entry.key).toBe(1);
        expect(entry.value).toBe('Hello');

        const triple = new Triple<number, string, boolean>(1, 'Hello', true);
        expect(triple.key).toBe(1);
        expect(triple.value).toBe('Hello');
        expect(triple.third).toBe(true);
    });
});
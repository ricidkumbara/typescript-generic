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

    it('should support optional generic type', () => {
        const entry = new Entry(1, 'Ricid');
        expect(entry.key).toBe(1);
        expect(entry.value).toBe('Ricid');
    });

    class SimpleGeneric<T = string> {
        private value?: T;

        setValue(value: T) {
            this.value = value;
        }

        getValue(): T | undefined {
            return this.value;
        }
    }

    it('should support simple generic', () => {
        // const simpleGeneric = new SimpleGeneric<string>();
        const simpleGeneric = new SimpleGeneric();
        simpleGeneric.setValue('Ricid');
        // simpleGeneric.setValue(1);
        // simpleGeneric.setValue(true);

        expect(simpleGeneric.getValue()!.toUpperCase()).toBe('RICID');
    });

    interface Employee {
        id: string;
        name: string;
    }

    interface Manager extends Employee {
        totalEmployee: number;
    }

    interface VP extends Manager {
        totalManger: number;
    }

    class EmployeeData<T extends Employee> {
        constructor (public employee: T) {}
    }

    it('should support constraint', () => {
        const data1 = new EmployeeData<Employee>({
            id: '100',
            name: "Ricid"
        }); 
        
        const data2 = new EmployeeData<Manager>({
            id: '100',
            name: "Ricid",
            totalEmployee: 100
        }); 

        const data3 = new EmployeeData<VP>({
            id: '100',
            name: "Ricid",
            totalEmployee: 100,
            totalManger: 100,
        }); 

        console.log(data1, data2, data3);
    });

    it('should support array', () => {
        const array = new Array<string>();
        array.push('Ricid');
        array.push('Kumbara');

        expect(array[0]).toBe('Ricid');
        expect(array[1]).toBe('Kumbara');
        expect(array.length).toBe(2);
    });

    it('should support set', () => {
        const set = new Set<string>();
        set.add('Ricid');
        set.add('Ricid');
        set.add('Kumbara');

        expect(set.size).toBe(2);
        expect(set.has('Ricid')).toBe(true);
        expect(set.has('Kumbara')).toBe(true);
    });

    it('should support map', () => {
        const map = new Map<string, number>();
        map.set('Ricid', 100);
        map.set('Kumbara', 200);

        expect(map.get('Ricid')).toBe(100);
        expect(map.get('Kumbara')).toBe(200);
    });

    async function fetchData(value: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                if (value == 'Ricid') {
                    resolve('Hello ' + value);
                } else {
                    reject('Not found');
                }
            }, 1000);
        });
    }

    it('should support promise', async () => {
        const result = await fetchData('Ricid');
        expect(result).toBe('Hello Ricid');

        try {
            await fetchData('Kumbara');
        } catch (e) {
            expect(e).toBe('Not found');
        }
    });
});
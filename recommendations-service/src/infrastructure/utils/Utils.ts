export class Utils {

    static sortByMostViewed(dictionary: { [id: string]: any[] }) {
        const mappedObject = Object.keys(dictionary).map((key) => {
            return { key, number: dictionary[key].length };
        });

        return mappedObject.sort((obj1, obj2) => obj2.number - obj1.number);
    }

    static createMapper(data: any[], idField: string) {
        const mapper = {} as { [id: string]: any };
        data.forEach((o) => {
            mapper[o[idField]] = o;
        });
        return mapper;
    }

    static createArrayMapper(data: any[], idField: string) {
        const mapper = {} as { [id: string]: any[] };
        data.forEach((o) => {
            if (!mapper[o[idField]]) mapper[o[idField]] = [];
            if (mapper[o[idField]]) mapper[o[idField]].push(o);
        });

        return mapper;
    }

    static createBinaryMapper(data: any[]) {
        const mapper = {} as { [id: string]: boolean };
        data.forEach((o) => (mapper[o.id] = true));
        return mapper;
    }

    static createMapperToField(data: any[], idField: string, field: string) {
        const mapper = {} as { [id: string]: any };
        data.forEach((o) => {
            mapper[o[idField]] = o[field];
        });
        return mapper;
    }

}
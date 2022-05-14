import { Document } from "mongoose";

export const setProps = <D extends Document, T>(doc: D, props: Partial<T>) => {
    const data = props as any;
    Object.keys(props).forEach((key) => {
        doc.set(key, data[key]);
    })
    return doc;
}
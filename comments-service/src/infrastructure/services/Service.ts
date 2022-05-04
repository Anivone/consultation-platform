export interface Service<Entity, Interface> {
    get(filter?: Partial<Interface>): Promise<Entity[]>;

    getById(id: string): Promise<Entity | null>;

    getOne(filter: Partial<Interface>): Promise<Entity | null>;

    create(props: Interface): Promise<Entity>;

    update(id: string, props: Partial<Interface>): Promise<Entity | null>;

    delete(id: string): Promise<Entity | null>;
}

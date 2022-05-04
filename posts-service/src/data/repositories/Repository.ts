export interface Repository<Entity, Interface> {
    getAll(filter?: Partial<Interface>): Promise<Entity[]>;

    getOne(filter: Partial<Interface>): Promise<Entity | null>;

    getById(id: string): Promise<Entity | null>;

    create(props: Interface): Promise<Entity>;

    update(id: string, props: Partial<Interface>): Promise<Entity | null>;

    delete(id: string): Promise<Entity | null>;
}

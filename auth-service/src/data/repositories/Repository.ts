export interface Repository<Entity, Interface> {
    getAll(filter?: Interface): Promise<Entity[]>;

    getOne(filter: Interface): Promise<Entity | null>;

    getById(id: string): Promise<Entity | null>;

    create(props: Interface): Promise<Entity>;
}

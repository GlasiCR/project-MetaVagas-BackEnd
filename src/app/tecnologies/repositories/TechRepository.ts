class TechRepository{
    constructor(private model: any){}

    async create(tech: string){
        return this.model.create(tech)
    }
}

export { TechRepository }
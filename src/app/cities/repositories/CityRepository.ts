class CityRepository{
    constructor(private model: any){}

    async create(city: string){
        return this.model.create(city)
    }
}

export { CityRepository }
import { TechSearchDto } from "../dtos/TechSearchDto"

class TechSearchRepository {
    constructor(
        private model: any,
    ) { }

    async findByTech(data: TechSearchDto) {
        const findBySearch = this.model.find( data )
        return findBySearch
    }

    async incrementTechCount(data: TechSearchDto) {
        const addCount = this.model.updateOne(
            { technology: data.technology, location: data.location },
            { $inc: { count: 1 } },
            { new: true }
        )
        return addCount
    }

    async createTechCount(data: TechSearchDto) {
        return this.model.create(data)
    }

    async showTechMoreSearch() {
        return this.model.aggregate([
            { $group: { _id: "$technology", total: { $sum: "$count" } } },
            { $sort: { total: -1 } }
        ]);
    }

    async showCitiesMoreSearchToTech(nameTech: string) {
        return this.model.aggregate([
            { $match: { technology: nameTech, location: { $exists: true, $ne: "" } } },
            { $sort: { count: -1 } },
        ]);
    }


    async findByNameTech(technology: string) {
        return this.model.findOne({ technology })
    }

    async sumMostSearchTechAndCity(nameTech: string, locationTech: string) {
        return this.model.aggregate([
            { $match: { technology: nameTech, location: locationTech } },
            { $group: { _id: null, total: { $sum: "$count" } } }
        ])
    }
}

export { TechSearchRepository }
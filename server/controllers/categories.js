const categoriesService = require('../service/categoriesService');
const CategoryDto = require('../dtos/categoryDto');

class Categories {
    getCategories = async (req, res, next) => {
        try {
            const categories = await categoriesService.getCategories()
            res.json(categories)
        } catch(e) {
            next(e)
        }
    }
    
    createOrUpdateCategory = async (req, res, next) => {
        try {
            const { _id } = req.body;
            const categoryDto = new CategoryDto(req.body);
            let category = null

            if(_id) {
                category = await categoriesService.updateCategory(categoryDto)
            } else {
                category = await categoriesService.createCategory(categoryDto)
            }
            res.json(category)
        } catch(e) {
            next(e)
        }
    }
    
    deleteCategory = async (req, res, next) => {
        try {
            const _id = req.params._id;
            const deletedCategory = await categoriesService.deleteCategory(_id)
            res.json(deletedCategory)
        } catch(e) {
            next(e)
        }
    }
}


module.exports = new Categories()
import StoreModule from '../module';
import {organizeCategories, flattenCategoriesWithOwnId,} from '../../utils'

class CategoriesState extends StoreModule {
	/**
	 * Начальное состояние
	 * @returns 
	 */
	initState() {
		return {
			categories: [],
			waiting: false,
		};
	}

	async load(lang) {
		this.setState({
			...this.initState(),
			waiting: true,
		}, 'Категории загружаются');
		try {
			const response = await fetch(
				`/api/v1/categories?lang=${lang},fields=_id,title,parent(_id)&limit=*`
			);
			const json = await response.json();
			const organizedCategories = organizeCategories(json.result.items);
      const categories= flattenCategoriesWithOwnId(organizedCategories);
			this.setState({
				...this.getState(),
				categories: categories,
				waiting: false,
			}, "Категории загружаются" );
		} catch (err) {
			this.setState({
				...this.initState(),
			}, 'Ошибка загрузки категорий');
		}
	}
}

export default CategoriesState;

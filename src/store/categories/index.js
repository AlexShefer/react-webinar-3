import StoreModule from '../module';
import {organizeCategories, flattenCategoriesWithChildIds,} from '../../utils'

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

	async load() {
		this.setState({
			...this.initState(),
			waiting: true,
		}, 'Категории загружаются');
		try {
			const response = await fetch(
				`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
			);
			const json = await response.json();
			const organizedCategories = organizeCategories(json.result.items);
      const categories= flattenCategoriesWithChildIds(organizedCategories);
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

export const ComponentFactory = {
	components: [],
	/**
	 *
	 * @param {string} name
	 * @return {object}
	 */
	instantiate(name) {
		let cls = this.components.filter(
			(element)=> {
				return (element.name && element.name === name)
				||
				(element.constructor && element.constructor.name && element.constructor.name === name);
			})[0];

			if (cls && cls.name)
				return new cls();
			else
				return cls;
	},
};

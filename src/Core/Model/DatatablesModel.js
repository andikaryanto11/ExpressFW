import Request from "../Http/Request";

class DatatablesModel {


	#_request = null;
	#_filter = null;
	#_useIndex = true;
	#_dtRowClass = null;
	#_dtRowId = null;
	#_column = [];
	#_columnsOnly = [];
	#_currentPage = null;
	#_pageSize = null;

	#_outputs = {
		draw: null,
		recordsTotal: null,
		recordsFiltered: null,
		data: null,
	};

	/**
	 * 
	 * @param {*} model 
	 * @param {{}} filter 
	 */
	constructor(model, filter = {}, method = "POST", useIndex = true) {
		let req = Request.getInstance();
		if(method == "POST")
			this.#_request = req.body;
		else 
			this.#_request = req.query;

		this.#_filter = filter;
		this.model = model;
		this.#_useIndex = useIndex;
	}

	/**
	 * Set parameterr to fetch the data
	 * @returns {{}}
	 */
	setParams() {
		let params = this.#_filter;

		if (this.#_request.length !== -1) {
			this.#_currentPage = this.#_request.start = 0 ? 1 :this.#_request.start / this.#_request.length + 1;
			this.#_pageSize = this.#_request.length;
			params.page = this.#_currentPage;
			params.size = this.#_pageSize;
		}
		if (this.#_request.search.value !== '')
		{
			params.group = {};
			let searchValue = this.#_request.search.value;
			let orLikeData = {};
			this.#_column.forEach((column, i) => {
				if (column.column.length != 0)
				{
					if (column.searchable)
					{
						let col = column.column.split(".");
						let newCol = null;
						if (col.length === 3)
						{
							newCol = col[0] + "." + col[1];
						}
						else if (col.length === 2)
						{
							newCol = col[0] + "." + col[1];
						}
						else
						{
							newCol = column.column;
						}
						orLikeData[newCol] = searchValue;
						 
					}
				}
			});

			params.group['orLike'] = orLikeData;
		}

		if (this.#_request.order[0].column > 0) {
               let order = this.#_request.order[0].column;
               let dir = this.#_request.order[0].dir;
			params.order = {};
               if (this.#_column[order] && this.#_column[order].orderable) {
                    let col = this.#_column[order].column.split(".");
				let newCol = null;
				if (col.length === 3)
				{
					newCol = col[0] + "." + col[1];
				}
				else if (col.length === 2)
				{
					newCol = col[0] + "." + col[1];
				}
				else
				{
					newCol = this.#_column[order].column;
				}

                    params.order = {
                         [newCol] : dir === 'asc' ? 'ASC' : 'DESC',
				};
               }
          }
		return params;
	}

	/**
	 * Populate the data to store to datatables.net
	 */

	async populate() {
		try {
			let params = this.setParams();
			let result = await this.model.findAll(params, this.#_columnsOnly);

			this.#_outputs.draw = this.#_request.draw > 0 ? this.#_request.draw : 0;
			this.#_outputs.recordsTotal = result.length;
			this.#_outputs.recordsFiltered = await this.allData(params);
			this.#_outputs.data = this.output(result);
		} catch (e) {
			this.#_outputs.error = e.message;
		}

		return this.#_outputs;
	}

	/**
	* Count All data in Eloquent table mapping
	*
	* @param array filter
	*/
	async allData(filter = {}) {
		delete filter.page;
		delete filter.size;
		return await this.model.count(filter, this.#_columnsOnly);
	}

	/**
	 * Get the data
	 *
	 * @param {[]} data Of Eloquent Object
	 */
	output(datas) {
		let out = [];
		let i = (this.#_currentPage * this.#_pageSize) - this.#_pageSize;
		datas.forEach((data, k) => {
			let row = {};
			this.#_column.forEach((column, j) => {
				if (column.ispassedback) {
					let rowdata = null;
					if (column.callback != null) {
						let fn = column.callback;
						rowdata = fn(data, i);
					} else {
						rowdata = this.getColValue(column, data);
					}

					let selectedColumn = '';
					if (this.#_useIndex) {
						row[j]= rowdata;
					} else {
						let col = column.column.split(".");
						if (col.length === 3) {
							selectedColumn = col[2];
						} else if (col.length === 2) {
							selectedColumn = col[1];
						} else {
							selectedColumn = col[0];
						}
						row[selectedColumn] = rowdata;
					}

					if (this.#_dtRowId && this.#_dtRowId === column.column) {
						let col = column.column.split(".");
						if (col.length === 3) {
							selectedColumn = col[2];
						} else if (col.length === 2) {
							selectedColumn = col[1];
						} else {
							selectedColumn = col[0];
						}
						row['DT_RowId'] = data[selectedColumn];
					}

					row['DTRowClass'] = this.#_dtRowClass;
				}
			})
			i++;
			out.push(row);
		})
		return out;
	}

	/**
	 * Set Column You want to return
	 *
	 * @param {string}  column
	 * @param {string}  foreignKey     Nullable
	 * @param {Function} callback       Nullable
	 * @param boolean searchable     Nullable
	 * @param boolean orderable      Nullable
	 * @param boolean isdefaultorder Nullable
	 */
	addColumn(column, foreignKey = null, callback = null, searchable = true, orderable = true, isdefaultorder = false, ispassedBack = true) {
		let columns = {
			column: column,
			foreignKey: foreignKey,
			callback: callback,
			searchable: searchable,
			orderable: orderable,
			isdefaultorder: isdefaultorder,
			ispassedback: ispassedBack,
		};
		this.#_column.push(columns);
		if(column != null && column != '')
			this.#_columnsOnly.push(column);
		return this;
	}

	/**
	 * Add row class name for datatable.net
	 */

	addDtRowClass(className) {
		this.#_dtRowClass = className;
		return this;
	}

	/**
	 * Add row id name for datatable.net
	 */
	addDtRowId(columName) {
		this.#_dtRowId = columName;
		return this;
	}

	/**
	* Get value if foreignkey filed not empty otherwise will return from Closure
	*
	* @param {string} column
	* @param object data   Of intended Instace Eloquent
	*/
	getColValue(column, data) {

		let col = column.column.split(".");
		let columnname = null;
		if (col.length === 3) {
			columnname = col[2];
		} else if (col.length === 2) {
			columnname = col[1];
		} else {
			columnname = column.column;
		}
		return data[columnname];

	}


}

export default DatatablesModel;
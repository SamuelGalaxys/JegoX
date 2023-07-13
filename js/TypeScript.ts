(() => {
	'use strict';

	interface HTMLTableElementWithTBody extends HTMLTableElement {
		tBodies: HTMLCollectionOf<HTMLTableSectionElement>;
	}

	class TableFilter {
		private input: HTMLInputElement;

		private onInputEvent(e: Event): void {
			this.input = e.target as HTMLInputElement;
			const table1 = document.getElementsByClassName(this.input.getAttribute('data-table')) as HTMLCollectionOf<HTMLTableElementWithTBody>;
			Array.prototype.forEach.call(table1, (table: HTMLTableElementWithTBody) => {
				Array.prototype.forEach.call(table.tBodies, (tbody: HTMLTableSectionElement) => {
					Array.prototype.forEach.call(tbody.rows, this.filter);
				});
			});
		}

		private filter(row: HTMLTableRowElement): void {
			const text = row.textContent.toLowerCase();
			const val = this.input.value.toLowerCase();
			row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}

		public init(): void {
			const inputs = document.getElementsByClassName('table-filter') as HTMLCollectionOf<HTMLInputElement>;
			Array.prototype.forEach.call(inputs, (input: HTMLInputElement) => {
				input.oninput = this.onInputEvent.bind(this);
			});
		}
	}

	const tableFilter = new TableFilter();
	tableFilter.init();
})();

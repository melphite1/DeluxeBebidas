import React from 'react';
import "../styles/filter.css"


const NavProducts = (props) => {
	return (<>
		<div className="navProducts">
			<div className="filters">
				<div>
					<p>Filtrar por Precio</p>
					<button style={{marginBottom:"10px"}}>$500 - $1000</button>
					<button  style={{marginBottom:"10px"}}>$1001- $2500</button>
					<button  style={{marginBottom:"10px"}}>$2501-$5000</button>
				</div>

			</div>
			<div className="categories">

			</div>
		</div>
	</>);
}

export default NavProducts;
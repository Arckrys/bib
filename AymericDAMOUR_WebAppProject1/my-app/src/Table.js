import React from 'react';
import './Table.css';
export default class Table extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
          restaurants : this.props.bib
      }
      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(e) {
       let currentList = [];
       let newList = [];
       if (e.target.value !== "") {
         currentList = this.props.bib;
         newList = currentList.filter(item => {
           return item.name.includes(e.target.value);
         });
       } else {
         newList = this.props.bib;
       }
       this.setState({
         restaurants: newList
       });
     }

   renderTableData() {
      return this.state.restaurants.map((restaurant, index) => {
         const { name, url, adresse, coord, pricing, type, description } = restaurant //destructuring
         return (
            <tr onClick = {() => alert(description)}  key={name}>
               <td>{name}</td>
               <td>{url}</td>
               <td>{adresse}</td>
               <td>{coord}</td>
               <td>{pricing}</td>
               <td>{type}</td>
            </tr>
         )
      })
   }

   renderTableHeader() {
       let header = Object.keys(this.state.restaurants[0]);
       return header.map((key, index) => {
         if (key.toUpperCase() != 'DESCRIPTION'){
          return <th key={index}>{key.toUpperCase()}</th>
        }
       })
    }

   render() {
     return(
         <div>
            <h1 id= 'title'>Liste des restaurants bib et maître</h1>
            <input type="text" className="input" onChange={this.handleChange} placeholder="Search Name..." />
            <table id='restaurants'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}

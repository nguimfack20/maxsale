import React from 'react'

 const Data = ({ data, loading }) => {
   if (loading) {
     return <h2> Loading.......</h2>;
   }

  return (
    <ul className="list-group mb-4">
      {
        data.map(item => (
          <li key={item.id} className="list-group-item">
            <li>{item.menu}</li>
            <li> {item.sousmenu}</li>

          </li>
        ))
      }
    </ul>
  )
}

export default Data;
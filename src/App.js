import './App.css';
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

function App() {

  const [data ,setData] = useState([]);

  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((json) => {
      setData(json);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Username', field: 'username' },
    { title: 'Phone', field: 'phone', type: 'numeric' },
    { title: 'Email', field: 'email' },
    { title: 'Website', field: 'website' },
  ];

  return (
    <div className="App">
      <MaterialTable
        title="Users Nemesis"
        data={data}
        columns={columns}
        editable={{
          onRowAdd:(newData) => new Promise((resolve, reject) => {
            const newRows = [...data, newData];
            setTimeout(() => {
              setData(newRows);
              resolve();
            }, 1000);
          }),
          onRowDelete:deleteRow => new Promise((resolve, reject) => {
            const index = deleteRow.tableData.id;
            const newRows = [...data];
            newRows.splice(index, 1)
            setTimeout(() => {
              setData(newRows);
              resolve();
            }, 1000);
            }),
            onRowUpdate:(newRow,oldRow)=>new Promise((resolve,reject)=>{
              const index=oldRow.tableData.id;
              const newRows=[...data];
              newRows[index]=newRow;
              setTimeout(() => {
                setData(newRows)
                resolve()
              }, 1000)
            })
        }}
        options={{
          paging:false,
          search:false,
          actionsColumnIndex:-1,
          addRowPosition: 'first',
          headerStyle: {
            backgroundColor: '#757575',
            color: '#FFF'}
        }}
      />
    </div>
  );
}

export default App;

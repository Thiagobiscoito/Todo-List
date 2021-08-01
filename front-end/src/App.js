//import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import Item from './components/item'

function App() {

  const [itens, setItens] = useState(
    []
  )

  const [filterItens, setFilterItens] = useState({ filter: false, active: false })

  //Aqui serão as funçoes para buscar os dados no banco
  function getData() {
    fetch('http://localhost:3001/todo/list', { method: "GET" })
      .then(response => response.json())
      .then(data => setItens(data))
  }

  function insertDocument() {
    fetch('http://localhost:3001/todo/add',
      {
        method: "POST", headers:
          { 'content-type': "application/json" },
        body: JSON.stringify({ "text": "", "active": true })
      })
      .then(response => response.json())
      .then(data => getData())
  }

  function updateDocument(item) {
    fetch('http://localhost:3001/todo/update',
      {
        method: "PATCH",
        headers: { 'content-type': "application/json" },
        body: JSON.stringify(item)
      })
      .then(response => response.json())
      .then(() => getData())
  }

  function deleteDocument(item) {
    fetch('http://localhost:3001/todo/delete',
      {
        method: "DELETE",
        headers: { 'content-type': "application/json" },
        body: JSON.stringify(item)
      })
      .then(response => response.json())
      .then(() => getData())
  }

  //função que ao atualizar a pagina ele carrega as informaçoes
  useEffect(() => {
    getData()
  }, [])

  const itensToShow = filterItens.filter ?
    itens.filter(item => item.active === filterItens.active) : itens

  return (
    <div className="wrapper">
      <div className="to-do-list">
        <h1>To Do App</h1>

        {itensToShow.map(item => {
          return (<Item item={item}
            updateDocument={updateDocument} //e o props para o componente item que e o filho. 
            deleteDocument={deleteDocument} />)
        })}

        <div className="buttonRow">
          <button onClick={() => setFilterItens({ filter: false })}>Todos</button>
          <button onClick={() => setFilterItens({ filter: true, active: true })}>Pendentes</button>
          <button onClick={() => setFilterItens({ filter: true, active: false })}>Concluidos</button>
        </div>

        <div className="buttonRow"> 
          <button onClick={insertDocument}>Inserir novo Todo</button>
        </div>

      </div>
    </div>


  );
}

export default App;

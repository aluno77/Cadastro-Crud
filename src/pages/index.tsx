import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";

import firebase from "../lib/firebase";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  table {
    width: 100%;
    max-width: 1000px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccc;
    td {
      padding: 8px;
    }
    tr:nth-child(odd) {
      td {
        background-color: #eee;
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 350px;
    > div {
      display: flex;
      flex-direction: column;
      &.actions {
        flex-direction: row;
        padding-top: 10px;
        button {
          flex: 1;
        }
      }
    }
  }
`;

interface Cadastro {
  id: string;
  nome: string;
  email: string;
}

const Home: NextPage = () => {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("cadastros").onSnapshot((snapshot) => {
      const dados: Cadastro[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();

        dados.push({
          id: doc.id,
          nome: data.nome,
          email: data.email,
        });
      });
      setCadastros(dados);
    });
  }, []);
//-----------------------------------------------------
  const cadastrar = (e: any) => {
    
    e.preventDefault();
    const db = firebase.firestore();
    const colecao = db.collection('cadastros')

    if(id) {
      colecao.doc(id).update({
        nome,
        email
      });

    }else{
      colecao.add({
        nome,
        email
      })
    }

    setNome(''); //essea aqui lipa formular e atualiza
    setEmail(''); //essea aqui lipa formular e atualiza
  };
//------------------------------------------------------------
  const limpar = () =>{
    setId('');
    setNome('');
    setEmail('');
  }
//--------------------------------------------------------------
  const editar = ({id, nome, email}: Cadastro) => {
      setId(id);
      setNome(nome);
      setEmail(email);
  }

  //----------------------------------------------------------------
  const excluir = ({id, nome}: Cadastro) => {

    if(confirm(`Deseja realmente excluir o cadastro de ${nome}?`)){
      
      const db = firebase.firestore();
      const colecao = db.collection('cadastros')
      const documento = colecao.doc(id);
  
        documento.delete();
    }
  }
  
//--------------------------------------------------------------------

  return (
    <Page>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {cadastros.map((cadastro) => (
            <tr key={cadastro.id}>
              <td>{cadastro.id}</td>
              <td>{cadastro.nome}</td>
              <td>{cadastro.email}</td>
              <td>
                <button onClick={() => editar(cadastro)}>Editar</button>
                <button onClick={() =>excluir(cadastro)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={cadastrar}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="actions">
          <button type="submit">Salvar</button>
          <button type="reset" onClick={limpar}>Limpar</button>
        </div>
      </form>
    </Page>
  );
};

export default Home;

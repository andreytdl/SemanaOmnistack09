import React, { useState } from 'react';
import api from '../../services/api';

export default function Login( { history }){
    const [email, setEmail] = useState(''); /*Conceito de Estado em React*/

    async function handleSubmit(event){
    event.preventDefault(); //Não redirecionará/atualizará a pagina
    
    const response = await api.post('/sessions', {
      email : email
    });

    const { _id } = response.data;
    console.log(_id);
    localStorage.setItem('user', _id); //Salvando no banco de dados do navegador

    history.push('/dashboard');

  }
    return(
        <> {/*O React exige uma div, porém nós podemos colocar isso que nós chamamos de "Fragment" */}    
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
            </p>

            {/* ----------FORMULARIO----------- */}
            {/* Sempre que for usar coisas do js no html devemos colocar chaves (Funções, variaveis, etc) */}
            <form onSubmit={handleSubmit}> 
            <label htmlFor="email">E-MAIL *</label>
            <input 
                type="email"
                id="email" 
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <button className="btn" type="submit">Entrar</button>

            </form>
        </>
    );

}
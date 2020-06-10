import React, { useState, useMemo } from 'react'; //useMemo -> fazer preview da imagem
import api from '../../services/api'
import camera from '../../assets/camera.svg';

import './styles.css'

export default function New( { history } ){
    const [company, setCompany] = useState(''); //Valor inicial
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null; //Url para variavel temporaria (Caso existir)
    }, [thumbnail])

    async function handleSubmit(event){
        event.preventDefault(); //Não esquecer disso, se não o history.push não funciona

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        const response = await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');

    }

    return(
        <form onSubmit={handleSubmit}>

            <label 
            id="thumbnail" 
            style = {{ backgroundImage: `url(${preview})`}} //Colocando um preview
            className= {thumbnail ? 'has-thumbnail' : ''} //Adicionando um True ou False para saber se existe uma imagem no preview
            
            > 
                <input type="file" onChange = {event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por virgula)</span></label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para gratuito)</span></label>
            <input
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn"> Cadastrar </button>


        </form>
    )
    
}
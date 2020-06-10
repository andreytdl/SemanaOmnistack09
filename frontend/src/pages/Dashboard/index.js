import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom'; //Criar links que irão para outra rota sem a necessidade do history.push
import socketio from 'socket.io-client';
import api from '../../services/api';
import './styles.css';

export default function Dashboard(){
    const [spots, setSpots] = useState([]); //Inicializamos o useState como array pois oq temos é um array de spots
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');

    const socket = useMemo(() => socketio('http://localhost:3333', { //O useMemo mantém a variavel guardada até que haja alguma alteração ee caso houver executa o codigo
        query: { user_id },
    }), [ user_id ]); //Nesse caso só irá haver uma nova conexão caso mude o user._id

    
    useEffect(() =>{
        socket.on('booking_request', data => {
            setRequests([ ... requests, data]); //O '...' irá adicionar o 'data' no final do array de requests
        })
    }, [requests, socket]);


    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get("/dashboard", {
                headers: {user_id}
            });
            setSpots(response.data);
            //console.log(user_id);
            //console.log(response);
            
        }

        loadSpots();
    }, []); //A função (1º Parametro) será executada quando houverem alterações no segundo parametro
    //Passamos o [] vazio para que a função useEffect seja realizada apenas uma vez (Ao inicializar a página)
    
    async function handleAccept(id){
        await api.post(`/bookings/${id}/approvals`);

        //Removendo(Filtrando) o spot da lista de exibição
        setRequests(requests.filter(request => request._id != id));

    }

    async function handleReject(id){
        await api.post(`/bookings/${id}/rejections`);

        //Removendo(Filtrando) o spot da lista de exibição
        setRequests(requests.filter(request => request._id != id));
    }

    return(
        <>

            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong> {request.spot.company}</strong> para a data <strong>{request.date}</strong>
                        </p>
                            <button className='accept' onClick={() => handleAccept(request._id)}> ACEITAR </button>
                            <button className='reject' onClick={() => handleReject(request._id)}> REJEITAR </button>
                    </li>
                ))}
            </ul>

            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{backgroundImage: `url(${spot.thumbnail_url})`}}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
           </ul>
          
           <Link to="new">
                <button className="btn">Cadastrar novo spot</button>
           </Link>
                
        </>
    );
    
}
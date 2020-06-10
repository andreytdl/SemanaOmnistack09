import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert, AsyncStorage, Image, StyleSheet, ScrollView } from 'react-native';
import socketio from 'socket.io-client';

import logo from '../assets/logo.png';
import SpotList from '../component/SpotList';

export default function List( {navigation} ){
    const [techs, setTechs] = useState([]);

    useEffect(() => {

        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.1.106:3333', {
                query: { user_id }
            })
            
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? "APROVADA" : "REJEITADA"}`)
            })
        })
    }, []);

    useEffect(() => {
        //pegando a variavel techs e separando o Array
        AsyncStorage.getItem('techs').then(storagedTechs => {

            if (storagedTechs == null){
                console.log('TechArray: ', storagedTechs);
                navigation.navigate('Login');
            }

            const techArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techArray);
        })
    }, []);


    return(
        //O SafeAreaView proteje de acontecer que o conteudo fique em cima perto do relogio (Em caso de IOS)
        <SafeAreaView style={styles.container}>

            <Image style={styles.logo} source={logo}/>
            
            <ScrollView>
                {/* Criado a parte como um component */}
                {techs.map(tech => <SpotList tech = {tech} />)}
            </ScrollView>


        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: "contain", //O conteudo da imagem totalmente contido no heigth acima
        alignSelf: "center",
        marginTop: 35, //Tentando pegar a SafeArea

    },
})
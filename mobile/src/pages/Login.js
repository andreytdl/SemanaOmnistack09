import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, StyleSheet, Platform} from 'react-native';


import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login( { navigation }){ // navigation == history
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    //O useEffectt é roda sempre que houver a atualização do parametro '[]'
    
    //Nesse caso estamos verificando se o usuário está logado, caso estiver então ele irá ser enviado para a view List
    useEffect(() => {
        AsyncStorage.clear('user');
        AsyncStorage.getItem('user').then(user =>{
            if (user) {
                console.log(user);
                navigation.navigate('List');
            }
                
        })
    }, []);

    async function HandleSubmit(){
        //email, techs
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        console.log(email);
        console.log(techs);
        console.log(_id);

        navigation.navigate('List');

    }

    return(

        /*Ela irá dar um padding quando o teclado subir (O enabled é para caso for ios pois o ios não habilita sozinho*/
        <KeyboardAvoidingView enabled={Platform.OS == 'ios' || Platform.OS == 'android' } behavior="padding" style={styles.container}> 
            <Image source={logo} />
            
            <View style={styles.form}>
                {/* E-MAIL */}
                <Text style={styles.label}> SEU E-MAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address" //Ja deixa o teclado com o @ e o .com
                    autoCapitalize="none" //Não começar com captalize
                    autoCorrect={false}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                {/* TECNOLOGIAS */}

                <Text style={styles.label}> TECNOLOGIAS</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words" //Primeira letra de cada palavra maiuscula
                    autoCorrect={false}
                    value={techs}
                    onChangeText={text => setTechs(text)}
                />

                {/* Botão que diminui a opacidade ao ser tocado */}
                <TouchableOpacity onPress={HandleSubmit} style={styles.button}>
                    <Text style = {styles.buttonText}> Encontrar Spots </Text>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', //Verticalmente
        alignItems: 'center' //Horizontalmente
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },




})
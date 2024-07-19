import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

function RegistroIncidencias({ navigation }) {

  //Variables
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [audio, setAudio] = useState(null);
  const [recording, setRecording] = useState(null);
  const [photo, setPhoto] = useState(null);

  //Método para iniciar el audio
  async function iniciarGrabacion() {
    try {
      console.log('Solicitando permisos..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Empezando a grabar..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Grabación iniciada');
    } catch (err) {
      alert('No se ha podido iniciar la grabación', err);
    }
  };

  //Método para parar el audio
  async function paraGrabacion() {
    console.log('Dejando de grabar..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudio(uri);
    console.log('Grabación detenida y almacenada en', uri);
  };

  //Método para seleccionar una foto
  async function seleccionarFoto() {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se requieren permisos para acceder a la galería.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setPhoto(result.uri);
      }
    } catch (error) {
      alert('Ha ocurrido un error seleccionando la foto', error);
    }
  };

  //Método para tomar una foto
  async function tomarFoto() {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Se requieren permisos para acceder a la cámara.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setPhoto(result.uri);
      }
    } catch (error) {
      alert('Ha ocurrido un error tomando la foto', error);
    }
  };

  //Método guardar el incidente
  async function guardarIncidencia() {
    try {

      //el objeto que se le pasara a el AsyncStore
      const incident = {
        id: Date.now().toString(),
        title: titulo,
        date: fecha,
        description: descripcion,
        audio: audio,
        photo: photo,
      };

      // Guardar la incidencia en AsyncStorage
      let incidents = await AsyncStorage.getItem('incidents');
      incidents = incidents ? JSON.parse(incidents) : [];
      incidents.push(incident);
      await AsyncStorage.setItem('incidents', JSON.stringify(incidents));

      // Limpiar los campos después de guardar
      setTitulo('');
      setFecha('');
      setDescripcion('');
      setAudio(null);
      setPhoto(null);

      // Mostrar un mensaje de éxito y navegar a la pantalla de lista de incidencias
      Alert.alert('Éxito', 'La incidencia se guardó correctamente', [
        { text: 'OK', onPress: () => navigation.navigate('Lista de Incidencias') }
      ]);

    } catch (error) {
      alert('Ha ocurrido un error guardando el incidente', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Título" onChangeText={setTitulo} value={titulo} />
      <TextInput style={styles.input} placeholder="Fecha" onChangeText={setFecha} value={fecha} />
      <TextInput style={styles.input} placeholder="Descripción" onChangeText={setDescripcion} value={descripcion} />
      <TouchableOpacity style={styles.button} onPress={recording ? paraGrabacion : iniciarGrabacion}>
        <Text style={styles.buttonText}>{recording ? 'Parar Grabación' : 'Grabar Audio'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={seleccionarFoto}>
        <Text style={styles.buttonText}>Seleccionar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={tomarFoto}>
        <Text style={styles.buttonText}>Tomar Foto</Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={guardarIncidencia}>
        <Text style={styles.buttonText}>Guardar Incidencia</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistroIncidencias;


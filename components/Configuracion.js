import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

function Configuracion(){

  //Funcion para eliminar todas las incidencias
async function eliminarIncidencias(){
    try {
      await AsyncStorage.removeItem('incidents');
      alert('Todas las incidencias han sido eliminadas correctamente');
    } catch (error) {
      alert('Ha ocurrido un error eliminando las Incidencias', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.deleteButton} onPress={eliminarIncidencias}>
        <Text style={styles.buttonText}>Borrar Todos los Registros</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Configuracion;

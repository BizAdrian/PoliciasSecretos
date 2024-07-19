import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const ListaIncidencias = () => {
  const navigation = useNavigation();

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const cargarIncidencias = async () => {
      try {
        let incidentsData = await AsyncStorage.getItem('incidents');
        incidentsData = incidentsData ? JSON.parse(incidentsData) : [];
        setIncidents(incidentsData);
      } catch (error) {
        console.error('Error loading incidents', error);
      }
    };

    const manejarEnfoque = navigation.addListener('focus', () => {
      cargarIncidencias();
    });

    return manejarEnfoque;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={incidents}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>{item.title}</Text>
            <Text style={styles.listItemText}>{item.date}</Text>
            <Text style={styles.listItemText}>{item.description}</Text>

            {item.photo && (
              <Image source={{ uri: item.photo }} style={styles.image} />
            )}

            {item.audio && (
              <TouchableOpacity style={styles.button} onPress={async () => {
                const sound = new Audio.Sound();
                await sound.loadAsync({ uri: item.audio });
                await sound.playAsync();
              }}>
                <Text style={styles.buttonText}>Reproducir Audio</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ListaIncidencias;

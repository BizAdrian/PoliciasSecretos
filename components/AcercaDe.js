import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

function AcercaDe(){
  return (
    <View style={styles.aboutContainer}>
      <Image source={require('../assets/Adrian.jpg')} style={styles.aboutImage} />
      <Text style={styles.aboutText}>Nombre: Adrian</Text>
      <Text style={styles.aboutText}>Apellido: Encarnacion</Text>
      <Text style={styles.aboutText}>Matrícula: 2022-0502</Text>
      <Text style={styles.aboutText}>
        "La seguridad de una comunidad no se mide solo por la ausencia de delitos, 
        sino por la presencia de personas comprometidas con el bienestar y la protección de sus semejantes. 
        Cada acto de vigilancia y servicio es un paso hacia una sociedad más justa y segura para todos."
      </Text>
    </View>
  )
}

export default AcercaDe;

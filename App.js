import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RegistroIncidencias from './components/RegistroIncidencias';
import ListaIncidencias from './components/ListaIncidencias';
import AcercaDe from './components/AcercaDe';
import Configuracion from './components/Configuracion';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Registro de Incidencias" component={RegistroIncidencias} />
        <Drawer.Screen name="Lista de Incidencias" component={ListaIncidencias} />
        <Drawer.Screen name="Acerca de" component={AcercaDe} />
        <Drawer.Screen name="Configuración" component={Configuracion} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

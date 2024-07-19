import { StyleSheet } from 'react-native';

//Estilos Generales

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1c1c1c', 
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#000', 
  },
  button: {
    backgroundColor: '#0044cc', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
  listItem: {
    backgroundColor: '#2c2c2c', 
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
  },
  listItemText: {
    color: '#fff',
    marginBottom: 5, // Para separar texto de otros elementos
  },
  detailImage: {
    width: '100%',
    height: 300,
    marginBottom: 15,
    borderRadius: 10,
  },
  detailText: {
    color: '#fff',
    marginBottom: 15,
  },
  aboutContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1c1c1c',
  },
  aboutImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  aboutText: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#cc0000', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default styles;


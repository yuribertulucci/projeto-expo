import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {useAuth} from "../context/AuthContext";
import styles from "../css/styles";
import {FontAwesome5} from '@expo/vector-icons';

export default function MenuPrincipal({navigation}) {
  const {user, loading} = useAuth();

  useEffect(() => {
    if (!loading && user === null) {
      navigation.replace('Login');
    }
  }, [user, navigation]);

  return (
    <ScrollView style={[styles.container, {marginTop: 20}]}>
      <View style={menuStyles.header}>
        <View style={menuStyles.welcomeSection}>
          <Text style={menuStyles.greetingText}>Olá, {user?.nome ?? 'Usuário'}!</Text>
          <Text style={menuStyles.subtitleText}>Bem-vindo ao seu app de receitas</Text>
        </View>
        <TouchableOpacity
          style={menuStyles.profileButton}
          onPress={() => navigation.navigate('Perfil')}
        >
          <View style={menuStyles.avatarMini}>
            <Text style={menuStyles.avatarMiniText}>
              {user?.nome?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={menuStyles.menuContainer}>
        <Text style={menuStyles.sectionTitle}>Menu Principal</Text>

        <TouchableOpacity
          style={menuStyles.menuCard}
          onPress={() => navigation.navigate('ListaReceitas')}
        >
          <FontAwesome5 name="book" size={24} color="#3498db" style={menuStyles.menuIcon}/>
          <View style={menuStyles.menuTextContainer}>
            <Text style={menuStyles.menuTitle}>Lista de Receitas</Text>
            <Text style={menuStyles.menuDescription}>Explore todas as receitas disponíveis</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#bbb"/>
        </TouchableOpacity>

        <TouchableOpacity
          style={menuStyles.menuCard}
          onPress={() => navigation.navigate('Favoritos')}
        >
          <FontAwesome5 name="heart" size={24} color="#e74c3c" style={menuStyles.menuIcon}/>
          <View style={menuStyles.menuTextContainer}>
            <Text style={menuStyles.menuTitle}>Favoritos</Text>
            <Text style={menuStyles.menuDescription}>Acesse suas receitas favoritas</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#bbb"/>
        </TouchableOpacity>

        <TouchableOpacity
          style={menuStyles.menuCard}
          onPress={() => navigation.navigate('Categorias')}
        >
          <FontAwesome5 name="th-large" size={24} color="#2ecc71" style={menuStyles.menuIcon}/>
          <View style={menuStyles.menuTextContainer}>
            <Text style={menuStyles.menuTitle}>Categorias</Text>
            <Text style={menuStyles.menuDescription}>Navegue por categorias de receitas</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#bbb"/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const menuStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  welcomeSection: {
    flex: 1,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
  },
  profileButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMini: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMiniText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuIcon: {
    marginRight: 16,
    width: 30,
    textAlign: 'center',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 13,
    color: '#666',
  }
});
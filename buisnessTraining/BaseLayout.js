import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const BaseLayout = ({ children }) => {
  const navigation = useNavigation();
  const route = useRoute(); 


  const isCategoryScreen = () => {
    return ['Informatique', 'Gestion', 'Communication'].includes(route.name);
  };

  const getIconStyle = (screenName) => {
    if (screenName === 'Modules' && isCategoryScreen()) {
      return { color: 'white', backgroundColor: 'black' };
    }
    return route.name === screenName
      ? { color: 'white', backgroundColor: 'black' }
      : { color: 'grey', backgroundColor: '#f7f7f7' };
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        {React.cloneElement(children, { navigation })}
      </ScrollView>

      <View style={styles.bottomMenuContainer}>
        <View style={styles.bottomMenu}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.menuItem}
          >
            <Icon 
              name="arrow-back" 
              size={24} 
              style={styles.icon} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Acceuil')} 
            style={styles.menuItem}
          >
            <Icon 
              name="home" 
              size={24} 
              style={[styles.icon, getIconStyle('Acceuil')]} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Categorie')} 
            style={styles.menuItem}
          >
            <Icon 
              name="folder" 
              size={24} 
              style={[styles.icon, getIconStyle('Categorie')]} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Categorie')} 
            style={styles.menuItem}
          >
            <Icon 
              name="extension" 
              size={24} 
              style={[styles.icon, getIconStyle('Modules')]} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('GeneralPlanning')} 
            style={styles.menuItem}
          >
            <Icon 
              name="calendar-today" 
              size={24} 
              style={[styles.icon, getIconStyle('GeneralPlanning')]} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
    borderRadius: 14,
  },
  bottomMenuContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomMenu: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 40,
    padding: 10,
    width: '60%',
    justifyContent: 'space-around',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BaseLayout;

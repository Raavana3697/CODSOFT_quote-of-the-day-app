import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Appbar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(`${data.content} - ${data.author}`);
      console.log('Fetched quote:', quote); // Add this line for debugging
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const saveToFavorites = async () => {
    try {
      const currentFavorites = await AsyncStorage.getItem('favoriteQuotes');
      const favorites = currentFavorites ? JSON.parse(currentFavorites) : [];
      if (!favorites.some(q => q === quote)) {
        favorites.push(quote);
        await AsyncStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
        console.log('Saved to favorites:', quote); // Add this line for debugging
        alert('Quote saved to favorites!');
      } else {
        alert('Quote already saved to favorites!');
      }
    } catch (error) {
      console.error('Error saving quote to favorites:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      style={styles.background}
    >
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Quote of the Day" titleStyle={styles.headerTitle} />
          <Appbar.Action
            icon="heart"
            onPress={() => navigation.navigate('Favorites')}
          />
        </Appbar.Header>
        <View style={styles.quoteContainer}>
          {quote ? (
            <View style={styles.quoteCard}>
              <Text style={styles.quoteText}>{quote}</Text>
              <Button
                mode="contained"
                style={styles.favoriteButton}
                onPress={saveToFavorites}
              >
                Add to Favorites
              </Button>
            </View>
          ) : (
            <Text style={styles.loadingText}>Loading quote...</Text>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  headerTitle: {
    color: '#fff',
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteCard: {
    backgroundColor: '#1e1e2f',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  quoteText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  favoriteButton: {
    marginTop: 10,
    backgroundColor: '#3f51b5',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default HomeScreen;

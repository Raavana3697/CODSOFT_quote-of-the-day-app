import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, Card, Paragraph, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoriteQuotes();
  }, []);

  const fetchFavoriteQuotes = async () => {
    try {
      const favoriteQuotes = await AsyncStorage.getItem('favoriteQuotes');
      setFavorites(favoriteQuotes ? JSON.parse(favoriteQuotes) : []);
      console.log('Favorite quotes:', favorites); // Add this line for debugging
    } catch (error) {
      console.error('Error fetching favorite quotes:', error);
    }
  };

  const removeFavoriteQuote = async (quoteToRemove) => {
    try {
      const updatedFavorites = favorites.filter(q => q !== quoteToRemove);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favoriteQuotes', JSON.stringify(updatedFavorites));
      alert('Quote removed from favorites!');
    } catch (error) {
      console.error('Error removing favorite quote:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      style={styles.background}
    >
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Favorite Quotes" titleStyle={styles.headerTitle} />
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.quoteContainer}>
          {favorites.length > 0 ? (
            favorites.map((quote, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <Paragraph style={styles.quoteText}>{quote}</Paragraph>
                  <Button
                    mode="contained"
                    style={styles.removeButton}
                    onPress={() => removeFavoriteQuote(quote)}
                  >
                    Remove from Favorites
                  </Button>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Text style={styles.noFavoritesText}>No favorite quotes saved.</Text>
          )}
        </ScrollView>
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
    paddingTop: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1e1e2f',
    marginBottom: 20,
    width: '90%',
    borderRadius: 10,
  },
  quoteText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  removeButton: {
    backgroundColor: '#ff4040',
    marginTop: 10,
  },
  noFavoritesText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default FavoritesScreen;


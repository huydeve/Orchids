import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

// Sample data
const orchids = [
    {
        id: 1,
        name: 'Orchid 1',
        image: require('../assets/icon.png'),
    },
    {
        id: 2,
        name: 'Orchid 2',
        image: require('../assets/icon.png'),
    },
    // Add more orchids as needed
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const favoritesString = await AsyncStorage.getItem('favorites');
                if (favoritesString) {
                    const favoritesArray = JSON.parse(favoritesString);
                    setFavorites(favoritesArray);
                }
            } catch (error) {
                console.log('Error loading favorites:', error);
            }
        };
        if (isFocused)
            loadFavorites();
    }, [isFocused]);

    const addToFavorites = async (orchid) => {
        if (!favorites.find((item) => item.id === orchid.id)) {
            const updatedFavorites = [...favorites, orchid];
            setFavorites(updatedFavorites);
            try {
                const favoritesString = JSON.stringify(updatedFavorites);
                await AsyncStorage.setItem('favorites', favoritesString);
            } catch (error) {
                console.log('Error saving favorites:', error);
            }
        } else {
            const updatedFavorites = favorites.filter((item) => item.id !== orchid.id);
            setFavorites(updatedFavorites);
            try {
                const favoritesString = JSON.stringify(updatedFavorites);
                await AsyncStorage.setItem('favorites', favoritesString);
            } catch (error) {
                console.log('Error saving favorites:', error);
            }
        }
    };

    const goToDetailScreen = (orchid) => {
        navigation.navigate('Detail', { orchid });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => goToDetailScreen(item)}
            className="items-center mb-4"
        >
            <Image source={item.image} className="w-32 h-32 rounded-full" />
            <Text className="text-lg mt-2">{item.name}</Text>
            <TouchableOpacity
                onPress={() => addToFavorites(item)}
                className={`mt-2 p-2 rounded-lg ${favorites.find((favorite) => favorite.id === item.id)
                    ? 'bg-red-500'
                    : 'bg-green-500'
                    }`}
            >
                <Icon
                    name={favorites.find((favorite) => favorite.id === item.id) ? 'heart' : 'heart-o'}
                    size={20}
                    color="white"
                    className="text-white"
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold mb-8">Orchids</Text>
            <FlatList
                data={orchids}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                className="px-4"
            />
        </View>
    );
};

export default HomeScreen;

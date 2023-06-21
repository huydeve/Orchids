import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function DetailScreen({ route }) {
    const navigation = useNavigation();
    const { orchid } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        checkFavoriteStatus();
    }, []);

    const checkFavoriteStatus = async () => {
        try {
            const favoritesString = await AsyncStorage.getItem('favorites');
            if (favoritesString) {
                const favoritesArray = JSON.parse(favoritesString);
                const isFavorite = favoritesArray.some((item) => item.id === orchid.id);
                setIsFavorite(isFavorite);
            }
        } catch (error) {
            console.log('Error checking favorite status:', error);
        }
    };

    const toggleFavorite = async () => {
        try {
            const favoritesString = await AsyncStorage.getItem('favorites');
            let favoritesArray = [];

            if (favoritesString) {
                favoritesArray = JSON.parse(favoritesString);
            }

            if (isFavorite) {
                favoritesArray = favoritesArray.filter((item) => item.id !== orchid.id);
            } else {
                favoritesArray.push(orchid);
            }

            const updatedFavoritesString = JSON.stringify(favoritesArray);
            await AsyncStorage.setItem('favorites', updatedFavoritesString);
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.log('Error toggling favorite:', error);
        }
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View className="flex-1 items-center justify-center">
            <Image source={orchid.image} className="w-64 h-64 mb-8" />
            <Text className="text-2xl font-bold mb-4">{orchid.name}</Text>
            <Text className="text-lg mb-6">{orchid.description}</Text>
            <TouchableOpacity onPress={toggleFavorite} className="p-2 rounded-full bg-gray-200 mb-4">
                <Icon
                    name={isFavorite ? 'heart' : 'heart-o'}
                    size={24}
                    color={'black'}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={goBack} className="p-2">
                <Icon name="arrow-left" size={24} color="black" className="text-black" />
            </TouchableOpacity>
        </View>
    );
}

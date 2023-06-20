import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native';
export default function FavoritesScreen() {

    const isFocused = useIsFocused();

    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };
        if (isFocused) {
            setLoading(true);
            loadFavorites();
        }
    }, [isFocused]);

    const removeFavorite = async (orchid) => {
        const updatedFavorites = favorites.filter((item) => item.id !== orchid.id);
        setFavorites(updatedFavorites);
        try {
            const favoritesString = JSON.stringify(updatedFavorites);
            await AsyncStorage.setItem('favorites', favoritesString);
        } catch (error) {
            console.log('Error saving favorites:', error);
        }
    };

    const removeAllFavorites = async () => {
        setFavorites([]);
        try {
            await AsyncStorage.removeItem('favorites');
        } catch (error) {
            console.log('Error removing favorites:', error);
        }
    };

    const goBack = () => {
        navigation.goBack();
    };

    const renderItem = ({ item }) => (
        <View className="items-center mb-4">
            <Image source={item.image} className="w-32 h-32 rounded-full" />
            <Text className="text-lg mt-2">{item.name}</Text>
            <TouchableOpacity
                onPress={() => removeFavorite(item)}
                className="mt-2 p-2 rounded-lg bg-red-500"
            >
                <Icon name="heart" size={20} color="white" className="text-white" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="flex-1 items-center justify-center">
            {loading ? (<ActivityIndicator size="large" color={'#007aff'} />
            ) : (
                <>
                    <Text className="text-2xl font-bold mb-8">Favorites</Text>

                    {favorites.length > 0 ? (
                        <FlatList
                            data={favorites}
                            renderItem={renderItem} N
                            keyExtractor={(item) => item.id.toString()}
                            className="px-4"
                        />
                    ) : (
                        <Text className="text-lg mb-8">No favorite orchids found.</Text>
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Remove All Favorites',
                                'Are you sure you want to remove all favorites?',
                                [
                                    {
                                        text: 'Cancel',
                                        style: 'cancel',
                                    },
                                    { text: 'OK', onPress: removeAllFavorites },
                                ],
                                { cancelable: false }
                            );
                        }}
                        className="p-2 rounded-lg bg-red-500 mb-4"
                    >
                        <Text className="text-white">Remove All Favorites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goBack} className="p-2">
                        <Text className="text-blue-500">Go Back</Text>
                    </TouchableOpacity>
                </>

            )
            }


        </View >
    );
};




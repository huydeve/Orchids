import { AntDesign } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '../components/Card';
import useFavorite from '../hooks/useFavorite';
import Loading from '../components/Loading';

export default function FavoritesScreen() {
    const isFocused = useIsFocused()
    const navigation = useNavigation();
    const { favorites, loading, removeFavorite, removeAllFavorites } = useFavorite(isFocused)
    const { top } = useSafeAreaInsets();

    const goBack = () => {
        navigation.goBack();
    };

    const renderItem = ({ item }) => (
        <>

            <Card onPress={() => Alert.alert(
                `Unlike ${item.name} ?`,
                `Are you sure you want to unlike ?`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => removeFavorite(item) },
                ],
                { cancelable: false }
            )} item={item} />

        </>


    );

    return (
        <View style={{ marginTop: top }} className='flex-1' >
            <View className='flex-row justify-between items-center px-2 my-4'>
                <View className='h-6 w-6'></View>

                <Text className="text-2xl font-bold ">Favorites</Text>
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
                >
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {loading ? (<Lozading />
            ) : (
                <>


                    {favorites.length > 0 ? (
                        <FlatList
                            data={favorites}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            className="px-4"
                        />
                    ) : (
                        <View className='justify-center items-center h-4/5'>
                            <Text className="text-lg mb-3 mt-8">No favorite orchids found.</Text>
                            <TouchableOpacity onPress={goBack} className="p-2">
                                <Text className="text-blue-500">Go Back</Text>
                            </TouchableOpacity>
                        </View>
                    )}


                </>


            )
            }

        </View>
    );
};




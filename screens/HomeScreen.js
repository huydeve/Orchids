import { useIsFocused, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '../components/Card';
import Loading from '../components/Loading';
import useFavorite from '../hooks/useFavorite';

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
    {
        id: 3,
        name: 'Orchid 3',
        image: require('../assets/icon.png'),
    },
    {
        id: 4,
        name: 'Orchid 4',
        image: require('../assets/icon.png'),
    },
    {
        id: 5,
        name: 'Orchid 5',
        image: require('../assets/icon.png'),
    },
    // Add more orchids as needed
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const { addToFavorites, favorites, loading } = useFavorite(useIsFocused())
    const { top } = useSafeAreaInsets();


    const goToDetailScreen = (orchid) => {
        navigation.navigate('Detail', { orchid });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => goToDetailScreen(item)}
        >
            <Card item={item} data={favorites}
                onPress={() => addToFavorites(item)}
            />
        </TouchableOpacity>
    );

    return (
        <View className="flex-1" style={{ marginTop: top }}>
            <View className='justify-center items-center'><Text className="text-2xl font-bold my-4">Orchids</Text></View>
            {loading ? (<Loading />) : (

                <FlatList
                    data={orchids}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    className="px-4"
                />)
            }
        </View>

    );
};

export default HomeScreen;

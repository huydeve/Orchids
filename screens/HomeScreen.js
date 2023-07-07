import { useIsFocused } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import BottomSheetFilter from '../components/BottomSheetFilter';
import Card from '../components/Card';
import Loading from '../components/Loading';
import useFavorite from '../hooks/useFavorite';
// Sample data
const orchidsList = [
    {
        id: 1,
        name: 'Orchid 1',
        category: 'Category 1',
        text: "Day la Cay de Orchid",
        image: require('../assets/1.jpg'),
    },
    {
        id: 2,
        name: 'Orchid 2',
        category: 'Category 2',
        text: "Day la Cay de Orchid",
        image: require('../assets/2.jpg'),
    },
    {
        id: 3,
        name: 'Orchid 3',
        category: 'Category 2',
        text: "Day la Cay de Orchid",
        image: require('../assets/3.jpg'),
    },
    {
        id: 4,
        name: 'Orchid 4',
        category: 'Category 3',
        text: "Day la Cay de Orchid",
        image: require('../assets/4.jpg'),
    },
    {
        id: 5,
        name: 'Orchid 5',
        category: 'Category 3',
        text: "Day la Cay de Orchid",
        image: require('../assets/5.jpg'),
    },
    // Add more orchids as needed
];



const HomeScreen = ({ navigation }) => {
    // const navigation = useNavigation();
    const isFocused = useIsFocused()
    const { addToFavorites, favorites, loading } = useFavorite(isFocused)
    const [orchids, setOrchids] = useState(orchidsList)
    const { top } = useSafeAreaInsets();


    const goToDetailScreen = (orchid) => {
        navigation.navigate('HomeDetail', { orchid });
    };
    const handleFilter = (categories) => {
        if (categories.length == 0) { setOrchids(orchidsList) }
        else {
            const arr = []
            for (let i = 0; i < categories.length; i++) {
                for (let j = 0; j < orchidsList.length; j++) {
                    if (categories[i] == orchidsList[j].category) arr.push(orchidsList[j])
                }

            }
            setOrchids(arr)
        }
    }

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
            <View className='justify-between items-center flex-row px-4 my-4'>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                >
                    <EntypoIcon name='menu' size={24}
                        color="black"
                        className="text-black" />

                </TouchableOpacity>
                <Text className="text-2xl font-bold ">Orchids</Text>
            </View>

            <View className='mb-2' />
            {loading ? (<Loading />) : (

                <FlatList
                    data={orchids}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    className="px-4"
                />)
            }
            <BottomSheetFilter onChange={handleFilter} />

        </View>

    );
};

export default HomeScreen;

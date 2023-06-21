import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome';

export default function Card({ item, data, onPress }) {

    return (
        <View className='border-gray-700 border-4 p-2 rounded-2xl mb-4 flex-row items-center justify-between'>
            <Image source={item.image} className="w-32 h-32 rounded-2xl" />
            <Text className="text-lg">{item.name}</Text>
            <TouchableOpacity
                className="p-1 rounded-lg self-start"
                onPress={onPress}
            >
                {data && item ? (

                    <FAIcon
                        name={data.find((favorite) => favorite.id === item.id) ? 'heart' : 'heart-o'}
                        size={20}
                        color="black"
                        className="text-black"
                    />) : (
                    <>

                        <FAIcon
                            name={'remove'}
                            size={20}
                            color="black"
                            className="text-black"
                        />
                    </>

                )}
            </TouchableOpacity>

        </View>
    )
}

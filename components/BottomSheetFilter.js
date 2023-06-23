import React, { useCallback, useRef, useState } from 'react';
import { Button, FlatList, Text, TouchableHighlight, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import BottomSheet from './BottomSheet';

const categories = [
     { id: '1', name: 'Category 1' },
     { id: '2', name: 'Category 2' },
     { id: '3', name: 'Category 3' },
     { id: '4', name: 'Category 4' },
     // Add more categories as needed
];

const BottomSheetFilter = ({ onChange }) => {

     const [selectedItems, setSelectedItems] = useState([]);

     const toggleItem = (item) => {
          const isChecked = selectedItems.includes(item.name);
          let list = [...selectedItems, item.name]
          if (isChecked)
               list = selectedItems.filter((name) => name !== item.name)

          setSelectedItems(list)
          onChange(list)
     }

     const { height } = useWindowDimensions();
     const bottomSheetRef = useRef();

     const pressHandler = useCallback(() => {
          bottomSheetRef.current.expand();
     }, []);

     const resetFilter = useCallback(() => {
          setSelectedItems([])
          onChange([])
     }, [])
     return (
          <>
               <View className='flex-row justify-end items-center gap-2 mx-4'>
                    <TouchableOpacity onPress={() => pressHandler()}>
                         <View>
                              <Text className='text-white text-xs bg-gray-900 p-2 rounded-xl'>Filter</Text>
                         </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => resetFilter()}>
                         <View className=''>
                              <Text className='text-black text-xs text-center border-spacing-3 border border-black p-2 rounded-xl'>Reset filter</Text>
                         </View>
                    </TouchableOpacity>
               </View> 
               <BottomSheet
                    ref={bottomSheetRef}
                    activeHeight={height * 0.5}
                    backgroundColor={'white'}
                    backDropColor={'black'}
               >
                    <View className='p-4'>
                         <Text className='text-xl'>Categories</Text>
                         <FlatList
                              data={categories}
                              renderItem={({ item }) => {
                                   const isChecked = selectedItems.includes(item.name);

                                   return (
                                        <TouchableOpacity
                                             style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  marginVertical: 10,
                                             }}
                                             onPress={() => toggleItem(item)}
                                        >
                                             <View
                                                  style={{
                                                       width: 24,
                                                       height: 24,
                                                       borderRadius: 6,
                                                       borderWidth: 2,
                                                       borderColor: isChecked ? 'black' : 'gray',
                                                       marginRight: 10,
                                                       justifyContent: 'center',
                                                       alignItems: 'center',
                                                  }}
                                             >
                                                  {isChecked && (
                                                       <View
                                                            style={{
                                                                 width: 18,
                                                                 height: 18,
                                                                 borderRadius: 2,
                                                                 backgroundColor: 'black',
                                                            }}
                                                       />
                                                  )}
                                             </View>
                                             <Text>{item.name}</Text>
                                        </TouchableOpacity>
                                   );
                              }}
                              keyExtractor={(item) => item.name}

                         />

                    </View>

               </BottomSheet>
          </>
     )
};


export default BottomSheetFilter;
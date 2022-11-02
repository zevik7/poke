import React, { useCallback, useEffect, useState } from 'react'
import {
  Text,
  TextInput,
  View,
  ImageBackground,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import { Icon } from '@rneui/themed'
import { useFetchAllQuery } from '@/Services/modules/pokes'
import { Poke, PokeDetail } from '@/Models/pokes'
import BallHeaderImage from '@/Assets/Images/Pokeball_header.png'
import { PokeItem } from '@/Components'

const HomeContainer = () => {
  const { data, isLoading, isFetching } = useFetchAllQuery({})
  const [searchText, setSearchText] = useState<string>('')

  const renderItem = useCallback(
    ({ item }: { item: Poke }) => <PokeItem name={item.name} />,
    [],
  )

  return (
    <View className="px-4 h-full flex-col bg-white">
      <ImageBackground className="pt-5 pb-5" source={BallHeaderImage}>
        <Text className="text-4xl text-gray-800">Pokedex</Text>
        <Text className="text-base">Search for Pokemon by name</Text>
      </ImageBackground>
      <View className="flex-row items-center gap-2 pb-2 bg-gray-100/[0.5] border border-gray-100 rounded-md shadow-sm">
        <Icon name="search" size={30} color="#bbb" />
        <TextInput
          className="flex-grow text-base"
          value={searchText}
          placeholder="What Pokemon are you looking for?"
          onChangeText={newText => setSearchText(newText)}
        />
      </View>
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" animating={isLoading || isFetching} />
        {data?.results && (
          <FlatList
            data={data.results}
            renderItem={renderItem}
            className="w-full"
          />
        )}
      </View>
    </View>
  )
}

export default HomeContainer

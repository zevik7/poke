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
import { PokeItem } from '@/Components'
import { useTranslation } from 'react-i18next'
import LangSelect from '@/Components/LangSelect'

const BallHeaderImage = require('@/Assets/Images/Pokeball_header.png')

const HomeContainer = () => {
  const [searchText, setSearchText] = useState<string>('')
  const { data, isLoading, isFetching } = useFetchAllQuery({})
  const [searchLoading, setSearchLoading] = useState(false)
  const [pokes, setPokes] = useState([])
  const { t } = useTranslation()

  useEffect(() => {
    setSearchLoading(true)
    const timer = setTimeout(() => {
      if (searchText && data?.results) {
        setPokes(
          data?.results.filter((item: Poke) =>
            item.name.includes(searchText.toLowerCase()),
          ),
        )
      } else {
        setPokes(data?.results)
      }
      setSearchLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchText, data])

  const renderItem = useCallback(({ item }: { item: Poke }) => {
    return <PokeItem name={item.name} />
  }, [])

  return (
    <View className="px-4 h-full flex-col bg-white">
      <ImageBackground className="pt-5 pb-5" source={BallHeaderImage}>
        <View className="flex-row justify-between">
          <Text className="text-4xl text-gray-800">Pokedex</Text>
          <View className="w-40">
            <LangSelect />
          </View>
        </View>
        <Text className="text-base">{t('search_poke_hint')}</Text>
      </ImageBackground>
      <View className="flex-row items-center gap-2 pb-2 bg-gray-100/[0.5] border border-gray-100 rounded-md shadow-sm">
        <Icon name="search" size={30} color="#bbb" />
        <TextInput
          className="flex-grow text-base"
          value={searchText}
          placeholder={t('search_poke_placeholder')}
          onChangeText={newText => setSearchText(newText)}
        />
      </View>
      <View className="flex-1 items-center justify-center">
        {((isLoading || isFetching || searchLoading) && (
          <ActivityIndicator size="large" />
        )) || (
          <FlatList
            keyExtractor={(item: Poke) => item.name}
            data={pokes}
            renderItem={renderItem}
            className="w-full"
            removeClippedSubviews={true}
            initialNumToRender={2}
            maxToRenderPerBatch={1}
            updateCellsBatchingPeriod={100}
            windowSize={7}
          />
        )}
      </View>
    </View>
  )
}

export default HomeContainer

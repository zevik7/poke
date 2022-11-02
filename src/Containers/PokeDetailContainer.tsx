import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from 'react-native'
import React from 'react'
import { RootStackParamList } from '@/Navigators/Application'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useFetchOneQuery } from '@/Services/modules/pokes'
import { SvgUri } from 'react-native-svg'
import { capitalizeFirstLetter, typeColors } from '@/Components/PokeItem'
import { Chip, Divider } from '@rneui/themed'
import { PokeType } from '@/Models/pokes'

const BallHeaderImage = require('@/Assets/Images/Pokeball_header.png')

type PokeDetailRouteProps = RouteProp<RootStackParamList, 'PokeDetail'>

export default function PokeDetailContainer() {
  const {
    params: { name },
  } = useRoute<PokeDetailRouteProps>()
  const { data, isLoading, isFetching } = useFetchOneQuery(name)

  if (isLoading || isFetching) {
    return (
      <View className="h-full flex justify-center items-center">
        <ActivityIndicator size="large" animating={true} />
      </View>
    )
  }

  const mainColor =
    typeColors[data.types[0]?.type?.name]?.backgroundColor || '#000'

  return (
    <View className="h-full bg-white">
      {/* Header */}
      <ImageBackground
        source={BallHeaderImage}
        className={`flex-row py-6 gap-4 items-center justify-center bg-[${mainColor}]`}
      >
        <SvgUri
          width={120}
          height={120}
          uri={data.sprites.other.dream_world.front_default}
        />
        <View>
          <Text className="text-gray-800">#{data.id}</Text>
          <Text className="text-xl">{capitalizeFirstLetter(data.name)}</Text>
          <View className="flex flex-row gap-2 py-3">
            {data.types.map((type: PokeType) => (
              <View key={type.slot}>
                <Chip
                  title={type.type.name}
                  color={typeColors[type.type.name].backgroundColor}
                  radius={4}
                />
              </View>
            ))}
          </View>
        </View>
      </ImageBackground>
      <View className="flex-col items-center">
        <Divider style={styles.divider} />
      </View>
      {/* Information */}
      <View className="p-10 flex-col gap-4 justify-between">
        <Text className={'text-2xl text-blue-400'}>Poke Data</Text>
        <Text className="text-lg">Height: {data?.height}</Text>
        <Text className="text-lg">Weight: {data?.weight}</Text>
        <Text className="text-lg">
          Base Experience: {data?.base_experience}
        </Text>
      </View>
      <View />
    </View>
  )
}

const styles = StyleSheet.create({
  svgImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  divider: {
    width: '80%',
  },
})

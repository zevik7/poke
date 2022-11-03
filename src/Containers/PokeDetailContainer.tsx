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
import { Ability, PokeType, Stat } from '@/Models/pokes'
import * as Progress from 'react-native-progress'
import { useTranslation } from 'react-i18next'

const BallHeaderImage = require('@/Assets/Images/Pokeball_header.png')

type PokeDetailRouteProps = RouteProp<RootStackParamList, 'PokeDetail'>

export default function PokeDetailContainer() {
  const {
    params: { name },
  } = useRoute<PokeDetailRouteProps>()
  const { data, isLoading, isFetching } = useFetchOneQuery(name)
  const { t } = useTranslation()

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
        className={'flex-row py-6 gap-4 items-center justify-center'}
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
      <View className="relative p-10 flex-col gap-3 justify-between flex-1 justify-start">
        <View
          style={[styles.inforBackground, { backgroundColor: mainColor }]}
        />
        <Text
          className="text-lg"
          style={{
            color: mainColor,
          }}
        >
          {t('information.poke_data.title')}
        </Text>
        <Text className="text-base">
          {t('information.poke_data.height')}: {data?.height}
        </Text>
        <Text className="text-base">
          {t('information.poke_data.weight')}: {data?.weight}
        </Text>
        <Text className="text-base">
          {t('information.poke_data.base_experience')}: {data?.base_experience}
        </Text>

        <View className="flex-row items-center">
          <Text className="text-base mr-4">
            {t('information.poke_data.abilities')}:
          </Text>
          {data.abilities.map((ability: Ability) => (
            <View key={ability.slot} className="mr-2">
              <Chip title={ability.ability.name} radius={4} color={mainColor} />
            </View>
          ))}
        </View>

        <View>
          <Text
            className="text-lg"
            style={{
              color: mainColor,
            }}
          >
            {t('information.poke_stats.title')}
          </Text>
          {data.stats.map((stat: Stat, index: number) => (
            <View
              key={index}
              className="flex-row items-center justify-between gap-3 mb-2"
            >
              <Text>
                {capitalizeFirstLetter(
                  t(`information.poke_stats.${stat.stat.name}`),
                )}
              </Text>
              <Progress.Bar
                progress={stat.base_stat / 100}
                width={200}
                color={mainColor}
              />
            </View>
          ))}
        </View>
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
  inforBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
})

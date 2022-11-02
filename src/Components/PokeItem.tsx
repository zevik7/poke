import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { useFetchOneQuery } from '@/Services/modules/pokes'
import { PokeDetail, PokeType } from '@/Models/pokes'
import { Chip } from '@rneui/themed'
import { SvgUri } from 'react-native-svg'
import { navigate } from '@/Navigators/utils'

type Props = {
  name: string
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const typeColors: any = {
  normal: {
    backgroundColor: '#8a8a59',
  },
  fire: {
    backgroundColor: '#f08030',
  },
  water: {
    backgroundColor: '#6890f0',
  },
  electric: {
    backgroundColor: '#f8d030',
  },
  grass: {
    backgroundColor: '#78c850',
  },
  ice: {
    backgroundColor: '#98d8d8',
  },
  fighting: {
    backgroundColor: '#c03028',
  },
  poison: {
    backgroundColor: '#a040a0',
  },
  ground: {
    backgroundColor: '#e0c068',
  },
  flying: {
    backgroundColor: '#a890f0',
  },
  psychic: {
    backgroundColor: '#f85888',
  },
  bug: {
    backgroundColor: '#a8b820',
  },
  rock: {
    backgroundColor: '#b8a038',
  },
  ghost: {
    backgroundColor: '#705898',
  },
  dragon: {
    backgroundColor: '#7038f8',
  },
  dark: {
    backgroundColor: '#705848',
  },
  steel: {
    backgroundColor: '#b8b8d0',
  },
  fairy: {
    backgroundColor: '#e898e8',
  },
}

export default function PokeItem({ name }: Props) {
  const { data, isLoading, isFetching } = useFetchOneQuery(name)

  if (isLoading || isFetching) {
    return (
      <View className="h-28 my-3 flex-col items-center justify-center">
        <ActivityIndicator size="large" animating={true} />
      </View>
    )
  }

  return (
    <TouchableOpacity onPress={() => navigate('PokeDetail', { name })}>
      <View className="relative my-4 p-4 border border-gray-200 rounded-lg">
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

        <SvgUri
          width={150}
          height={150}
          uri={data.sprites.other.dream_world.front_default}
          style={styles.svgImage}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  svgImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
})

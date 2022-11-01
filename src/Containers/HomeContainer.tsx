import React, { useEffect } from 'react'
import { Text, ScrollView } from 'react-native'
import { useLazyFetchOneQuery } from '@/Services/modules/pokes'

const HomeContainer = () => {
  const [fetchAll, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyFetchOneQuery()

  useEffect(() => {
    fetchAll({}, true)
  }, [fetchAll])

  return (
    <ScrollView>
      <Text>sdfđsf</Text>
    </ScrollView>
  )
}

export default HomeContainer

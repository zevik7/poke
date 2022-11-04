import React from 'react'
import { useTranslation } from 'react-i18next'
import RNPickerSelect from 'react-native-picker-select'

export default function LangSelect() {
  const { i18n } = useTranslation()

  const handleChangeLang = (value: string) => {
    i18n.changeLanguage(value)
  }

  return (
    <RNPickerSelect
      onValueChange={handleChangeLang}
      items={[
        { label: 'English', value: 'en' },
        { label: 'Vietnamese', value: 'vi' },
      ]}
      placeholder={{}}
      value={i18n.language}
    />
  )
}

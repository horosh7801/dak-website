import { Roboto_Flex } from '@next/font/google'

const roboto = Roboto_Flex({
  subsets: ['latin', 'cyrillic','numbers', 'punctuation', 'currency'],
  axes: ['YOPQ', 'YTUC', 'GRAD', 'wdth']
})

export default roboto.className
import type { ComponentStyleConfig } from '@chakra-ui/theme'
import { extendTheme, ButtonProps } from '@chakra-ui/react'
import { colors } from './colors'

const Heading: ComponentStyleConfig = {
  variants: {
    title: () => ({
      fontSize: '2em',
      fontWeight: 700,
      marginY: '4px'
    })
  }
}

const Text: ComponentStyleConfig = {
    baseStyle: {
        fontFamily: 'Hiragino Sans',
        fontWeight: 400,
        lineHeight: '150%',
        fontSize: '16px',
        color: colors.Black
    },
    variants: {
      button1: () => ({
        fontSize: '18px',
        fontWeight: 600
      }),
      heading1: () => ({
        fontSize: '22px',
        fontWeight: 600
      }),
      heading2: () => ({
        fontSize: '20px',
        fontWeight: 600
      }),
      title: () => ({
        fontSize: '24px',
        fontWeight: 700,
        marginY: '4px'
      })
    }
}

const Button: ComponentStyleConfig = {
  variants: {
    solid: (props) => ({
      color: colors.White,
      bg: props.disabled ? colors.Disabled : colors.Primary.Main,
      // boxShadow: `0 1px 7px ${colors.Primary.Main_RGB}`,
      _focus: {
        boxShadow: 'none',
      },
      _hover: {
        bg: colors.Primary.Main_Hover
      },
    })
  }
}


export const theme = extendTheme({
    components: {
      Text,
      Button,
      Heading
    },
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
  })
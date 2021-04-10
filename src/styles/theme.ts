import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({

    colors: {
        yellow: {
            400: "#FFBA08",    // highlight
        },

        gray: {
            50: "#DADADA",    // info light
            100: "#F5F8FA",   // heading and text light
            300: "#999999",   // info dark 
            400: "#47585B"    // heading and text dark
        },
    },

    fonts: {
        heading: 'Poppins, sans-serif',
        body: 'Poppins, sans-serif',
    },

    styles: {
        global: {
            body: {
                bg: 'gray.100',
                color: 'gray.400',
                fontFamily: 'Poppins, sans-serif',
            },
            ".swiper-button-next": {
                _after: {
                    color: 'yellow.500'
                }
            },
            ".swiper-button-prev": {
                _after: {
                    color: 'gray.400'
                }
            },
            ".swiper-pagination-bullet": {
                bg: '#999999',
                opacity: 0.9
            },
            ".swiper-pagination-bullet-active": {
                bg: 'yellow.400'
            }
        }
    },
    layerStyles: {
        menu: {
            fontWeight: "semibold",
            fontSize: "1.3rem",
            align: "center",
            lineHeight: "2rem",
            fontFamily: 'Poppins, sans-serif',
        },

        menuMobile: {
            fontWeight: "500",
            fontSize: "18px",
            align: "center",
            lineHeight: "20px",
            fontFamily: 'Poppins, sans-serif',
        },

        /*         text: {
                    bg: "teal.500",
                    color: "teal.700",
                    borderColor: "orange.500",
                }, */
    }
});


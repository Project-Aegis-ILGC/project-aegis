import { StyleSheet } from "react-native";
import {SIZES, COLORS} from '../constants/theme';
const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        padding: SIZES.small,
        margin: SIZES.small,
        width: SIZES.width * 0.8,
        height: SIZES.height * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: SIZES.h3,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;
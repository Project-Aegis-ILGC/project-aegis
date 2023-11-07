import {View, Text} from 'react-native';
import {styles} from './TaskCard.style';

const TaskCard = ({task}) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                {task}
            </Text>
        </View>
    )
}
export default TaskCard;

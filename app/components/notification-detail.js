import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export function notificationDetail({navigation, route}) {
    
    return (
        <View style={styles.detailview}>
            <Text style={{padding: 20,color: '#666'}}>{route.params.message}</Text>
            <Text style={{padding: 20,color: '#ccc',fontSize: 10,textAlign: 'right'}}>接收时间：{route.params.messageTime}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    detailview: {
        elevation: 8,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        shadowOpacity: .5,
        lineHeight: 30,
        shadowRadius: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    }
})

export default notificationDetail
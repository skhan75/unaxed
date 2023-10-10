import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type LoginScreenRouteProp = {
    // For now, this remains empty
};

type LoginScreenNavigationProp = StackNavigationProp<
    {
        Login: LoginScreenRouteProp;
        SignUp: undefined;  // No parameters for SignUp screen
        App: undefined;  // Assuming App screen doesn't take any parameters
    },
    'Login'
>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

export const API_BASE_URL = 'https://b1ef-76-103-37-202.ngrok.io';
async function loginUser(username: string, password: string) {
    const url = `${API_BASE_URL}/users/login`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data.message || 'Login failed');
    }

    return data;
}

export default function Login({ navigation }: Props) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            const responseData = await loginUser(username, password);
            console.log("Authenticated", responseData);
        } catch (e: any) {
            alert(e.message); 
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Login to Unaxed</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={text => setUsername(text)}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
                <Button title="Login" onPress={handleLogin} />
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    linkText: {
        color: 'blue',
        marginTop: 15,
    }
});

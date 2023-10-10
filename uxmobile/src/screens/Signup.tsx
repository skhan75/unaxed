import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type SignUpScreenNavigationProp = StackNavigationProp<
    {
        SignUp: undefined;
        Login: undefined;
    },
    'SignUp'
>;

type Props = {
    navigation: SignUpScreenNavigationProp;
};

export const API_BASE_URL = 'https://b1ef-76-103-37-202.ngrok.io';

async function createUser(username: string, password: string, email: string) {
    const url = `${API_BASE_URL}/users/register`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
            email
        })
    });
    console.log("Response1", response)
    return response.json(); // Assuming the response is a JSON object
}

export default function SignUp({ navigation }: Props) {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await createUser(username, password, email);
            if (!response.error) {
                console.log('User created successfully');
                // Navigate to the login screen automatically
                navigation.navigate('Login');
            } else {
                alert(response.error || 'Signup failed.');
            }
        } catch (e) {
            console.error('Error:', e);
            alert('Signup failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up for Unaxed</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
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
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmPassword}
                />
                <Button
                    title={isLoading ? 'Signing Up...' : 'Sign Up'}
                    onPress={handleSignUp}
                    disabled={isLoading}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Already have an account? Login</Text>
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

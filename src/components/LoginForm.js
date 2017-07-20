// import
import React, {Component} from 'react'
import firebase from 'firebase'
import {Button, Card, CardSection, Input} from './common/'
import {Text} from 'react-native'
import {Spinner} from './common/Spinner'

// component
export default class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
    }

    onButtonPress() {
        const {email, password} = this.state
        this.setState({error: '', loading: true})
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onAuthenticationSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onAuthenticationSuccess.bind(this))
                    .catch(this.onAuthenticationFail.bind(this))
            })
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small"/>
        }

        return (
            <Button
                title={'Log In'}
                onPress={this.onButtonPress.bind(this)}

            />
        )
    }

    onAuthenticationSuccess() {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false,
        })
    }

    onAuthenticationFail() {
        this.setState({
            password: '',
            error: 'Authentication Failed',
            loading: false,
        })
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        autoCapitalize="none"
                        label='Email'
                        onChangeText={email => this.setState({email})}
                        placeholder='user@gmail.com'
                        value={this.state.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label='Password'
                        onChangeText={password => this.setState({password})}
                        placeholder='password'
                        secureTextEntry
                        value={this.state.password}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

// style
const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    },
}
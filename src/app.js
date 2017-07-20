import React, {Component} from 'react'
import {View} from 'react-native'
import firebase from 'firebase'
import {Button, Card, CardSection, Header, Spinner} from './components/common'
import LoginForm from './components/LoginForm'

export default class App extends Component {
    state = {loggedIn: null}

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDfNoJVk1KUwpMrM0d3_RBZHHNGcFNRrbk',
            authDomain: 'rn-auth-64b08.firebaseapp.com',
            databaseURL: 'https://rn-auth-64b08.firebaseio.com',
            projectId: 'rn-auth-64b08',
            storageBucket: 'rn-auth-64b08.appspot.com',
            messagingSenderId: '908912100211',
        })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loggedIn: true})
            } else {
                this.setState({loggedIn: false})
            }
        })
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button
                                onPress={() => firebase.auth().signOut()}
                                title="Log Out"
                            />
                        </CardSection>
                    </Card>
                )
            case false:
                return <LoginForm />
            default: // null
                return <Spinner size="large"/>
        }
    }

    render() {
        return (
            <View>
                <Header headerText={'Auth'}/>
                {this.renderContent()}
            </View>
        )
    }
}
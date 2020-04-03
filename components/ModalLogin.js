import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Animated, Dimensions, AsyncStorage } from 'react-native'
import { BlurView } from 'expo-blur'
import { saveState } from './AsyncStorage'
import Success from './Succes'
import Loading from './Loading'
import firebase from './Firebase'

function mapStateToProps(state) {
    return {
        action: state.action
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeLogin: () => dispatch({ type: "CLOSE_LOGIN" }),
        updateName: (name) => dispatch({ type: "UPDATE_NAME", name }),
        updateAvatar: (avatar) => dispatch({ type: "UPDATE_AVATAR", avatar })
    }
}

const screenHeight = Dimensions.get("window").height

class ModalLogin extends React.Component {

    state = {
        email: "",
        password: "",
        iconEmail: require('../assets/icon-email.png'),
        iconPassword: require('../assets/icon-password.png'),
        isSuccessful: false,
        isLoading: false,
        top: new Animated.Value(screenHeight),
        scale: new Animated.Value(1.3),
        translateY: new Animated.Value(0)
    }

    componentDidMount() {
        this.retriveName()
    }

    componentDidUpdate() {
        if (this.props.action === "openLogin") {
            Animated.timing(this.state.top, { toValue: 0, duration: 0 }).start()
            Animated.spring(this.state.scale, { toValue: 1 }).start()
            Animated.timing(this.state.translateY, { toValue: 0, duration: 0 }).start()
        }

        if (this.props.action === "closeLogin") {
            setTimeout(() => {
                Animated.timing(this.state.top, { toValue: screenHeight, duration: 0 }).start()
                Animated.spring(this.state.scale, { toValue: 1.3 }).start()
            }, 500)
            Animated.timing(this.state.translateY, { toValue: 1000, duration: 500 }).start()
        }
    }

    storeName = async name => {
        try {
            await AsyncStorage.setItem("name", name)
        } catch (e) { }
    }

    retriveName = async () => {
        try {
            const name = await AsyncStorage.getItem("name")
            if (name !== null) {
                console.log(name)
                this.props.updateName(name)
            }
        } catch (e) { }
    }

    handleLogin = () => {
        Keyboard.dismiss()
        this.setState({ isLoading: true })

        const { email, password } = this.state

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                this.setState({ isLoading: false })
                Alert.alert("Error", error.message)
                setTimeout(() => {
                    this.props.closeLogin()
                    this.setState({ isSuccessful: false })
                }, 1000)
            })
            .then(res => {
                // console.log(res)
                if (res) {
                    this.fetchUser()
                    // Alert.alert("Congrants", "You've logged successfully!")
                }
            })
    }

    fetchUser = () => {
        fetch('https://uifaces.co/api?limit=1&random', {
            method: 'GET',
            headers: {
                'X-API-KEY': "18c87b6479607b3fc8a44c190abff4",
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                const name = res[0].name
                const avatar = res[0].photo
                saveState({ name, avatar })
                this.setState({ isLoading: false })

                this.setState({ isSuccessful: true })

                // this.storeName(res.user.email)
                this.props.updateName(name)
                this.props.updateAvatar(avatar)

                setTimeout(() => {
                    this.props.closeLogin()
                    this.setState({ isSuccessful: false })
                }, 1000)
            })
    }

    focusEmail = () => {
        this.setState({
            iconPassword: require("../assets/icon-password.png"),
            iconEmail: require("../assets/icon-email-animated.gif")
        })
    }

    focusPassword = () => {
        this.setState({
            iconEmail: require("../assets/icon-email.png"),
            iconPassword: require("../assets/icon-password-animated.gif")
        })
    }

    tapBackground = () => {
        Keyboard.dismiss()
        this.props.closeLogin()
    }

    render() {
        return (
            <AnimatedContainer style={{ top: this.state.top }}>
                <TouchableWithoutFeedback onPress={this.tapBackground}>
                    <BlurView
                        tint="default"
                        intensity={100}
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </TouchableWithoutFeedback>
                <AnimatedModal style={{
                    transform: [
                        { scale: this.state.scale },
                        { translateY: this.state.translateY }
                    ]
                }}>
                    <Logo source={require('../assets/logo-dc.png')} />
                    <Text>Start Learning. Access Pro Content.</Text>
                    <TextInput
                        onChangeText={email => this.setState({ email })}
                        placeholder="Email"
                        keyboardType="email-address"
                        onFocus={this.focusEmail}
                    />
                    <TextInput
                        onChangeText={password => this.setState({ password })}
                        placeholder="Password"
                        secureTextEntry={true}
                        onFocus={this.focusPassword}
                    />
                    <IconEmail source={this.state.iconEmail} />
                    <IconPassword source={this.state.iconPassword} />
                    <TouchableOpacity onPress={this.handleLogin}>
                        <Button>
                            <ButtonText>Log In</ButtonText>
                        </Button>
                    </TouchableOpacity>
                </AnimatedModal>
                <Success isActive={this.state.isSuccessful} />
                <Loading isActive={this.state.isLoading} />
            </AnimatedContainer>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin)

const Container = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Modal = styled.View`
    width: 335px;
    height: 370px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    align-items: center;
`

const AnimatedModal = Animated.createAnimatedComponent(Modal)

const Logo = styled.Image`
    width: 44px;
    height: 44px;
    margin-top: 50px;
`
const Text = styled.Text`
    margin-top: 20px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    width: 160px;
    text-align: center;
    color: #b8bece;
`
const TextInput = styled.TextInput`
    border: 1px solid #dbdfea;
    width: 295px;
    height: 44px; 
    border-radius: 10px;
    font-size: 17px;
    color: #3c4560;
    margin-top: 20px;
    padding-left: 44px;
`

const Button = styled.View`
    margin-top: 20px;
    background: #5263ff;
    width: 295px;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 10px 20px #c2cbff;
`
const ButtonText = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 20px;
    text-transform: uppercase;
`

const IconEmail = styled.Image`
    width: 24px;
    height: 16px;
    position: absolute;
    top: 179px;
    left: 31px;
`

const IconPassword = styled.Image`
    width: 18px;
    height: 24px;
    position: absolute;
    top: 239px;
    left: 35px;
`

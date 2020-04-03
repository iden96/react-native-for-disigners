import React from 'react'
import { TouchableOpacity, StatusBar, Linking, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import Markdown from 'react-native-showdown'
import { PlayIcon } from '../components/Icons'

class SectionScreen extends React.Component {

    componentDidMount() {
        StatusBar.setBarStyle("light-content", true)
    }

    componentWillUnmount() {
        StatusBar.setBarStyle("dark-content", true)
    }

    render() {

        const { route } = this.props

        const section = route.params.section

        return (
            <ScrollView>
                <Container>
                    <StatusBar hidden />
                    <Cover>
                        <Image source={{ uri: section.image }} />
                        <PlayWrapper>
                            <TouchableOpacity
                                underlayColor="transparent"
                                onPress={() => {
                                    this.props.navigation.navigate("Video");
                                }}
                            >
                                <PlayView>
                                    <PlayIcon style={{ marginLeft: -10 }} />
                                </PlayView>
                            </TouchableOpacity>
                        </PlayWrapper>
                        <Wrapper>
                            <Logo source={{ uri: section.logo }} />
                            <Subtitle>{section.subtitle}</Subtitle>
                        </Wrapper>
                        <Title>{section.title}</Title>
                        <Caption>{section.caption}</Caption>
                    </Cover>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack()
                    }} style={{ position: "absolute", top: 20, right: 20 }}>
                        <CloseView>
                            <Ionicons name="ios-close" size={36} color="#4775f2" style={{ marginTop: -2 }} />
                        </CloseView>
                    </TouchableOpacity>
                    <Content>
                        {/* <WebView
                        source={{ html: section.content }}
                        scalePageToFit={false}
                        scrollEnabled={false}
                        ref="webview"
                        onNavigationStateChange={event => {
                            if (event.url != "about:blank") {
                                this.refs.webview.stopLoading()
                                Linking.openURL(event.url)
                            }
                        }}
                    /> */}
                        <Markdown
                            body={decodeURIComponent(section.content)}
                            pureCSS={htmlStyles}
                            scalesPageToFit={false}
                            scrollEnabled={false}
                        />
                    </Content>
                </Container>
            </ScrollView>
        )
    }
}

export default SectionScreen

const htmlContent = `
    <h2>This is a title</h2>
    <p>This <strong>is</strong> a <a href="http://designcode.io">link</a></p>
    <img src="http://172.20.10.3:4000/static/assets/background14.png" />
`

const htmlStyles = `
    * {
        font-family: -aple-system, Roboto;
        margin: 0;
        padding: 0;
        font-size: 17px;
        font-weight: normal;
        color: #3c4560;
        line-height: 24px;
    }

    body {
        padding:0 20px;
    }

    h2 {
        font-size: 20px;
        text-transform: uppercase;
        color: #b8bece;
        font-weight: 600;
        margin-top: 50px;
    }

    p {
        margin-top: 20px;
    }

    a {
        color: #4775f2;
        font-weight: 600;
        text-decoration: none;
    }

    strong {
        font-weight: 700;
    }

    img {
        width: 100%;
        border-radius: 10px;
        margin-top: 20px;
    }

    pre {
        padding: 20px;
        background: #212c4f;
        overflow: hidden;
        word-wrap: break-word;
        border-radius: 10px;
        margin-top: 20px;
    }

    code {
        color: white;
    }
`

const Container = styled.View`
    flex: 1;

`
const Content = styled.View`
    height: 1300px;
`

const Cover = styled.View`
    height: 375px;
`

const Image = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;

`

const Title = styled.Text`
    font-size: 24px;
    color: white;
    font-weight: bold;
    width: 170px;
    position: absolute;
    top: 78px;
    left: 20px;
`

const Caption = styled.Text`
    color: white;
    font-size: 17px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 300px;
`

const CloseView = styled.View`
    width: 32px;
    height: 32px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 40px;
    left: 20px;
`

const Logo = styled.Image`
    width: 24px;
    height: 24px;
`

const Subtitle = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-left: 5px;
    text-transform: uppercase;
`

const PlayWrapper = styled.View`
    position: absolute;
    top: 50%;  
    left: 50%;
    margin-top: -40px;
    margin-left: -40px;
`

const PlayView = styled.View`
    width: 80px;
    height: 80px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 40px;
    justify-content: center;
    align-items: center;
`
import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {HOME_PAGE} from '../Constants/PageNameConstants';

class IntroPage extends React.Component {
  render() {
    const mainUIComponent = (
      <>
        <SafeAreaView>
          <View>
            <Text>
              Hello World Hello World Hello World Hello World Hello World Hello
              World Hello World Hello World Hello World Hello World Hello World
              Hello World Hello World Hello World Hello World Hello World Hello
              World Hello World Hello World Hello World
            </Text>
            <Button
              title="Login"
              onPress={() => {
                this.props.navigation.navigate(HOME_PAGE);
              }}
            />
          </View>
        </SafeAreaView>
      </>
    );
    return mainUIComponent;
  }
}

export default IntroPage;

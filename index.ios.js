/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  LayoutAnimation,
  NavigationExperimental,
  PixelRatio,
  ScrollView,
  ActivityIndicator,
  View
} from 'react-native';

import {DatePickerIOSExample} from './DatePickerIOSExample.js'

class AwesomeProject extends Component {
  _onPressButton() {
    alert("You tapped the button!");
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableHighlight onPress={this._onPressButton}>
          <Text>TouchableHighlight</Text>
        </TouchableHighlight>
        {/*<TouchableNativeFeedback onPress={this._onPressButton}>
          <Text>TouchableNativeFeedback only for Android</Text>
        </TouchableNativeFeedback>*/}
        <TouchableOpacity onPress={this._onPressButton}>
          <Text>TouchableOpacity</Text>
        </TouchableOpacity>
        {/*<TouchableWithoutFeedback onPress={this._onPressButton}>
          <Text>TouchableWithoutFeedback</Text>
        </TouchableWithoutFeedback>*/}
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={{width: 200, height: 200}} >
          <Text>Inside</Text>
          <Text>Inside</Text>
        </Image>
        <Playground></Playground>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  scrollView: {
    marginTop: 64
  },
  row: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  rowText: {
    fontSize: 17,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }
  render() {
    return (
      <Animated.Image                         // Base: Image, Text, View
        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        style={{
          flex: 1,
          width: 300,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}
      />
    );
  }
  componentDidMount() {
    this.state.bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 0.8,                         // Animate to smaller size
        friction: 5,                          // Bouncier spring
        tension:40
      }
    ).start();                                // Start the animation
    // Animated.sequence([            // spring to start and twirl after decay finishes
    //   Animated.decay(position, {   // coast to a stop
    //     velocity: {x: gestureState.vx, y: gestureState.vy}, // velocity from gesture release
    //     deceleration: 0.997,
    //   }),
    //   Animated.parallel([          // after decay, in parallel:
    //     Animated.spring(position, {
    //       toValue: {x: 0, y: 0}    // return to start
    //     }),
    //     Animated.timing(twirl, {   // and twirl
    //       toValue: 360,
    //     }),
    //   ]),
    // ]).start();
  }
}

// Step 1. Define Initial State and Top Level Component
class BleedingEdgeApplication extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      // This defines the initial navigation state.
      navigationState: {
        index: 0, // Starts with first route focused.
        routes: [{key: 'My Initial Scene'}], // Starts with only one route.
      },
    };

    // We'll define this function later - hang on
    this._onNavigationChange = this._onNavigationChange.bind(this);
  }

  // Step 2. Reducing the Navigation State
  _onNavigationChange(type) {
    // Extract the navigationState from the current state:
    let {navigationState} = this.state;

    switch (type) {
      case 'push':
        // Push a new route, which in our case is an object with a key value.
        // I am fond of cryptic keys (but seriously, keys should be unique)
        const route = {key: 'Route-' + Date.now()};

        // Use the push reducer provided by NavigationStateUtils
        navigationState = NavigationStateUtils.push(navigationState, route);
        break;

      case 'pop':
        // Pop the current route using the pop reducer.
        navigationState = NavigationStateUtils.pop(navigationState);
        break;
    }

    // NavigationStateUtils gives you back the same `navigationState` if nothing
    // has changed. We will only update state if it has changed.
    if (this.state.navigationState !== navigationState) {
      // Always use setState() when setting a new state!
      this.setState({navigationState});
      // If you are new to ES6, the above is equivalent to:
      // this.setState({navigationState: navigationState});
    }
  }

  render() {
    return (
      <MyVerySimpleNavigator
        navigationState={this.state.navigationState}
        onNavigationChange={this._onNavigationChange}
        onExit={this._exit}
      />
    );
  }

}

// Step 3. Define Scenes
class TappableRow extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.row}
        underlayColor="#D0D0D0"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

class MyVeryComplexScene extends Component {
  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <Text style={styles.row}>
          Route: {this.props.route.key}
        </Text>
        <ActivityIndicator>

        </ActivityIndicator>
        <DisplayAnImage></DisplayAnImage>
        <DatePickerIOSExample></DatePickerIOSExample>
        <TappableRow
          text="Tap me to load the next scene"
          onPress={this.props.onPushRoute}
        />
        <TappableRow
          text="Tap me to go back"
          onPress={this.props.onPopRoute}
        />
      </ScrollView>
    );
  }
}

// Step 4. Create a Navigation Stack
class MyVerySimpleNavigator extends Component {

  // This sets up the methods (e.g. Pop, Push) for navigation.
  constructor(props, context) {
    super(props, context);

    this._onPushRoute = this.props.onNavigationChange.bind(null, 'push');
    this._onPopRoute = this.props.onNavigationChange.bind(null, 'pop');

    this._renderScene = this._renderScene.bind(this);
  }

  // Now we finally get to use the `NavigationCardStack` to render the scenes.
  render() {
    return (
      <NavigationCardStack
        onNavigateBack={this._onPopRoute}
        navigationState={this.props.navigationState}
        renderScene={this._renderScene}
        style={styles.navigator}
      />
    );
  }

  // Render a scene for route.
  // The detailed spec of `sceneProps` is defined at `NavigationTypeDefinition`
  // as type `NavigationSceneRendererProps`.
  // Here you could choose to render a different component for each route, but
  // we'll keep it simple.
  _renderScene(sceneProps) {
    return (
      <MyVeryComplexScene
        route={sceneProps.scene.route}
        onPushRoute={this._onPushRoute}
        onPopRoute={this._onPopRoute}
        onExit={this.props.onExit}
      />
    );
  }
}

class DisplayAnImage extends Component {
  render() {
    return (
      <View>
        <Image
          source={require('./img/front.png')}
        />
        <Image
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          style={{width: 200, height: 200}}
        />
      </View>
    );
  }
}

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
AppRegistry.registerComponent('AwesomeProject', () => BleedingEdgeApplication);
